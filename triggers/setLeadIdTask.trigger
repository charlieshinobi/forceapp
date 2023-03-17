trigger setLeadIdTask on Task (before insert) {

    for(Task t : Trigger.new) {
        t.Description = 'Adding description from APEX';
        List<Lead> lstLead = new List<Lead>();
        //emailToFind = t.Email;
        for(Lead getlead : [SELECT Id, FirstName, LastName, Email FROM Lead WHERE Email = :t.Lead_Email__c LIMIT 1]) {
            lstLead.add(getlead);
        }
        t.WhoId = lstLead[0].Id;
    }   
}