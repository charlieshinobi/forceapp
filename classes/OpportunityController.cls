public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitiesWon() {
        return [
            SELECT Id, Name, Description, IdCompany__c, AccountId, Account.Name, CreatedById, CreatedBy.Name, OwnerId, Owner.Name, CreatedDate, CloseDate, Closed_Won_Date__c, IsWon, Product_s__C
            FROM Opportunity
            WHERE IsWon = TRUE
            WITH SECURITY_ENFORCED
            ORDER BY CloseDate
        ];
    }
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Id, Name, Description, IdCompany__c, AccountId, Account.Name, CreatedById, CreatedBy.Name, OwnerId, Owner.Name, CreatedDate, CloseDate, Closed_Won_Date__c, IsWon, Product_s__C
            FROM Opportunity
            WITH SECURITY_ENFORCED
            ORDER BY CloseDate
        ];
    }
}