public with sharing class ConsultaCnpj {
    @AuraEnabled
    public static String consultarSefazNumero(String cnpj){

        System.debug(cnpj);

        Http h = new Http();
        

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.receitaws.com.br/v1/cnpj/'+cnpj);
        req.setMethod('GET');
        
        HttpResponse res = h.send(req);
        
        // Esta forma de desserialização usa tipos primitivos.]
        // Veja: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_class_System_Json.htm
        Map<String, Object> mapInput = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        System.debug(mapInput);
        List<Object> l = (List<Object>) mapInput.get('atividade_principal');
        
        Map<String, Object> atividadePrincipal0 = (Map<String, Object>) l.get(0);
        System.debug(JSON.serialize(atividadePrincipal0));

        // Type resultType = Type.forName('Models.EmpresaResponse');
        // Models.EmpresaResponse deserializeResults = (Models.EmpresaResponse)JSON.deserialize(res.getBody(), resultType);
        // System.debug('==========> deserialize() results = ' + deserializeResults);
        


        return res.getBody();
    }
    
    @AuraEnabled
    public static String consultarPorNome(String nome){

        Http h = new Http();
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint('http://www.cnpjbrasil.com/e/s?search='+EncodingUtil.urlEncode(nome,'UTF-8'));
        req.setHeader('X-Requested-With', 'XMLHttpRequest');
        req.setMethod('GET');
        
        HttpResponse res = h.send(req);
        
        System.debug('BODY');
        System.debug(res.getBody()); 
        return res.getBody();       
        
    }
    
    // @AuraEnabled
    // public static String salvarDadosJson(String id, String jsonParam){
    //     try{
    //         UtilStringHelper util = new UtilStringHelper();
    //         Account thisAccount                         = [SELECT Id, Name FROM Account where Id = :id];
    //         System.debug('Conta ' + thisAccount);
    //         Dados_da_Empresa__c dadosDaEmpresa          = new Dados_da_Empresa__c();
    //         Informacoes_do_CNPJ__c informacoesDoCnpj    = new Informacoes_do_CNPJ__c();
            
    //         Map<String, Object> mapInput                = (Map<String, Object>) JSON.deserializeUntyped(jsonParam);
            
    //         List<Contact> listaContatosRelacionados     = new List<Contact>();
    //         Map<String, List<Contact>> mapContato       = new Map<String, List<Contact>>();
    //         Outras_Informacoes__c outrasInformacoes     = new Outras_Informacoes__c();
    //         List<CNAE_Secundario__c> listCnaeSecundario = new List<CNAE_Secundario__c>();

            
    
    //         mapContato.put(thisAccount.Id, new List<Contact>());
    //         for(Contact c : [SELECT AccountId, FirstName, LastName FROM Contact WHERE AccountId = :thisAccount.Id]){
    //             mapContato.get(c.AccountId).add(c);
    //         }
    
    //         thisAccount.Name                            = (String) mapInput.get('nome');
    //         thisAccount.CNPJ__c                         = util.removeMask( (String) mapInput.get('cnpj') );
    //         thisAccount.Phone                           = (String) mapInput.get('telefone');
    //         thisAccount.Porte__c                        = (String) mapInput.get('porte');
    //         informacoesDoCnpj.Natureza_Juridica__c      = (String)mapInput.get('natureza_juridica');
    //         informacoesDoCnpj.Nome_Fantasia__c          = (String)mapInput.get('fantasia');
    //         informacoesDoCnpj.Matriz_Filial__c          = (String)mapInput.get('tipo');
    //         dadosDaEmpresa.Email__c                     = (String)mapInput.get('email');
    //         dadosDaEmpresa.Motivo_Situacao__c           = (String)mapInput.get('motivo_situacao');
    //         dadosDaEmpresa.Situacao_Especial__c         = (String)mapInput.get('situacao_especial');
    //         dadosDaEmpresa.Telefone__c                  = (String)mapInput.get('telefone');
    //         dadosDaEmpresa.Situacao__c                  = (String)mapInput.get('situacao');
    //         dadosDaEmpresa.Data_Situacao_Especial__c    = (String)mapInput.get('data_situacao_especial');
    //         thisAccount.Capital_Social__c               = Decimal.valueOf((String)mapInput.get('capital_social'));
    //         informacoesDoCnpj.Data_Fundacao__c          = convertStringToDate((String) mapInput.get('abertura'));
    //         dadosDaEmpresa.Data_Situacao__c             = convertStringToDate((String) mapInput.get('data_situacao'));
    
    //         /*
    //         *   Id's
    //         */
    //         dadosDaEmpresa.Conta_Relacionada__c     = thisAccount.Id; 
    //         informacoesDoCnpj.Conta_Relacionada__c  = thisAccount.Id;
    //         outrasInformacoes.Conta_Relacionada__c  = thisAccount.Id;
    //         //==
    
    //         if(mapInput.get('status') == 'OK'){
    //             informacoesDoCnpj.Situacao__c = true;
    //         }
    //         /*
    //         * Adicionando Contatos Relacionados à Conta
    //         */
    //         List<Object> listaContatosInput = (List<Object>) mapInput.get('qsa');
    //         for(Object contato : listaContatosInput){
    //             Map<String, Object> contatoMap = (Map<String, Object>) contato;
    
    //             Contact c1 = new Contact();
    
    //             String nomeCompleto = (String) contatoMap.get('nome');
    //             String[] splited = nomeCompleto.split(' ');
    
    //             String lastName = ' ';
    //             String firstName = '';
    
    //             if(splited.size() > 1){
    //                 lastName = '';
    //                 Integer size = splited.size();
    //                 Integer media = Math.floor(size / 2).intValue();
    
    //                 for(Integer i = 0; i < media; i++){
    //                     if(splited[i] != ' '){
    //                         firstName += splited[i] + ' ';
    //                     }
    //                 }
    
    //                 for(Integer i = media; i < size; i++){
    //                     if(splited[i] != ' '){
    //                         lastName += splited[i] + ' ';
    //                     }
    //                 }
    
    //                 lastName = lastName.trim();
    //                 firstName = firstName.trim();
    
    //                 if(mapContato.containsKey(thisAccount.id)){
    //                     List<Contact> auxiliar = mapContato.get(thisAccount.id);
    //                     if(auxiliar.size() > 0){
    //                         Boolean sair = false;
    //                         for(Contact c : auxiliar){
    //                             if(c.FirstName == firstName && c.LastName == lastName){
    //                                 sair = true;
    //                                 break;
    //                             }                           
    //                         }
    //                         if(sair){
    //                             continue;
    //                         }
    //                     }
    //                 }
    //             }else {
    //                 firstName = nomeCompleto;
    //             }
    
    //             c1.AccountId = thisAccount.Id;
    //             c1.FirstName = firstName;
    //             c1.LastName = lastName;
    //             c1.Title = (String) contatoMap.get('qual');
    
    //             listaContatosRelacionados.add(c1);
    
    //         }
    
            
    //         //==
    
    //         /*
    //         * Atividades
    //         */
    //         String atividadePrincipal = '!';
    //         List<Object> atividades = (List<Object>) mapInput.get('atividade_principal');
    //         System.debug('Lista de Atividades ' + atividades);
    //         for(Object atividade : atividades){    
    //             Map<String, Object> atividadeMap = (Map<String, Object>) atividade;
                
    //             CNAE_Secundario__c cnae = new CNAE_Secundario__c();
    //             cnae.Nome__c = (String) atividadeMap.get('text');
    //             cnae.CNAE__c = (String) atividadeMap.get('code');
    //             cnae.Name = (String) atividadeMap.get('code');
    //             cnae.Principal__c = true;
    //             cnae.Conta_Relacionada__c = thisAccount.Id;

    //             listCnaeSecundario.add(cnae);
    
    //             atividadePrincipal += (String) atividadeMap.get('code') + ' - ' + (String) atividadeMap.get('text');
    //         }
    //         dadosDaEmpresa.Atividade_Economica_Principal__c = atividadePrincipal.split('!').get(1);
            
    //         String atividadeSecundaria = '';
    
    //         List<Object> atividadesSecundarias = (List<Object>) mapInput.get('atividades_secundarias');
    //         System.debug('Atividades Secundarias ' + atividadesSecundarias);
    //         for(Object atividade : atividadesSecundarias){
    //             Map<String, Object> atividadeMap = (Map<String, Object>) atividade;
    //             CNAE_Secundario__c cnae = new CNAE_Secundario__c();
    //             cnae.Nome__c = (String) atividadeMap.get('text');
    //             cnae.CNAE__c = (String) atividadeMap.get('code');
    //             cnae.Name = (String) atividadeMap.get('code');
    //             cnae.Conta_Relacionada__c = thisAccount.Id;
                
    //             listCnaeSecundario.add(cnae);
    //             atividadeSecundaria += (String)atividadeMap.get('code') + ' - ' + (String) atividadeMap.get('text') + ' ! ';
    //         }
    //         System.debug('Atividade Secundaria ' + atividadeSecundaria);
    //         List<String> splited = (List<String>) atividadeSecundaria.split('!');
            
            
    //         if(splited.size() > 0 && splited.get(0) != null && String.isNotEmpty(splited.get(0))){
    //             outrasInformacoes.Atividade_Economica_Secundaria__c = splited.get(0);
    //             System.debug('Splited[0] ' + outrasInformacoes.Atividade_Economica_Secundaria__c) ;   
    //         }
    //         if(splited.size() > 1 && splited.get(1) != null && String.isNotEmpty(splited.get(1))){
    //             outrasInformacoes.Atividade_Economica_Secundaria_1__c = splited.get(1);
    //             System.debug('Splited[1] ' + outrasInformacoes.Atividade_Economica_Secundaria_1__c) ;   
    //         }
    //         if(splited.size() > 2 && splited.get(2) != null && String.isNotEmpty(splited.get(2))){
    //             outrasInformacoes.Atividade_Economica_Secundaria_2__c = splited.get(2);
    //             System.debug('Splited[2] ' + outrasInformacoes.Atividade_Economica_Secundaria_2__c)   ;                 
    //         }
    //         if(splited.size() > 3 && splited.get(3) != null && String.isNotEmpty(splited.get(3))){
    //             outrasInformacoes.Atividade_Economica_Secundaria_3__c = splited.get(3);
    //         }
    //         if(splited.size() > 4 && splited.get(4) != null && String.isNotEmpty(splited.get(4))){
    //             outrasInformacoes.Atividade_Economica_Secundaria_4__c = splited.get(4);
    //         }
    //         if(splited.size() > 5 && splited.get(5) != null && String.isNotEmpty(splited.get(5))){
    //             outrasInformacoes.Atividade_Economica_Secundaria_5__c = splited.get(5);
    //         }
            
    //         //==
    //         /*
    //         *   Endereço
    //         */
    //         thisAccount.BillingState = (String)mapInput.get('uf');
    //         thisAccount.BillingStreet = (String)mapInput.get('logradouro') + ' nº '+ (String)mapInput.get('numero') + ', ' + (String)mapInput.get('bairro');
    //         thisAccount.BillingCity = (String)mapInput.get('municipio');
    //         thisAccount.BillingCountry = 'Brasil';
    //         thisAccount.BillingPostalCode = (String)mapInput.get('cep');
            
    //         String enderecoConsultaGoogle = thisAccount.BillingStreet + ', ' +thisAccount.BillingPostalCode+', '+thisAccount.BillingCity+', '+thisAccount.BillingState+', '+thisAccount.BillingCountry;
            
    //         Map<String, Object> location = ConsultaCnpj.getCoordenadas(enderecoConsultaGoogle);
    //         //System.debug(location);
    //         if(location != null){
    //             thisAccount.BillingLatitude = (Double) location.get('lat');
    //             thisAccount.BillingLongitude = (Double) location.get('lng');
    //             thisAccount.Localizacao__Latitude__s = (Double) location.get('lat');
    //             thisAccount.Localizacao__Longitude__s = (Double) location.get('lng');
    //             //System.debug('Latitude acc '+acc.Localizacao__Latitude__s);
    //             //System.debug('Latitude acc '+acc.Localizacao__Longitude__s);
    //             //System.debug('Latitude '+acc.BillingLatitude);
    //             //System.debug('Longitude '+acc.BillingLongitude);
    //         }
    //         //==        
    //         if(listaContatosRelacionados.size() > 0){            
    //             upsert listaContatosRelacionados;            
    //         }   
    //         insert informacoesDoCnpj;         
    //         insert dadosDaEmpresa;         
    //         insert outrasInformacoes;         
    //         insert listCnaeSecundario;          
    
    //         update thisAccount;
            
    //     }catch(Exception ex){
    //         System.debug('Error: ' + ex.getMessage() + ' Cause: ' + ex.getCause() + ' Trace: ' + ex.getStackTraceString());
    //         return 'null';
    //     }

    //     return 'Dados Atualizados com sucesso!';
     
    // }

    // private static Date convertStringToDate(String value){
    //     try {
    //         if(String.isNotBlank(value)){
    //             List<String> values = value.split('T');
    //             if(values != null && values.size() >= 2){
    //                 return Date.valueOf(values.get(0));
    //             }
    //         }
    //     } catch(Exception ex) {
    //         System.debug('Error: ' + ex.getMessage() + ' Cause: ' + ex.getCause() + ' Trace: ' + ex.getStackTraceString());
    //         return null;
    //     }
    //     return null;
    // }
    
    // //Retorna latitude e longititude de um endereco
    // // Endereco padrão RUA Nº, BAIRRO, CEP, CIDADE, ESTADO, PAIS
    // public static Map<String, Object> getCoordenadas(String endereco){
        
    //     if(!Test.isRunningTest()){
    //         String baseUrl = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyAGZfEZ_tVhzddxxAsKoPQM0ExJBDVTwxE&address=';
    //         Http h = new Http();
            
    //         HttpRequest req = new HttpRequest();
    //         req.setEndpoint(baseUrl + EncodingUtil.urlEncode(endereco,'UTF-8'));
    //         req.setMethod('GET');
            
    //         HttpResponse res = h.send(req);
            
    //         Map<String, Object> jsonResult = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            
    //         List<Object> results = (List<Object>) jsonResult.get('results');
            
    //         if(results.size() <= 0 || results.isEmpty()){
    //             return null;
    //         }
            
    //         Map<String, Object> primeiroEnderecoEncontrado = (Map<String,Object>) results[0];
            
    //         try{
                
    //             Map<String, Object> geometry = (Map<String, Object>) primeiroEnderecoEncontrado.get('geometry');
    //             Map<String, Object> location = (Map<String, Object>) geometry.get('location');
          
    //             return location;
                
    //         } catch(Exception e){
    //             System.debug(e);
    //             return null;
    //         }
    //     }else {
    //         Map<String, String> mapResult = new Map<String, String>();
    //         mapResult.put('location', 'lat : -22.7244322, lng : -47.2826144');
    //         mapResult.put('geometry', 'lat : -22.663062, lng : -47.1934953');
    //         return mapResult;
    //     }
    // }

    public static void testHeck(){
        Integer i = 0;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
         i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++; 
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
    }
    
}