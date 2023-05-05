import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/entities/event';
import { EventImages } from 'src/app/entities/event-images';
import { EventImageService } from '../../service/event-image.service';
import { EventService } from 'src/app/service/event.service';
import { FullEvent } from 'src/app/entities/full-event';
import { Presentation } from 'src/app/entities/presentation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent {
  event: Event;
  presentation: Presentation;
  eventImages: EventImages[];
  fullEvent: FullEvent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _eventImageService: EventImageService,
    private _eventService: EventService,
    private router: Router,
  ) {
    this.event = new Event();
    this.eventImages = [];
    this.presentation = new Presentation();
    this.fullEvent = new FullEvent();
    this.activatedRoute.params.subscribe((params) => {
      this.event.id = params['idEvent'] as number;
      this.presentation.id = params['idPresentation'] as number;
      this.getEvent();
      this.getEventImage();
    });

  }

  getEvent() {
    this._eventService.getEventByEventIdAndPresentationId(this.event.id.toString(), this.presentation.id.toString()).subscribe((resp) => {
      this.fullEvent = resp;
    });
  }

  getEventImage() {
    this._eventImageService.getEventImagesByEventAndType(this.event.id, 'PRINCIPAL').subscribe((resp) => {
      this.eventImages = resp;
    });
  }

  buyTicket() {
    this.router.navigateByUrl(`/ticketSelection/${this.fullEvent.id}/${this.presentation.id}`);
  }
}
