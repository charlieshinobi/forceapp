import { LightningElement, api, wire } from 'lwc';
import getContact from '@salesforce/apex/ContactPrimaryFind.getPrimaryContact';

export default class StrategicPrimaryContact extends LightningElement {
    @api idcontact;

    @wire (getContact, { idContact : '$idcontact'}) contactPrimary;

}