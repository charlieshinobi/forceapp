public with sharing class WrapperObjects {
    public WrapperObjects() {

    }


    public class createAccount_Controller {
        public class wrappAccount {
            public String CardCode {get; set;}
            public String CardName {get; set;}
            public String Series {get; set;}
            public String CardType {get; set;}
            public String GroupCode {get; set;}
            public string CompanyPrivate {get; set;}
            public String Phone1 {get; set;}
            public Integer PayTermsGrpCode {get; set;}
            //public String VatLiable {get; set;}
            public String FederalTaxID {get; set;}
            public integer SalesPersonCode {get; set;}
            public String CurrencyCode {get; set;}
            public String EmailAddress {get; set;}
            public String Valid {get; set;}
            public String U_IDSFDC {get; set;}
            public String U_BXP_REGIMENF {get; set;}
            //public List<wrappAddress> AddressName {get; set;}
            public String TaxCode {get; set;}
        }
        public class wrappAddress {
            public String Street {get; set;}
            public String Block {get; set;}
            public String ZipCode {get; set;}
            public String City {get; set;}
            public String Country {get; set;}
            public String State {get; set;}
            public String AddressType {get; set;}
        }
        public static String createJSON (String idSalesforce) {
            string jsonGenerated = '';
            wrappAccount jsonCuenta = new wrappAccount();
            List<Account> lstCuenta = new List<Account>();
            List<CardType_c> lstCardType = [SELECT Name, Id, cCustomerc FROM CardType_c LIMIT 1];
            List<VatLiable_c> lstvLiable = [SELECT Name, Id, vLiablec FROM VatLiable_c LIMIT 1];
            List<wrappAddress> ltsDirecciones = new List<wrappAddress>();
            for(Account acc : [SELECT Codigo_SAP_c,Name,Phone,R_F_Cc,Id,Regimen_Fiscalc,Activoc,EmailAddressc,Owner.C_digo_SAPc,Empresa_c,
                               Condiciones_de_Pago_r.Grupo_SAP_Numc,Pa_sr.Codigoc,Estador.Codigo_Estadoc,Grupo_Clienter.Codigo_Grupo_SN_c 
                               FROM Account 
                               WHERE Id =: idSalesforce LIMIT 1]) {
                lstCuenta.add(acc);
            }
            jsonCuenta.Series = '72';
            jsonCuenta.CardCode = lstCuenta[0].Codigo_SAP__c;
            jsonCuenta.CardName = lstCuenta[0].Name;
            jsonCuenta.Cardtype = 'C';/lstCardType.size()>0 ? lstCardType[0].cCustomer__c : '';/
            jsonCuenta.GroupCode = lstCuenta[0].Grupo_Cliente_r.Codigo_Grupo_SN_c;
            jsonCuenta.CompanyPrivate = lstCuenta[0].Empresa__c;
            jsonCuenta.Phone1 = lstCuenta[0].Phone;
            jsonCuenta.PayTermsGrpCode = Integer.valueOf(lstCuenta[0].Condiciones_de_Pago_r.Grupo_SAP_Num_c);
            //jsonCuenta.VatLiable = lstvLiable.size()>0 ? lstvLiable[0].vLiable__c : '';
            jsonCuenta.FederalTaxID = lstCuenta[0].R_F_C__c;
            jsonCuenta.SalesPersonCode = Integer.valueOf(lstCuenta[0].Owner.C_digo_SAP__c);
            jsonCuenta.CurrencyCode = '##';
            jsonCuenta.EmailAddress = lstCuenta[0].EmailAddress__c;
            jsonCuenta.Valid = lstCuenta[0].Activo__c == true ? 'tYES' : 'tNO';
            jsonCuenta.U_IDSFDC = lstCuenta[0].Id;
            jsonCuenta.U_BXP_REGIMENF = lstCuenta[0].Regimen_Fiscal__c;
            jsonCuenta.TaxCode = 'B16';
            for(Direccion__c dir : [SELECT Id,Direccion__c.Name,Calle_c,Coloniac,Codigo_Postalc,Ciudadc,Tipo_de_Direccionc,Cuenta_c,
                                    Estado_r.Codigo_Estadoc,Paisr.Codigo_c
                                   FROM Direccion__c
                                   WHERE Cuenta__c =: idSalesforce]) {
                wrappAddress direcciones = new wrappAddress();
                             direcciones.Street = dir.Calle__c;
                             direcciones.Block = dir.Colonia__c;
                             direcciones.ZipCode = dir.Codigo_Postal__c;
                             direcciones.City = dir.Ciudad__c;
                             direcciones.Country = dir.Pais_r.Codigo_c;
                             direcciones.State = dir.Estado_r.Codigo_Estado_c;
                             direcciones.AddressType = dir.Tipo_de_Direccion__c;
                             ltsDirecciones.add(direcciones);
            }
            //jsonCuenta.AddressName = ltsDirecciones;
            jsonGenerated = JSON.serialize(jsonCuenta);
            system.debug('JSON generado: '+jsonGenerated);
            return jsonGenerated;
            //system.debug('JSON PRETTY generado: '+JSON.serializePretty(jsonGenerated));
        }
    }

}


public static String postAccount(String requestSAP) {
    String body = createAccount_Controller.createJSON(requestSAP);
    String token = bxtiWSQueueable.loginWs();
    String resp = '';
    if(!String.isEmpty(body) && !String.isEmpty(token)) {
         Http http = new  Http();        
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://vm-sap.agroversa.mx:49999/b1s/v1/BusinessPartners');
        request.setMethod('POST');
        request.setClientCertificateName('agroversamx');
        request.setTimeout(120000);
        request.setHeader('Cookie', 'B1SESSION=' + token);
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBody(body);
        HttpResponse response = http.send(request);
        resp = response.getBody();
        system.debug('RESP : '+resp);
        SAPLog_c log = new SAPLog_c();
        log.CodigoRespuesta__c = String.valueOf(response.getStatusCode());
        log.DetalleRespuesta__c = resp;
        log.Estatus__c = response.getStatusCode() == 201 || response.getStatusCode() == 200 ? 'Exitoso' : 'Error';
        log.JSON__c = body;
        insert log;
    }
    
    return resp;
}