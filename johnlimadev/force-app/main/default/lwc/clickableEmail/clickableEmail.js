import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ClickableEmail extends NavigationMixin(LightningElement) {
    @api recordId;
    @api email;
    
    navigateToRecord(event) {
        // Navigate
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                actionName: 'view',
            },
        }).then(url => window.open(url));
    }
}