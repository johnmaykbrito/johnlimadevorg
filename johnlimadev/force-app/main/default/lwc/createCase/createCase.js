import { LightningElement } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CASE_OBJECT from '@salesforce/schema/Case';

import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';

import DESCRIPTION_FIELD from '@salesforce/schema/Case.Description';

 

export function sum(x, y) {

    return x + y;

  }

 

export default class CreateCase extends LightningElement {

    objectApiName = CASE_OBJECT;

    fields = [SUBJECT_FIELD, DESCRIPTION_FIELD];

 

    handleSuccess(event) {

        const toastEvent = new ShowToastEvent({

            title: "Case created",

            message: "Case ID: " + event.detail.id,

            variant: "success"

        });

        this.dispatchEvent(toastEvent);

    }    

    // handleError(event) {

    //     event.preventDefault();

    //     const toastEvent = new ShowToastEvent({

    //         title: "Case Not Created!",

    //         message: "Error Detail: " + event.detail.message,

    //         variant: "error"

    //     });

        

    //     this.dispatchEvent(toastEvent);

 

    // }

 

}