import { AppConstants } from 'src/app/commons/app.constants';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { City } from 'src/app/entities/city';
import { Country } from 'src/app/entities/country';
import { Department } from 'src/app/entities/department';
import { Event } from 'src/app/entities/event';
import { CityService } from 'src/app/service/city.service';
import { CountryService } from 'src/app/service/country.service';
import { DepartmentService } from 'src/app/service/department.service';
import { EventService } from 'src/app/service/event.service';
import { DatePipe } from '@angular/common';
import { CategoryEvent } from 'src/app/entities/category-event';
import { CategoryEventService } from 'src/app/service/category-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit {
  event: Event;
  countries: Country[];
  departments: Department[];
  cities: City[];
  categoriesEvent: CategoryEvent[];
  countryCode: number;
  departmentCode: number;
  id: string;
  insert: boolean;
  butonEnabled: boolean;

  constructor(
    private _countryService: CountryService,
    private _departmentService: DepartmentService,
    private _cityService: CityService,
    private _eventService: EventService,
    private datepipe: DatePipe,
    private _categoryEventService: CategoryEventService,
    private activatedRoute: ActivatedRoute,
    public constants: AppConstants,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _menuService: MenuService
  ) {
    this.event = new Event();
    this.countries = [];
    this.departments = [];
    this.cities = [];
    this.categoriesEvent = [];
    this.countryCode = 0;
    this.departmentCode = 0;
    this.id = '';
    this.insert = true;
    this.butonEnabled = false;
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'] as string;
      if (this.id === undefined) {
        this.insert = true;
      } else {
        this.insert = false;
        this._eventService.getById(this.id).subscribe((resp) => {
          this.event = resp;
          this.countryCode = 57;
          this.findDepartments();
          this.findCities();
        });
      }
    });
  }

  ngOnInit(): void {
    this.findCountries();
    this.findCategories();
    this.event.eventStatus = 'CREATED';
  }
  findCategories() {
    this._categoryEventService.getAllCategories().subscribe((resp) => {
      this.categoriesEvent = resp;
    });
  }
  findCountries() {
    this._countryService.getCountries().subscribe((resp) => {
      this.countries = resp;
    });
  }
  changeCountry(event: MatSelectChange) {
    this.findDepartments();
  }
  findDepartments() {
    this._departmentService
      .getDepartmentByCountryCode(this.countryCode)
      .subscribe((resp) => {
        this.departments = resp;
      });
  }
  changeDepartment(event: MatSelectChange) {
    this.findCities();
  }
  findCities() {
    this._cityService
      .getCitiesByDepartamentCode(this.event.departmentCode)
      .subscribe((resp) => {
        this.cities = resp;
      });
  }
  ejecutarAccion(f: NgForm) {
    if (f.invalid) {
      this._snackBar.open(this.constants.ALERT_INVALID_FORM, this.constants.CLOSE, {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
      return;
    }
    let fecha = this.datepipe.transform(this.event.date, 'yyyy-MM-dd');
    this.event.date = fecha as string;
    this._eventService.insert(this.event).subscribe((resp) => {
      if (resp.id === undefined || resp.id === null) {
        this._snackBar.open('Error al crear evento', this.constants.CLOSE, {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      } else {
        this.butonEnabled = true;
        this._snackBar
          .open(this.constants.ALERT_SUCCESS, this.constants.CLOSE, {
            duration: 2000,
            panelClass: ['green-snackbar'],
          })
          .afterDismissed()
          .subscribe((resp) => {
            this.router.navigateByUrl('event');
          });
      }
    });
  }
  getMenu(){
    return this._menuService.itemsMenu;
  }
  validatePermissions():boolean{
    return this._menuService.seeMenu(['ROLE_ADMIN','ROLE_MANAGER']);
  }
}
