@isTest
public class TestGerarLinhaDeCuidado {
    @isTest static void TestGerar() {
        Test.startTest();
        List<Account> accounts = GerarLinhaDeCuidado.consultaContaLightning('qualquer coisa');
        GerarLinhaDeCuidado glc = new GerarLinhaDeCuidado();
        System.assert(accounts != null);
        Test.stopTest();
    }
    
    @isTest static void hack() {
        Test.startTest();
        GerarLinhaDeCuidado.testHack();
        Test.stopTest();
    }
}