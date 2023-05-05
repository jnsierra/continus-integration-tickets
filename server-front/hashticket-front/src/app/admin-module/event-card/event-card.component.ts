import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/entities/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  event: Event;
  @Input()
  eventId: number;

  constructor(private _eventService: EventService) {
    this.event = new Event();
    this.eventId = 0;
  }
  ngOnInit(): void {
    this._eventService.getById(this.eventId.toString()).subscribe(resp => {
      this.event = resp;
    });

  }
}
