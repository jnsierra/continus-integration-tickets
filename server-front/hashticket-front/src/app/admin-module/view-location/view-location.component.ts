import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/entities/city';
import { Department } from 'src/app/entities/department';
import { DepartmentService } from 'src/app/service/department.service';
import { CityService } from '../../service/city.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent implements OnInit {

  cityCode: number;
  departmentCode: number;

  city: City;
  department: Department;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _cityService: CityService, private _departmentService: DepartmentService) {
    this.cityCode = data.cityCode;
    this.departmentCode = data.departmentCode;
    this.city = new City();
    this.department = new Department();
  }
  ngOnInit(): void {
    this.getCity();
  }
  getCity() {
    this._cityService.getCityByCodeAndDepartamentCode(this.cityCode, this.departmentCode).subscribe(resp => {
      this.city = resp;
      this.getDepartment();
    });
  }
  getDepartment() {
    this._departmentService.getDepartmentById(this.city.departmentCode).subscribe(resp => {
      this.department = resp;
    });
  }
}