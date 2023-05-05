import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zone } from '../entities/zone';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private _urlService: UrlService, private http: HttpClient) { }

  getAll() {
    return this.http.get<Zone[]>(this._urlService.getEndPointZone());
  }
  getById(id: string) {
    const URL_SERVICE = `${this._urlService.getEndPointZone() + id}`;
    return this.http.get<Zone>(URL_SERVICE);
  }
  insert(zone: Zone) {
    return this.http.post<Zone>(this._urlService.getEndPointZone(), zone);
  }
  getByCategory(categoryId: number) {
    return this.http.get<Zone[]>(`${this._urlService.getEndPointPubZone()}category/${categoryId}`);
  }
}
