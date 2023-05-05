import { Artist } from '../entities/artist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private _urlService: UrlService, private http: HttpClient) { }

  getAll() {
    return this.http.get<Artist[]>(this._urlService.getEndPointArtist());
  }

  insert(artist: Artist) {
    return this.http.post<Artist>(
      this._urlService.getEndPointArtist(),
      artist
    );
  }

  getById(id: string) {
    const URL_SERVICE = `${this._urlService.getEndPointArtist() + id}`;
    return this.http.get<Artist>(URL_SERVICE);
  }
}
