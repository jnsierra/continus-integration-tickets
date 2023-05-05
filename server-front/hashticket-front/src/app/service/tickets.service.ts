import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { GenericResponse } from '../entities/generic-response';
import { TicketView } from '../entities/ticket-view';
import { map } from 'rxjs';
import { GenericQuery } from '../entities/generic-query';
import { Ticket } from '../entities/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private _urlService: UrlService, private http: HttpClient) { }

  generateTickets(eventId: number, presentationId: number) {
    const URL_SERVICE = `${this._urlService.getEndPointBusinessTickets()}generate/event/${eventId}/presentation/${presentationId}`;
    return this.http.get<GenericResponse>(URL_SERVICE);
  }

  getByEventAndPresentation(eventId: number, presentationId: number, records: number, page: number) {
    let params = new HttpParams().set("myRecord", records).set("page", page);
    const URL_SERVICE = `${this._urlService.getEndPointTickets()}event/${eventId}/presentation/${presentationId}`;
    return this.http.get<GenericQuery<TicketView>>(URL_SERVICE, { params: params })
      .pipe(
        map(item => {
          item.results = item.results.sort((a, b) => (a.numberTicket > b.numberTicket) ? 1 : -1)
          return item;
        })
      );
  }

  buyTicket(ticket: Ticket) {
    return this.http.post<GenericResponse>(`${this._urlService.getEndPointBusinessTickets()}buy`, ticket);
  } 

  getTicketsByEventPresentationZoneAndCategory(eventId: number, presentationId: number, zoneId: number, categoryId: number) {
    return this.http.get<Ticket[]>(`${this._urlService.getEndPointPubTickets()}event/${eventId}/presentation/${presentationId}/zone/${zoneId}/category/${categoryId}`);
  }
}