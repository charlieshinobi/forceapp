public with sharing class POST_Account {
    public void sendPOSTReq() {
        String body = createJSON('0017j00000tZohJAAS'); //for test with account controller

        HttpRequest req = new HttpRequest();
        //req.setEndpoint('callout:SalesforcePOST');
        req.setEndpoint('callout:SalesforceDev2POST');
        req.setMethod('POST');
        //req.setHeader(key: 'Authorization', value: 'Bearer' + sessionId); If you don't create an Auth. Provider in Salesforce
        req.setHeader('Content-Type', 'application/json');
        String acctToPass = JSON.serialize(wrapAccount(generateAccount()));
        System.debug('This is the account JSON ::: ' + acctToPass);
        System.debug('This is the account JSON WITH BODY ::: ' + body);
        //req.setBody(acctToPass);
        req.setBody(body);
        Http http = new Http();
        HttpResponse res = http.send(req);
        System.debug(res.getBody());
    }

    //public class createAccount_Controller {
        public class wrappAccount {
            public String Name {get; set;}
            public String Phone {get; set;}
            public String Industry {get; set;}
            public String AccountSource {get; set;}
            
        }
        public static String createJSON (String idSalesforce) {
            string jsonGenerated = '';
            wrappAccount jsonCuenta = new wrappAccount();
            //AccountWrapper wrapper = new AccountWrapper();
            //wrapper.acct = acct;
            //return wrapper;

            List<Account> lstCuenta = new List<Account>();
            
            for(Account acc : [SELECT Id, Name, Phone, Industry, IdCompany__c, AccountSource FROM Account WHERE Id =: idSalesforce LIMIT 1]) {
                lstCuenta.add(acc);
            }
            
            jsonCuenta.Name = lstCuenta[0].Name;
            jsonCuenta.Phone = lstCuenta[0].Phone;
            jsonCuenta.Industry = lstCuenta[0].Industry;
            jsonCuenta.AccountSource = lstCuenta[0].AccountSource;

            
            jsonGenerated = JSON.serialize(jsonCuenta);
            
            system.debug('JSON generado: '+jsonGenerated);
            return jsonGenerated;
            
            //system.debug('JSON PRETTY generado: '+JSON.serializePretty(jsonGenerated));
        }
    //}
    private Account generateAccount(){
        Account acct = new Account();
        acct.Name = 'FCN COMPANY 001';
        acct.Phone = '77622212546';
        acct.Industry = 'Banking';
        acct.IdCompany__c = '00001';
        acct.AccountSource = 'FCN System';
        return acct;
        
        //List<Account> getacct = [SELECT Id, Name, Phone, Industry, IdCompany__c, AccountSource FROM Account WHERE Id ='0017j00000tZohJAAS'];
        //for(Account acct : getacct){
            //acct.Name = getacct.Name;
            // acct.Phone = getacct.Phone;
            // acct.Industry = getacct.Industry;
            // acct.IdCompany__c = getacct.IdCompany__c;
            // acct.AccountSource = getacct.AccountSource;
        //}
        //return acct;
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