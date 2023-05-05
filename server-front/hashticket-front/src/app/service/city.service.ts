import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { City } from '../entities/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _urlService: UrlService, private http: HttpClient) { }

  getCityByCodeAndDepartamentCode(cityCode: number, departmentCode: number) {
    const URL_SERVICE = `${this._urlService.getEndPointCity()}${cityCode}/${departmentCode}`;
    return this.http.get<City>(URL_SERVICE);
  }
  getCitiesByDepartamentCode(departmentCode: number) {
    const URL_SERVICE = `${this._urlService.getEndPointCity()}department/${departmentCode}`;
    return this.http.get<City[]>(URL_SERVICE);
  }
}
