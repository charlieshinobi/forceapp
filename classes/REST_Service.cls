@RestResource(UrlMapping='/AccountDML/*')
global with sharing class REST_Service {
    @HttpPost
    global static String insertAccount(Account acct) {
        insert acct;
        return acct.Id;
    }
    @HttpGet
    global static Account getAccountById() {
        RestRequest request = RestContext.request;
        // grab the accountId from the end of the URL
        String accountId = request.requestURI.substring(
          request.requestURI.lastIndexOf('/')+1);
        Account result =  [SELECT Name
                        FROM Account
                        WHERE Id = :accountId];
        return result;
    }
}