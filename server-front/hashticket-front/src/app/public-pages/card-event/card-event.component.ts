import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/entities/event';
import { EventImages } from 'src/app/entities/event-images';
import { EventImageService } from '../../service/event-image.service';
import { ConfigEvent } from 'src/app/entities/config-event';
import { ConfigEventService } from 'src/app/service/config-event.service';
import { Presentation } from 'src/app/entities/presentation';
import { PresentationService } from 'src/app/service/presentation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss'],
})
export class CardEventComponent implements OnInit {
  @Input()
  event: Event;
  eventImages: EventImages[];
  configEvent: ConfigEvent;
  presentation: Presentation[];

  constructor(
    private _events: EventImageService,
    private _configEvent: ConfigEventService,
    private _presentation: PresentationService,
    private router: Router,
  ) {
    this.event = new Event();
    this.eventImages = [];
    this.configEvent = new ConfigEvent();
    this.presentation = [];
  }

  ngOnInit(): void {
    this._events.getEventImagesByEventAndType(this.event.id, 'MINIATURE').subscribe((resp) => {
      this.eventImages = resp;
    });

    this._presentation.getPresentation(this.event.id).subscribe((resp) => {
      this.presentation = resp;
      this._configEvent
        .getConfigEvent(this.event.id, this.presentation[0].id)
        .subscribe((resp) => {
          this.configEvent = resp;
        });
    });
  }
  moreInfo() {
    this.router.navigateByUrl(`/moreInfo/${this.event.id}/${this.presentation[0].id}`);
  }
  buyTicket() {
    this.router.navigateByUrl(`/ticketSelection/${this.event.id}/${this.presentation[0].id}`);
  }
}
