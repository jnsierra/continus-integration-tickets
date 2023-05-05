import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/service/category.service';
import { ConfirmTicketComponent } from '../confirm-ticket/confirm-ticket.component';
import { Event } from 'src/app/entities/event';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Presentation } from 'src/app/entities/presentation';
import { Ticket } from 'src/app/entities/ticket';
import { TicketsService } from 'src/app/service/tickets.service';
import { Zone } from 'src/app/entities/zone';
import { ZoneConfigEvent } from 'src/app/entities/zone-config-event';
import { ZoneConfigEventService } from 'src/app/service/zone-config-event.service';


@Component({
  selector: 'app-ticket-selection',
  templateUrl: './ticket-selection.component.html',
  styleUrls: ['./ticket-selection.component.scss']
})
export class TicketSelectionComponent {
  category: Category[];
  event: Event;
  categoryId: number;
  fullEvent: ZoneConfigEvent;
  presentation: Presentation;
  ticket: Ticket[];
  ticketsId: number[];
  zone: Zone[];
  zoneConfigEvent: ZoneConfigEvent[];
  zoneName: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _ticketService: TicketsService,
    private _zoneConfigEventService: ZoneConfigEventService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.event = new Event();
    this.fullEvent = new ZoneConfigEvent();
    this.presentation = new Presentation();
    this.ticket = [];
    this.zoneConfigEvent = [];
    this.category = [];
    this.categoryId = 0;
    this.ticketsId = [];
    this.zoneName = '';
    this.activatedRoute.params.subscribe((params) => {
      this.event.id = params['idEvent'] as number;
      this.presentation.id = params['idPresentation'] as number;
      this.getCategories();
    });
  }

  getZoneConfigEvents(categoryId: number) {
    this._zoneConfigEventService.getZoneConfigEventByEventIdAndPresentationId(this.event.id, this.presentation.id).subscribe((resp) => {
      this.zoneConfigEvent = resp.filter(zce => zce.zone.categoryId == categoryId);
    });
  }

  getCategories() {
    this._categoryService.getByEventIdAndPresentationId(this.event.id, this.presentation.id).subscribe((resp) => {
      this.category = resp;
    });
  }

  getTickets(fullEvent: ZoneConfigEvent, numberOfTickets: string) {
    this._ticketService.getTicketsByEventPresentationZoneAndCategory(this.event.id, this.presentation.id, fullEvent.zone.id, fullEvent.zone.categoryId).subscribe((resp) => {
      this.ticket = resp;
      /**Validate if there are enough tickets to sell */
      if (this.ticket.length >= Number(numberOfTickets)) {
        this.ticket.slice(0,Number(numberOfTickets)).forEach(tik => {
          this.ticketsId.push(tik.numberTicket)
        });
        this.openConfirmation(fullEvent, numberOfTickets, this.ticketsId);
      } else {
        this._snackBar.open(
          'No hay suficientes entradas disponibles, por favor seleccione una cantidad inferior',
          'Cerrar',
          {
            duration: 2500,
            panelClass: ['red-snackbar'],
          }
        );
      }
    })
  }

  openConfirmation(fullEvent: ZoneConfigEvent, numberOfTickets: string, ticket: number[]) {
    const dialogRef = this.dialog.open(ConfirmTicketComponent, {
      width: '400px',
      height: '230px',
      enterAnimationDuration: '10',
      exitAnimationDuration: '10',
      data: {
        eventId: this.event.id,
        presentationId: this.presentation.id,
        categoryId: this.categoryId,
        zone: fullEvent.zone,
        quantity: numberOfTickets,
        totalValue: Number(numberOfTickets) * Number(fullEvent.cost),
        tickets: ticket
      },
    });
  }
}

