public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, Phone, Industry, BillingState, BillingCity, BillingStreet, BillingCountry, BillingPostalCode, NumberOfEmployees, No_of_Offices__c, No_of_Employees_in_Each_Office__c, Description,Office_Locations__c, Metro_Areas__c, Payroll_Provider__c, Benefits_Provided__c, Benefit_Suppliers__c, Who_is_your_broker_consultant__c, Contact_Above_or_Below_Them__c, Website, Primary_Contact__c
            FROM Account WHERE Top_Strategic_Account__c = TRUE
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }
}