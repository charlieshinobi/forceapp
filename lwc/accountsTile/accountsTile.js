import { LightningElement, api } from 'lwc';

export default class AccountsTile extends NavigationMixin(LightningElement) {
    @api accountdetail;
    // get account info and creates a link to the record page
    viewAccountTile(event) {
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