public with sharing class LeadController {
    @AuraEnabled(cacheable=true)
    public getLeadById(String emailLead) {
        return[
            SELECT Id, FirstName, LastName, Email FROM Lead
            WHERE Email = :emailLead
        ]
    }
}