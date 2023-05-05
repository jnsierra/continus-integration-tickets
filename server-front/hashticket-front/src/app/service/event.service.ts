import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Event } from '../entities/event';
import { FullEvent } from '../entities/full-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _urlService: UrlService, private http: HttpClient) { }

  insert(event: Event) {
    return this.http.post<Event>(this._urlService.getEndPointEvent(), event);
  }
  getAll() {
    return this.http.get<Event[]>(this._urlService.getEndPointEvent());
  }
  getById(id: string) {
    const URL_SERVICE = `${this._urlService.getEndPointEvent() + id}`;
    return this.http.get<Event>(URL_SERVICE);
  }
  getEventByEventIdAndPresentationId(eventId: string, presentationId: string) {
    const URL_SERVICE = `${this._urlService.getEndPointPubEvent()}${eventId}/presentation/${presentationId}`;
    return this.http.get<FullEvent>(URL_SERVICE);
  }
  getActiveEvents() {
    const URL_SERVICE = `${this._urlService.getEndPointPubEvent()}active`;
    return this.http.get<Event[]>(URL_SERVICE);
  }
}