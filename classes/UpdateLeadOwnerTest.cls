@isTest
public with sharing class UpdateLeadOwnerTest {
    
    @isTest
    public static void UpdateLeadOwnerTest() {

        List<Lead> leads = new List<Lead>();
        for(Integer i=0;i<5;i++){
            leads.add(new Lead(FirstName='Rolando', LastName='CBS', Company = 'Hoppy', Status='Working', Lead_Type__c='Commuter', OwnerId='0054V00000GIL85QAH'));
        }
        insert leads;

        List<Lead> opps = [SELECT Id, OwnerId FROM Lead WHERE OwnerId = '0054V00000GIL85QAH'];

        for(Lead opp : opps){
            UpdateLeadOwner.UpdateLeadOwner(opp.OwnerId, '00530000008BtwFAAS', 1);
        }
        update opps;

        

    }
}