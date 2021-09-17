import { LightningElement } from 'lwc';
import PORTFOLIO from '@salesforce/resourceUrl/portfolio';

export default class TrailblazerProfile extends LightningElement {
    profilePicUrl = PORTFOLIO + '/portfolio/images/profile-pic.jpg';
}