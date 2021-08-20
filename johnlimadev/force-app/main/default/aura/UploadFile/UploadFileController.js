({
	doInit: function(component, helper, event) {
		// alert($A.get("$SObjectType.CurrentUser.Id"));
		component.set("v.currentUser", $A.get("$SObjectType.CurrentUser"));
	},

	handleUploadFinished: function (component, event) {
        // This will contain the List of File uploaded data and status
        var uploadedFiles = event.getParam("files");
		alert("Files uploaded : " + uploadedFiles.length);
		// console.log(uploadedFiles);
		helper.getuploadedFiles(component);
    }
})