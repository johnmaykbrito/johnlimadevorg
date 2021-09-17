import { LightningElement, api } from 'lwc';
import PORTFOLIO from '@salesforce/resourceUrl/portfolio';

export default class JobAvatar extends LightningElement {
    imageName = PORTFOLIO;

    @api job;
    @api title;
    @api website;
    @api period;
    @api position;

    connectedCallback() {
        switch (this.job) {
            case 'Safetec':
                this.imageName += '/portfolio/images/jobs/safetec.png';
                break;

            case 'Leve':
                this.imageName += '/portfolio/images/jobs/leve.png';
                break;

            case 'Dreamm':
                this.imageName += '/portfolio/images/jobs/dreamm.png';
                break;

            case 'DTT':
                this.imageName += '/portfolio/images/jobs/deloitte.png';
                break;

            case 'GFT':
                this.imageName += '/portfolio/images/jobs/gft.png';
                break;

            default:
                break;
        }
    }
}