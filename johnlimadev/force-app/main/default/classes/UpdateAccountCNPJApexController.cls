public class UpdateAccountCNPJApexController {
    
    @AuraEnabled
    public static String searchByNumberCTRL(String cnpj) {
        System.debug('CNPJ to be researched: ' + cnpj);
        System.debug(cnpj);
        
        Http h = new Http();
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.receitaws.com.br/v1/cnpj/'+cnpj);
        req.setMethod('GET');
        
        HttpResponse res = h.send(req);
        
        System.debug('res.getBody()');
        System.debug(res.getBody());
        
        return res.getBody();
    }
    
    @AuraEnabled
    public static String searchByNameCTRL(String name) {
        System.debug('Name to be researched: ' + name);
        
        Http h = new Http();
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint('http://www.cnpjbrasil.com/e/s?search='+EncodingUtil.urlEncode(name,'UTF-8'));
        req.setHeader('X-Requested-With', 'XMLHttpRequest');
        req.setMethod('GET');
        
        HttpResponse res = h.send(req);
        
        // Deserialize to primitive types
        Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        
        // Populate a native manually created Map<String, Object>
        List<Map<String, Object>> itemsFromMap = new List<Map<String, Object>>();
        for (Object item : (List<Object>) responseMap.get('items')) {
            itemsFromMap.add((Map<String, Object>) item);
        }
        
        // Adjusts two key values to a successful strict deserialization
        for (Map<String, Object> item : itemsFromMap) {
            item.put('number_Z', item.get('number'));
            item.remove('number');
            item.put('id_Z', item.get('id'));
            item.remove('id');
        }
        
        // Serialize items
        String items = JSON.serialize(itemsFromMap);
        //Response i = (Response) JSON.deserializeStrict('{"items":' + items  + '}', Response.class);
        return items;
    }
    
    @AuraEnabled
    public static String updateCompanyinfoCTRL(String company, Id recordId, Boolean isSearchByNumber) {
        System.debug('Company:');
        System.debug(company);
        System.debug('Record Id:');
        System.debug(recordId);
        System.debug('isSearchByNumber:');
        System.debug(isSearchByNumber);
        
        Company comp = new Company();
        comp = comp.parse(company);
        
        Filter companyInfo = new Filter();
        if (isSearchByNumber) {
        	companyInfo.accountName = comp.nome;
            companyInfo.accountCNPJ = comp.cnpj;
        } else {
            companyInfo.accountName = comp.name;
            companyInfo.accountCNPJ = comp.number_Z;
        }
        
        // Custom Setting
        List<nhoj__Update_CNPJ_Conf__c> csL = [SELECT Id, nhoj__cnpjnumberfield__c, nhoj__accountnamefield__c FROM nhoj__Update_CNPJ_Conf__c];
        nhoj__Update_CNPJ_Conf__c cs = csL[0];
        
        // Account to be updated
        List<Account> accL = [SELECT Id, Name, nhoj__CNPJ__c FROM Account WHERE Id = :recordId];
        Account acc = accL[0];
        
        System.debug('Account returned by SOQL:');
        System.debug(acc);
        
        // Update mapped fields
        if (cs.nhoj__cnpjnumberfield__c != null) {
        	acc.put(cs.nhoj__cnpjnumberfield__c, companyInfo.accountCNPJ);
        }
        if (cs.nhoj__accountnamefield__c != null) {
        	acc.put(cs.nhoj__accountnamefield__c, companyInfo.accountName);    
        }
        
        update acc;
        System.debug('Successfully updated...');
        
        return company;
    }
    
    // @notusing
    public class Response {
        public List<Items> items {get;set;} 
    }
    
    // @notusing
    public class Items {
        public String status {get;set;} 
        public String city {get;set;} 
        public String nj {get;set;} 
        public String ae2 {get;set;} 
        public String ae {get;set;} 
        public String name {get;set;} 
        public String map_address {get;set;} 
        public String description {get;set;} 
        public String mapid {get;set;} 
        public String number_Z {get;set;} // in json: number
        public String map_info {get;set;} 
        public String info_name {get;set;} 
        public Boolean is_cnpj {get;set;} 
        public String nome_empresarial {get;set;} 
        public Boolean is_cpf {get;set;} 
        public String address {get;set;} 
        public String fullname {get;set;} 
        public String fantasia {get;set;} 
        public String id_Z {get;set;}  // in json: id
        public String opened {get;set;}
    }
    
    public class Company {
        public String id_Z;
        public String number_Z;
        public String opened;
        public String fantasia;
        public String fullname;
        public String address;
        public Boolean is_cpf;
        public String nome_empresarial;
        public Boolean is_cnpj;
        public String info_name;
        public String map_info;
        public String mapid;
        public String description;
        public String map_address;
        public String name;
        public String ae;
        public String ae2;
        public String nj;
        public String city;
        public String status;
        public String nome;
        public String cnpj;
        
        
        public Company parse(String json) {
            return (Company) System.JSON.deserialize(json, Company.class);
        }
    }
    
    public class Filter {
        String accountName;
        String accountCNPJ;
    }
}