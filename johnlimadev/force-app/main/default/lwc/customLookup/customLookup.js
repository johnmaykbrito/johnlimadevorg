import { LightningElement } from 'lwc';

export default class CustomLookup extends LightningElement {
    fields = ["Name","Email","Username"];
    displayFields = 'Name, Email, Username'

    handleLookup(event){
        console.log( JSON.parse(JSON.stringify ( event.detail)) )
    }
}