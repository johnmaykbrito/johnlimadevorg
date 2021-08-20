public class RunAsForTest {
    public static void doSomething() {
        System.debug([select id, name from user limit 1]);
    }
}