public with sharing class UpdateLeadOwner {
    public static void UpdateLeadOwner(String OldOwnerId, String NewOwnerId, Integer newLimit) {
        List<Lead> opps = [SELECT Id FROM Lead WHERE OwnerId = :OldOwnerId AND Status != 'Converted' LIMIT :newLimit];
        for(Lead opp : opps){
            opp.OwnerId = NewOwnerId;
            opp.Lead_Type__c = 'From old sales rep';
        }
        update opps;
    }
}