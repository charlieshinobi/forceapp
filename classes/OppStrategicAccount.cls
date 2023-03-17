public with sharing class OppStrategicAccount {
    public static List<Opportunity> getOppStrategicAccount(String idAccount) {
        return [
            SELECT Id, Name, StageName, AccountId, ContactId, OwnerId FROM Opportunity WHERE AccountID = :idAccount
            WITH SECURITY_ENFORCED
        ];
    }
}