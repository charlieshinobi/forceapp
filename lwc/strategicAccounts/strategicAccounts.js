import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getRecords, getFieldValue} from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

//import IMAGES from "@salesforce/resourceUrl/JPMorganLogo";
import ACCOUNTID from '@salesforce/schema/Account.Id';
import COMPANY from '@salesforce/schema/Account.Name';
import PHONE from '@salesforce/schema/Account.Phone';
import STREET from '@salesforce/schema/Account.BillingStreet';
import CITY from '@salesforce/schema/Account.BillingCity';
import STATE from '@salesforce/schema/Account.BillingState';
import COUNTRY from '@salesforce/schema/Account.BillingCountry';
import POSTALCODE from '@salesforce/schema/Account.BillingPostalCode';
import EMPLOYEES from '@salesforce/schema/Account.NumberOfEmployees';
import INDUSTRY from '@salesforce/schema/Account.Industry';
import OFFICES from '@salesforce/schema/Account.No_of_Offices__c';
import EMPLOYEEOFFICE from '@salesforce/schema/Account.No_of_Employees_in_Each_Office__c';
import LOCATIONS from '@salesforce/schema/Account.Office_Locations__c';
import METROAREAS from '@salesforce/schema/Account.Metro_Areas__c';
import PAYROLL from '@salesforce/schema/Account.Payroll_Provider__c';
import BENEFITS from '@salesforce/schema/Account.Benefits_Provided__c';
import SUPPLIERS from '@salesforce/schema/Account.Benefit_Suppliers__c';
import BROKER from '@salesforce/schema/Account.Who_is_your_broker_consultant__c';
import CONTACT from '@salesforce/schema/Account.Contact_Above_or_Below_Them__c';

const FIELDS = [ACCOUNTID,COMPANY, PHONE, STREET, STATE, CITY, COUNTRY, POSTALCODE, EMPLOYEES, INDUSTRY, OFFICES, EMPLOYEEOFFICE, LOCATIONS, METROAREAS, PAYROLL, BENEFITS, SUPPLIERS, BROKER, CONTACT];


//import getAccountList from '@salesforce/apex/FetchMultipleRecords.search';

//we get all company fields from Accounts in Salesforce

export default class StrategicAccounts extends LightningElement {
    @api recordId;
    accounts;
    //@track error;
   

    @wire(getRecords, {
        records: [
            {
                recordIds: ['0017j00000syF5PAAU','0017j00000mOfHaAAK', '0017j00000mL3YsAAK'],
                fields: [ACCOUNTID, COMPANY]
            }
        ]
    }) wiredRecords({ error, data }){
        // if (data) {
        //     this.accounts = data;
        //     this.error = undefined;
        //     console.log(this.accounts);
        // } else if (error) {
        //     this.error = error;
        //     this.accounts = undefined;
        // }
        if (data) {
            // this.accounts = data;
            // this.name = this.accounts.results[1].result.fields.COMPANY.value;
            //return "DATA OK";
        } else if (error) {
            //return "DATA ERROR";
        }
        
    };

    @wire(getRecords, {
        records: [
            {
                recordIds: ['0017j00000syF5PAAU','0017j00000mOfHaAAK', '0017j00000mL3YsAAK'],
                fields: [FIELDS]
            }
        ]
    }) allacounts;

    get allaccount1(){
        //return getFieldValue(this.allacounts.data[0], COMPANY);
    }

    @wire(getRecord, { recordId: '0017j00000syF5PAAU', fields: FIELDS}) account1;

    @wire(getRecord, { recordId: '0017j00000mOfHaAAK', fields: [COMPANY]}) account2;
    @wire(getRecord, { recordId: '0017j00000mL3YsAAK', fields: [COMPANY]}) account3;

    get id1(){
        return getFieldValue(this.account1.data, ACCOUNTID);
    }
    //logo1 = IMAGES + '/JPMorganLogo/logotipo-jpmorgan.png';
    //get logotipo1(){
      //  return logo1 = IMAGES + '/JPMorganLogo/logotipo-jpmorgan.png';
    //}
    get name1(){
        return getFieldValue(this.account1.data, COMPANY);
    }
    get phone1(){
        return getFieldValue(this.account1.data, PHONE);
    }
    get street1(){
        return getFieldValue(this.account1.data, STREET);
    }
    get city1(){
        return getFieldValue(this.account1.data, CITY);
    }
    get state1(){
        return getFieldValue(this.account1.data, STATE);
    }
    get country1(){
        return getFieldValue(this.account1.data, COUNTRY);
    }
    get postal1(){
        return getFieldValue(this.account1.data, POSTALCODE);
    }
    get employees1(){
        return getFieldValue(this.account1.data, EMPLOYEES);
    }
    get industry1(){
        return getFieldValue(this.account1.data, INDUSTRY);
    }
    get offices1(){
        return getFieldValue(this.account1.data, OFFICES);
    }
    get employeeoffice1(){
        return getFieldValue(this.account1.data, EMPLOYEEOFFICE);
    }
    get locations1(){
        return getFieldValue(this.account1.data, LOCATIONS);
    }
    get metroareas1(){
        return getFieldValue(this.account1.data, METROAREAS);
    }
    get payroll1(){
        return getFieldValue(this.account1.data, PAYROLL);
    }
    get benefits1(){
        return getFieldValue(this.account1.data, BENEFITS);
    }
    get suppliers1(){
        return getFieldValue(this.account1.data, SUPPLIERS);
    }
    get broker1(){
        return getFieldValue(this.account1.data, BROKER);
    }
    get contact1(){
        return getFieldValue(this.account1.data, CONTACT);
    }

    navigateToObjectHome() {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home',
            },
        });
    }



    get name2(){
        return getFieldValue(this.account2.data, COMPANY);
    }

   
}