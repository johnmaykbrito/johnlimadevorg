import { LightningElement, api } from 'lwc';

export default class ConfirmationModalLWC extends LightningElement {

    @api recordId

    closeQuickAction() {
        const closeQA = new CustomEvent('close');
        this.dispatchEvent(closeQA);
    }
}