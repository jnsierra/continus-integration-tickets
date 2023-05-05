import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicBand } from '../entities/music-band';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class MusicBandService {
  constructor(private _urlService: UrlService, private http: HttpClient) { }

  getAll() {
    return this.http.get<MusicBand[]>(this._urlService.getEndPointMusicBand());
  }

  insert(musicBand: MusicBand) {
    return this.http.post<MusicBand>(
      this._urlService.getEndPointMusicBand(),
      musicBand
    );
  }

  getById(id: string) {
    const URL_SERVICE = `${this._urlService.getEndPointMusicBand() + id}`;
    return this.http.get<MusicBand>(URL_SERVICE);
  }
}
