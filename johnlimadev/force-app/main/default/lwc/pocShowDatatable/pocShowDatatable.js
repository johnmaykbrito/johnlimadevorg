import { LightningElement, track } from 'lwc';
import findAccounts from '@salesforce/apex/PocShowDatatableController.findAccounts';

export default class PocShowDatatable extends LightningElement {
    @track data = [];
    connectedCallback() {
        this.columns = [
            { label: 'Name', fieldName: 'Name', typeAttributes: { acceptedFormats: '.jpg,.jpeg,.pdf,.png' } },
            { label: 'Account Number', fieldName: 'AccountNumber' },
            { label: 'Upload', type: 'fileUpload', fieldName: 'Id' }
        ];
        findAccounts().then(res => { this.data = res; }).catch(err => console.error(err));
    }
    handleUploadFinished(event) {
        event.stopPropagation();
        console.log('data => ', JSON.stringify(event.detail.data));
    }
}