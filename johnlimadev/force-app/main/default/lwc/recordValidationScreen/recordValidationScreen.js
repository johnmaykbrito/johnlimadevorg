import { LightningElement, api } from 'lwc';
import getRecordValidation from "@salesforce/apex/RecordValidationScreenController.runRecordValidation";
import { fireToast} from 'c/lwcUtils';

const RECORD_VALIDATION_RESULT = {};

export default class RecordValidationScreen extends LightningElement {
    @api recordId;
    @api showWarnings;
    @api showErrors;
    recordValitationResult = {};
    activeSections = [];
    showMsgWarningList = false;
    showMsgErrorList = false;
    showAmtWarningList = false;
    showAmtErrorList = false;
    isValidating = false;

    connectedCallback() {
        this.getRecordValidationJS();
    }

    validateComponentAttributes() {
        this.showWarnings = this.showWarnings == 'true' || this.showWarnings == 'false' ? JSON.parse(this.showWarnings) : false;
        this.showErrors = this.showErrors == 'true' || this.showErrors == 'false' ? JSON.parse(this.showErrors) : false;
        
        if (!this.showWarnings && !this.showErrors) {
            this.showWarnings = true;
        }
    }

    getRecordValidationJS() {
        this.isValidating = true;
        getRecordValidation({ recordId: this.recordId })
        .then((result) => {
            this.isValidating = false;
            if (!result) {
                fireToast(this, "Fail", 'Something went wrong.', "Error");
                RECORD_VALIDATION_RESULT = {};
            }

            this.recordValitationResult = result;
            this.openSections(this.recordValitationResult);
            
            RECORD_VALIDATION_RESULT = this.recordValitationResult;
        })
        .catch((error) => {
            fireToast(this, "Fail", 'Something went wrong.', "Error");
        });
    }

    openSections(data) { 
        this.validateComponentAttributes();

        if (data.messages && data.messages.length > 0) {
            if (!this.activeSections.includes('Msg-Warning')) {
                this.showMsgWarningList = this.showWarnings;
                this.activeSections.push('Msg-Warning');
            }

            if (!this.activeSections.includes('Msg-Error')) {
                this.showMsgErrorList = this.showErrors;
                this.activeSections.push('Msg-Error');
            
            }

            data.messages.forEach(msg => {
                this.activeSections.push(msg.name);
            });
        }

        if (data.amounts && data.amounts.length > 0) {
            if (!this.activeSections.includes('Amt-Warning')) {
                this.showAmtWarningList = true;
                this.activeSections.push('Amt-Warning');
            }

            if (!this.activeSections.includes('Amt-Error')) {
                this.showAmtErrorList = this.showErrors;
                this.activeSections.push('Amt-Error');
            }

            data.amounts.forEach(amt => {
                this.activeSections.push(amt.name);
            });
        }
    }
}

export {
    RECORD_VALIDATION_RESULT
};