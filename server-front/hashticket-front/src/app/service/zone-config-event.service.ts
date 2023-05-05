import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { ZoneConfigEvent } from '../entities/zone-config-event';

@Injectable({
  providedIn: 'root'
})
export class ZoneConfigEventService {

  constructor(private _urlService: UrlService, private http: HttpClient) { }

  getByIdEventAndIdPresentation(idEvent:number, idPresentation:number){
    const URL_SERVICE = `${this._urlService.getEndPointZoneConfigEvent()}event/${idEvent}/presentation/${idPresentation}`;
    return this.http.get<ZoneConfigEvent[]>(URL_SERVICE);
  }
  save(zoneConfigEvent:ZoneConfigEvent){
    return this.http.post<ZoneConfigEvent>(this._urlService.getEndPointZoneConfigEvent(), zoneConfigEvent);
  }
  getZoneConfigEventByEventIdAndPresentationId(idEvent:number, idPresentation:number){
    const URL_SERVICE = `${this._urlService.getEndPointPubZoneConfigEvent()}event/${idEvent}/presentation/${idPresentation}`;
    return this.http.get<ZoneConfigEvent[]>(URL_SERVICE);
  }
  getById(id:number){
    const URL_SERVICE = `${this._urlService.getEndPointZoneConfigEvent() + id}`;
    return this.http.get<ZoneConfigEvent>(URL_SERVICE);
  }
}
