public class MyConcreteClass extends MyVirtualClass {
	public override virtual void write() {
        System.debug('Dream Management');
    }
    
    public virtual void writeSuper() {
        super.write();
    }
}