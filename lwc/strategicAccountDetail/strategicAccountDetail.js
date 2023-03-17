import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import getContact from '@salesforce/apex/ContactPrimaryFind.getPrimaryContact';

import ACCOUNTID from '@salesforce/schema/Account.Id';
import COMPANY from '@salesforce/schema/Account.Name';
import DESCRIPTION from '@salesforce/schema/Account.Description';
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
import WEBSITE from '@salesforce/schema/Account.Website';
import PRIMARYCONTACT from '@salesforce/schema/Account.Primary_Contact__c';
import OWNER from '@salesforce/schema/Account.Owner.Name';
import PRESIDENT from '@salesforce/schema/Account.President__c';
import SUBSIDIARY from '@salesforce/schema/Account.Subsidiaries__c';
import SUMMARY from '@salesforce/schema/Account.Strategy_Summary__c';
import OBJECTIVE from '@salesforce/schema/Account.Short_term_objective__c';
import COMMUTER from '@salesforce/schema/Account.Offer_Commuter__c';


const FIELDS = [ACCOUNTID, COMPANY, DESCRIPTION, PHONE, STREET, STATE, CITY, COUNTRY, POSTALCODE, EMPLOYEES, INDUSTRY, OFFICES, EMPLOYEEOFFICE, LOCATIONS, METROAREAS, PAYROLL, BENEFITS, SUPPLIERS, BROKER, CONTACT, WEBSITE, PRIMARYCONTACT, OWNER, PRESIDENT, SUBSIDIARY, SUMMARY, OBJECTIVE];

export default class StrategicAccountDetail extends LightningElement {
    @api recordId; //get record ID from page
    
    contactId2 = '';
    contacts;
    error;
    firstname;
    listlocations = '';
    splitlocation = '';

    @wire (getRecord, { recordId: '$recordId', fields: FIELDS}) accountDet;

    //get all accounts fields with ID from URL because is a record page
    
    @wire (getContact, { idContact : '0037j00000q6L9uAAE'}) contactPrim;
    //to use only for testing
   
    get contactvalue(){
        this.contactId2 = getFieldValue(this.accountDet.data, PRIMARYCONTACT);
        getContact({ idContact : this.contactId2})
        .then(result =>{
            this.contacts = result;
        })
        .catch(error =>{
            this.error = error;
        });
       
        return this.contacts;
        
    }
    get contactvaluesimple(){
        this.contactId2 = getFieldValue(this.accountDet.data, PRIMARYCONTACT);
        return this.contactId2; 
    }


    get name(){
        return getFieldValue(this.accountDet.data, COMPANY);
    }
    get description(){
        return getFieldValue(this.accountDet.data, DESCRIPTION);
    }
    get phone(){
        return getFieldValue(this.accountDet.data, PHONE);
    }
    get street(){
        return getFieldValue(this.accountDet.data, STREET);
    }
    get city(){
        return getFieldValue(this.accountDet.data, CITY);
    }
    get state(){
        return getFieldValue(this.accountDet.data, STATE);
    }
    get country(){
        return getFieldValue(this.accountDet.data, COUNTRY);
    }
    get postal(){
        return getFieldValue(this.accountDet.data, POSTALCODE);
    }
    get employees(){
        return getFieldValue(this.accountDet.data, EMPLOYEES);
    }
    get industry(){
        return getFieldValue(this.accountDet.data, INDUSTRY);
    }
    get offices(){
        return getFieldValue(this.accountDet.data, OFFICES);
    }
    get employeeoffice(){
        return getFieldValue(this.accountDet.data, EMPLOYEEOFFICE);
    }
    get locations(){
        //this.splitlocation = getFieldValue(this.accountDet.data, LOCATIONS);
        //this.listlocations = this.splitlocation.split(";");
        //return this.listlocations;
        return getFieldValue(this.accountDet.data, LOCATIONS);
    }
    get metroareas(){
        return getFieldValue(this.accountDet.data, METROAREAS);
    }
    get payroll(){
        return getFieldValue(this.accountDet.data, PAYROLL);
    }
    get benefits(){
        return getFieldValue(this.accountDet.data, BENEFITS);
    }
    get suppliers(){
        return getFieldValue(this.accountDet.data, SUPPLIERS);
    }
    get broker(){
        return getFieldValue(this.accountDet.data, BROKER);
    }
    get contact(){
        return getFieldValue(this.accountDet.data, CONTACT);
    }
    get website(){
        return getFieldValue(this.accountDet.data, WEBSITE);
    }
    get primarycontact(){
        return getFieldValue(this.accountDet.data, PRIMARYCONTACT);
    }
    get owner(){
        return getFieldValue(this.accountDet.data, OWNER);
    }
    
    get president(){
        return getFieldValue(this.accountDet.data, PRESIDENT);
    }
    get subsidiary(){
        return getFieldValue(this.accountDet.data, SUBSIDIARY);
    }
    get summary(){
        return getFieldValue(this.accountDet.data, SUMMARY);
    }
    get objective(){
        return getFieldValue(this.accountDet.data, OBJECTIVE);
    }
    get commuter(){
        return getFieldValue(this.accountDet.data, COMMUTER);
    }
}