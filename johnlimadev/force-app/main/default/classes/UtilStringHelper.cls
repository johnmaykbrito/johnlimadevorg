public with sharing class UtilStringHelper {
	public UtilStringHelper() {
		
	}

	public String removeMask(String withMask){
		return withMask.replaceAll('[./-]', '');
	}
}