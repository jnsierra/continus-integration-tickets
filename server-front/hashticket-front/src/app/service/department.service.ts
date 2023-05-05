import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Department } from '../entities/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _urlService: UrlService, private http: HttpClient) { }

  getDepartmentById(code: number) {
    const URL_SERVICE = `${this._urlService.getEndPointDepartment() + code}`;
    return this.http.get<Department>(URL_SERVICE);
  }
  getDepartmentByCountryCode(countryCode: number) {
    const URL_SERVICE = `${this._urlService.getEndPointDepartment()}/country/${countryCode}`;
    return this.http.get<Department[]>(URL_SERVICE);
  }
}
