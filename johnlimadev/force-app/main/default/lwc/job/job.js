import { LightningElement, api, track } from 'lwc';

export default class Job extends LightningElement {
    @api at;
    @track sections = {
        safetec: false,
        leve: false,
        dreamm: false,
        dtt: false,
        gft: false,
    }

    connectedCallback() {
        this.enableSection(this.at.toLowerCase());
    }

    enableSection(sectionName) {
        for (var prop in this.sections) {
            if (Object.prototype.hasOwnProperty.call(this.sections, prop)) {
                if (sectionName === prop.toLowerCase()) {
                    this.sections[sectionName] = true;
                    break;
                }
                this.sections[sectionName] = false;
            }
        }
    }
}