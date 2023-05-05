import { Component } from '@angular/core';

@Component({
  selector: 'app-display-tickets',
  templateUrl: './display-tickets.component.html',
  styleUrls: ['./display-tickets.component.scss']
})
export class DisplayTicketsComponent {
  public qrCode: string;

  constructor(){
    this.qrCode = '[asdt65F645655665CdjlkL9jlKLJ9Jp,5fTGc456ctfCtrcJHLLjlPOIOMLpMÑLMÑ]'
  }
}
