public with sharing class POST_Example {
    public void sendPOSTReq() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:SalesforceDev2POST');
        req.setMethod('POST');
        //req.setHeader(key: 'Authorization', value: 'Bearer' + sessionId); If you don't create an Auth. Provider in Salesforce
        req.setHeader('Content-Type', 'application/json');
        String acctToPass = JSON.serialize(wrapAccount(generateAccount()));
        System.debug('This is the account JSON ::: ' + acctToPass);
        req.setBody(acctToPass);
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        System.debug(res.getBody());
    }
    
    private Account generateAccount(){
        List<Account> lstCuenta = new List<Account>();
            
        // for(Account acc : [SELECT Id, Name, Phone, Industry, IdCompany__c, AccountSource FROM Account WHERE Id =: idSalesforce LIMIT 1]) {
        //     lstCuenta.add(acc);
        // }
        for(Account acc : [SELECT Id, Name, Phone, Industry, IdCompany__c, AccountSource FROM Account WHERE Id = '0017j00000tZohJAAS' LIMIT 1]) {
            lstCuenta.add(acc);
        }

        Account acct = new Account();
        // acct.Name = 'FCN COMPANY 001';
        // acct.Phone = '77622212546';
        // acct.Industry = 'Banking';
        // acct.IdCompany__c = '00001';
        // acct.AccountSource = 'FCN System';
        acct.Name = lstCuenta[0].Name;
        acct.Phone = lstCuenta[0].Phone;
        acct.Industry = lstCuenta[0].Industry;
        acct.IdCompany__c = lstCuenta[0].IdCompany__c;
        acct.AccountSource = lstCuenta[0].AccountSource;

        return acct;        
    }

    private AccountWrapper wrapAccount(Account acct){
        AccountWrapper wrapper = new AccountWrapper();
        wrapper.acct = acct;
        return wrapper;
    }
}

// Execute in Anonymous Developer Console
// POST_Example post = new POST_Example();
// post.sendPOSTReq();

//https://edenredus--edendev1.my.salesforce.com/services/apexrest/AccountDML/
//https://edenredus--edendev1.sandbox.my.salesforce.com/services/apexrest/AccountDML/

//This is the account JSON ::: {"acct":{"attributes":{"type":"Account"},"Name":"ABM Industries","Phone":"(212) 297-0200","Industry":"Facilities Management & Commercial Cleaning, Business Services","IdCompany__c":null,"AccountSource":null}}

//https://trailhead.salesforce.com/es/content/learn/modules/apex_integration_services/apex_integration_webservices