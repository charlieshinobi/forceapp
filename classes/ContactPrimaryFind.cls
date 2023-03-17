public with sharing class ContactPrimaryFind {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getPrimaryContact(String idContact) {
        return [
            SELECT Id, FirstName, LastName, Title, Email, Phone, HQ_Phone__c, Direct_Phone__c, Alternate_Phone__c, Description
            FROM Contact WHERE Id = :idContact
            WITH SECURITY_ENFORCED
        ];
    }
}