import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
import getOpportunitiesWon from '@salesforce/apex/OpportunityController.getOpportunitiesWon';

export default class OpportunityClosedWon extends NavigationMixin(LightningElement) {
    
    @wire(getOpportunitiesWon) opportunities;

//    We store the result in the opporutnities property. If the operation succeeds, the records are accessible on opportunities.data. 

    // get opportunity info and creates a link to the record page
    viewOpportunity(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.value,
                objectApiName: 'Opportunity',
                actionName: 'view'
            }
        });
    }
}