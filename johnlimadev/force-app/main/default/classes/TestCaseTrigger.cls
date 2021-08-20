@isTest
public class TestCaseTrigger {
    @isTest static void TestCaseTrigger() {
        Case caso = new Case(Status='New', Origin='Phone');

        Test.startTest();
        Database.SaveResult result = Database.insert(caso, false);
        Test.stopTest();
        System.assert(!result.isSuccess());
    }
}