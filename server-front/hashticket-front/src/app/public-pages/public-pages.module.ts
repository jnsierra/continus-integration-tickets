import { NgModule } from '@angular/core';
import { CardEventComponent } from './card-event/card-event.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCarouselModule } from '@magloft/material-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MoreInfoComponent } from './more-info/more-info.component';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { TicketSelectionComponent } from './ticket-selection/ticket-selection.component';
import { ConfirmTicketComponent } from './confirm-ticket/confirm-ticket.component';
import { SuccessfulPurchaseComponent } from './successful-purchase/successful-purchase.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DisplayTicketsComponent } from './display-tickets/display-tickets.component';

@NgModule({
  declarations: [PrincipalPageComponent, CardEventComponent, MoreInfoComponent, TicketSelectionComponent, ConfirmTicketComponent, SuccessfulPurchaseComponent, DisplayTicketsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    QRCodeModule
  ],
  exports: [PrincipalPageComponent],
})
export class PublicPagesModule { }
