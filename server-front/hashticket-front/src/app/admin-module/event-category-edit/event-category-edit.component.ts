import { AppConstants } from 'src/app/commons/app.constants';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EventCategory } from 'src/app/entities/event-category';
import { CategoryEventService } from 'src/app/service/category-event.service';

@Component({
  selector: 'app-event-category-edit',
  templateUrl: './event-category-edit.component.html',
  styleUrls: ['./event-category-edit.component.scss']
})
export class EventCategoryEditComponent implements OnInit {
  eventCategory: EventCategory;
  createAccion: boolean;
  botonInactive: boolean;
  constructor(private _categoryEventService: CategoryEventService
    , private activatedRoute: ActivatedRoute
    , public constants: AppConstants
    , private router: Router
    , private _snackBar: MatSnackBar) {
    this.eventCategory = new EventCategory();
    this.createAccion = true;
    this.botonInactive = false;
    this.activatedRoute.params.subscribe(params => {
      this.eventCategory.id = params['id'] as number;
    });
  }
  ngOnInit(): void {
    this.getEventCategory();
  }
  getEventCategory() {
    if (!(this.eventCategory.id === undefined)) {
      this._categoryEventService.getById(this.eventCategory.id).subscribe(res => {
        this.eventCategory = res;
      });
    }
  }
  executeAction(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._categoryEventService.save(this.eventCategory).subscribe(res => {
      this._snackBar.open(this.constants.ALERT_SUCCESS, this.constants.CLOSE, {
        duration: 2000,
        panelClass: ['green-snackbar'],
      });
      this.router.navigateByUrl('eventCategory');
    });
  }
}
