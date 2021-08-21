import { LightningElement } from 'lwc';

export default class LookupUserHarness extends LightningElement {
    toUserName = '';
    toUserRecordId = '';

    onUserSelection(event) {
        this.toUserName = event.detail.selectedValue;
        this.toUserRecordId = event.detail.selectedRecordId;
    }
}