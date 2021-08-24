import { LightningElement } from 'lwc';
import { RECORD_VALIDATION_RESULT } from 'c/recordValidationScreen';


export default class RecordValidationScreenHarness extends LightningElement {
    mockRecordId = '5001U000002qYq2QAE';

    renderedCallback() {
        setTimeout(() => { console.log(RECORD_VALIDATION_RESULT) }, 500);
    }
}