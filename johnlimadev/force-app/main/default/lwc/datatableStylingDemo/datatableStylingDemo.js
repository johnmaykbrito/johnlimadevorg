//https://www.youtube.com/watch?v=LrfUuZzoMxo
import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/DatatableStylingController.getAccounts';
import { loadStyle } from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/colors';

const COLUMNS = [
    {
        label: 'Account Name', fieldName: 'Name', type: 'text',
        cellAttributes: {
            class: {
                fieldName: 'accountNameClasses'
            },
        },
    },
    {
        label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency',
        cellAttributes: {
            class: {
                fieldName: 'annualRevenueClasses',
            },
            iconName: {
                fieldName: 'iconName',
            },
            iconPosition: 'right',
        },
    },
    {
        label: 'Industry', fieldName: 'Industry', type: 'text',
        cellAttributes: {
            // It's possible to set classes statically.
            // It is necessary to use slds available classes. (not standard CSS)
            // class: 'slds-text-color_success slds-text-title_caps',
            class: {
                fieldName: 'industryClasses'
            },
        },
    },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', },
];

export default class DatatableStylingDemo extends LightningElement {
    tableData;
    columns = COLUMNS;
    isCssLoaded = false;

    @wire(getAccounts)
    accountsHandler({ data, error }) {
        if (data) {
            this.tableData = data.map(item => {
                let annualRevenueClasses = item.AnnualRevenue < 500000 ? 'slds-text-color_error' : 'slds-text-color_success';
                let iconName = item.AnnualRevenue < 500000 ? 'utility:down' : 'utility:up';
                let industryClasses = item.AnnualRevenue < 500000 ? 'slds-icon-custom-custom69 slds-text-color_default ' : 'slds-icon-custom-custom96 slds-text-color_default ';
                industryClasses += item.AnnualRevenue < 500000 ? 'slds-text-title_caps ' : '';

                return { ...item, 'annualRevenueClasses': annualRevenueClasses, 'iconName': iconName, 'industryClasses': industryClasses, 'accountNameClasses': 'salmon-column' }
            });
            console.log(this.tableData);
        }

        if (error) {
            console.log(error);
        }
    }

    renderedCallback() {
        if (this.isCssLoaded) return;
        loadStyle(this, COLORS).then(() => {
            console.log('Loaded Successfully.');
            this.isCssLoaded = true;
        }).catch(error => {
            console.error('Error loading the resource.');
        });

    }
}