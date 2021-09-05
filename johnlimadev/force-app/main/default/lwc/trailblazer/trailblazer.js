import { LightningElement } from 'lwc';
import PORTFOLIO from '@salesforce/resourceUrl/portfolio';

export default class Trailblazer extends LightningElement {
    port = PORTFOLIO;
    rangerImgUrl = PORTFOLIO + '/portfolio/images/ranger.png';
}