import { LightningElement, track, wire } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';

export default class ReturnContactsWire extends LightningElement {
    @track searchKey;

    @wire(findContacts, {searchKey: '$searchKey'})
    contacts;

    handleSearch() {
        let value = this.template.querySelector('lightning-input').value;
        this.searchKey = value === '' ? null : value;
    }
}