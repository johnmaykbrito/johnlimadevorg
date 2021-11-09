import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

export default class EventNotificator extends LightningElement {
    channelName = '/event/Account_Update__e';

    subscription = {};

    // Initializes the component
    connectedCallback() {
        // Register error listener
        this.handleSubscribe();
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        let that = this;
        const messageCallback = function (response) {
            console.log('New message received: ', JSON.stringify(response));
            // Response contains the payload of the new message received
            that.showNotification(response);
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;
        });
    }

    // Handles unsubscribe button click
    handleUnsubscribe() {
        // Invoke unsubscribe method of empApi
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
            // Response is true for successful unsubscribe
        });
    }

    disconnectedCallback() {
        // Register error listener
        this.handleUnsubscribe();
    }

    showNotification(response) {
        const evt = new ShowToastEvent({
            title: 'Info',
            message: response.data.payload.nhoj__Message__c,
            variant:  'info',
        });
        this.dispatchEvent(evt);
    }
}