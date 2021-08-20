public with sharing class Models {
    
    public class DadosDaEmpresa {
        public String data_situacao;
        public String nome;
        public String uf;
        public String telefone;
        public String situacao;
        public String bairro;
        public String logradouro;
        public String numero;
        public String cep;
        public String municipio;
        public String porte;
        public String abertura;
        public String natureza_juridica;
        public String fantasia;
        public String cnpj;
        public String ultima_atualizacao;
        public String status;
        public String tipo;
        public String complemento;
        public String email;
        public String efr;
        public String motivo_situacao;
        public String situacao_especial;
        public String data_situacao_especial;
        public String capital_social;
    }
    public with sharing class EmpresaResponse {
    public List<DadosDaEmpresa> DadosDaEmpresa;
    public EmpresaResponse() {}
    }

    public class Eu {
        public String nome;
        public Integer idade;
    }

    public with sharing class CustomersResponse {
    public List<Customer> Customers;
    public Integer Count;
    public CustomersResponse() {}
    }

    public with sharing class Customer {
    public String Status;
    public String Message;
    public String FirstName;
    public String LastName;
    public String Email;
    public String Phone;
    public Customer() {}
    }


    public class Globo {
        public String data_situacao;
        public String nome;
        public String uf;
        public String telefone;
        public String situacao;
        public String bairro;
        public String logradouro;
        public String numero;
        public String cep;
        public String municipio;
        public String porte;
        public String abertura;
        public String natureza_juridica;
        public String fantasia;
        public String cnpj;
        public String ultima_atualizacao;
        public String status;
        public String tipo;
        public String complemento;
        public String email;
        public String efr;
        public String motivo_situacao;
        public String situacao_especial;
        public String data_situacao_especial;
        public String capital_social;
        public List<AtividadesSecundarias> atividades_secundarias;
        public Billing billing;
    }

    public class GloboResponse {
        public List<Customer> Customers;
        public GloboResponse() {}
    }

    public class AtividadePrincipal {
        public String text;
        public String code;
    }

    public class AtividadesSecundarias {
        public String text;
        public String code;
    }

    public class Billing {
        public Boolean free;
        public Boolean database;
    }

    public class CanalResponse {
        public List<Globo> CanalResponse;
    }

    



}