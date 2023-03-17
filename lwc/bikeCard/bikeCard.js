import { LightningElement } from 'lwc';
import IMAGES from "@salesforce/resourceUrl/static_images";

export default class BikeCard extends LightningElement {
  name = 'JP Morgan Chase';
  description = 'A sweet bike built for comfort.';
  category = 'Banking';
  material = 'Steel';
  price = '$2,700';
  //pictureUrl = 'https://s3-us-west-1.amazonaws.com/sfdc-demo/ebikes/electrax4.jpg';
  pictureUrl = IMAGES + '/static_images/logotipo-jpmorgan.png';
}