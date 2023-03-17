import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import STATE_FIELD from '@salesforce/schema/Account.BillingState';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const COLUMNS = [
    { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'url', typeAtrributes: { label: {fieldName: 'Name', target: '_blank'}} },
    { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'phone' },
    { label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'text' },
    { label: 'State', fieldName: STATE_FIELD.fieldApiName, type: 'text' }
];

//export default class AccountList extends LightningElement {
export default class AccountList extends NavigationMixin(LightningElement) {    
    columns = COLUMNS;
    availableAccounts;

    @wire(CurrentPageReference) pageRef;
    @wire(getAccounts) accounts;

    //@wire(getAccounts)
    //accounts;

    @wire(getAccounts)
    wiredAccount( { error, data}) {
        if(data) {
            let tempRecs = [];
            data.forEach((record) => {
                let tempRec = Object.assign( {}, record);
                tempRec.AccountName = '/' + tempRec.Id;
                tempRecs.push(tempRec);
            });
            this.availableAccounts = tempRecs;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.availableAccounts = undefined;
        }
    }

//    We store the result in the accounts property. If the operation succeeds, the records are accessible on accounts.data. If it fails, the error surfaces in accounts.error.

    // get account info and creates a link to the record page
    viewAccount(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.value,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
    
    viewAccount2(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                recordId: event.target.dataset.id,
                pageName: 'Home_app_Strategic_Accounts',
                actionName: 'view'
            }
        });
    }
    viewAccount3(event) {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/Home_app_Strategic_Accounts?c__recordId=' + event.target.dataset.id
            }
        }).then(generatedUrl => {
            window.open(generatedUrl);
        });
    }

    url;

    connectedCallback() {
        // Store the PageReference in a variable to use in handleClick.
        // This is a plain Javascript object that conforms to the
        // PageReference type by including 'type' and 'attributes' properties.
        // The 'state' property is optional.
        this.accountHomePageRef = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home'
            }
        };
        this[NavigationMixin.GenerateUrl](this.accountHomePageRef)
            .then(url => this.url = url);
    }

    handleClick(evt) {
        // Stop the event's default behavior.
        // Stop the event from bubbling up in the DOM.
        evt.preventDefault();
        evt.stopPropagation();
        // Navigate to the Account Home page.
        this[NavigationMixin.Navigate](this.accountHomePageRef);
    }    

}