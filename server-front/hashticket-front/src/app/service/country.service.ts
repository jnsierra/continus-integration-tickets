import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../entities/country';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _urlService: UrlService, private http: HttpClient) { }

  getCountries() {
    const URL_SERVICE = `${this._urlService.getEndPointCountry()}`;
    return this.http.get<Country[]>(URL_SERVICE);
  }
}