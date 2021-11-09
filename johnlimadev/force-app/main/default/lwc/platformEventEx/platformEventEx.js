// https://developer.salesforce.com/docs/component-library/bundle/lightning-emp-api/documentation
// https://www.youtube.com/watch?v=LG8qx3wycW8
import { LightningElement, track } from 'lwc';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';

export default class PlatformEventEx extends LightningElement {
    channelName = '/event/Record_Creation__e';
    isSubscribeDisabled = false;
    isUnsubscribeDisabled = !this.isSubscribeDisabled;

    subscription = {};

    @track accountNameList = [];

    connectedCallback() {
        this.handleSubscribe();
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = function (response) {
            console.log('New message received: ', JSON.stringify(response));
            // Response contains the payload of the new message received
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, this.messageCallback).then((response) => {
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
        this.handleUnsubscribe();
    }

    messageCallback = (response) => {
        let actName = response.data.payload.nhoj__Record_Name__c;
        let actId = response.data.payload.nhoj__Record_Id__c;
        let recPath = '/' + response.data.payload.nhoj__Record_Id__c;

        this.accountNameList.push({"Id":actId, "Name": actName, "recPath": recPath});
        console.log("AccountNameList: " + JSON.stringify(this.accountNameList));
    }
}