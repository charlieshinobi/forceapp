import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class StrategicAccountList extends NavigationMixin(LightningElement) {
    
    @wire(getAccounts) accounts;

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
  

}