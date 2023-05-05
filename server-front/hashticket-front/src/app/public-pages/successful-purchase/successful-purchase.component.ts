import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-successful-purchase',
  templateUrl: './successful-purchase.component.html',
  styleUrls: ['./successful-purchase.component.scss']
})
export class SuccessfulPurchaseComponent {
  public ticket: any;
  public qrCode: string;

  constructor (private location: Location) {
    this.ticket = location.getState()
    this.qrCode = "["
    this.ticket.ticket.forEach((element: { confirmNumberTicket: string; }) => {
      this.qrCode += "\""+element.confirmNumberTicket+"\","
    });
    this.qrCode = this.qrCode.slice(0,-1)+"]"
  }

}
