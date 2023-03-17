import { LightningElement, api } from 'lwc';

//export default class StrategicAccountTile extends NavigationMixin(LightningElement) {
export default class StrategicAccountTile extends LightningElement {
    //@api accountdetail;
    @api label;
    
    // get account info and creates a link to the record page
    // viewAccountTile(event) {
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__recordPage',
    //         attributes: {
    //             recordId: event.target.value,
    //             objectApiName: 'Account',
    //             actionName: 'view'
    //         }
    //     });
    // }

}