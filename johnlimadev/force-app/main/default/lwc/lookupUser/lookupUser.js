import { LightningElement, api } from 'lwc';
import getUsers from "@salesforce/apex/LookupUserController.getUsers";
const RECORD_SELECTION = 'recordselection';

export default class LookupUser extends LightningElement {
    @api selectedValue;
    @api selectedRecordId;
    searchKey = '';
    timeOutId;
    recordList;
    message;

    getUsersJS() {
        getUsers({ searchKey: this.searchKey })
            .then((result) => {
                if (result) {
                    if (!result.objects) {
                        this.recordList = null;

                    } else if (result.objects.length > 0) {
                        this.recordList = result.objects;
                        
                    } else {
                        this.message = "No users found";
                        this.recordList = [];
                        
                        var that = this;
                        this.timeOutId = setTimeout(function() {
                            that.recordList = null;
                            that.message = null;
                        }, 1000);
                    }
                }
            })
            .catch((error) => {
                // fire toast from toast util component here
            });
    }

    handleKeyChange(event) {
        if (this.timeOutId)
            clearTimeout(this.timeOutId);
        
        const searchKey = event.target.value;
        this.searchKey = searchKey;
        
        var that = this;
        this.timeOutId = setTimeout(function() {
                that.getUsersJS();
        }, 300);
    }

    onRecordSelection(event) {
        this.selectedRecordId = event.target.dataset.key;
        this.selectedValue = event.target.dataset.name;
        this.onSeletedRecordUpdate();
    }

    removeRecordOnLookup(event) {
        this.searchKey = null;
        this.selectedValue = null;
        this.selectedRecordId = null;
        this.recordList = null;
        this.onSeletedRecordUpdate();
    }
    onSeletedRecordUpdate() {
        const passEvent = new CustomEvent(RECORD_SELECTION, {
            detail: {selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue }
        });  
        this.dispatchEvent(passEvent);
    }
}