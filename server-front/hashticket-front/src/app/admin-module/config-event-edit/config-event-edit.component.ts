import { AppConstants } from 'src/app/commons/app.constants';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigEvent } from 'src/app/entities/config-event';
import { Presentation } from 'src/app/entities/presentation';
import { ConfigEventService } from 'src/app/service/config-event.service';
import { MenuService } from 'src/app/service/menu.service';
import { PresentationService } from 'src/app/service/presentation.service';

@Component({
  selector: 'app-config-event-edit',
  templateUrl: './config-event-edit.component.html',
  styleUrls: ['./config-event-edit.component.scss']
})
export class ConfigEventEditComponent implements OnInit {
  configEvent: ConfigEvent;
  createAction: boolean;
  presentations: Presentation[];
  butonDisabled: boolean;
  constructor(private activatedRoute: ActivatedRoute
    , private router: Router
    , private _snackBar: MatSnackBar
    , public constants: AppConstants
    , private datepipe: DatePipe
    , private _presentationService: PresentationService
    , private _configEventService: ConfigEventService
    , private _menuService: MenuService) {
    this.configEvent = new ConfigEvent();
    this.createAction = true;
    this.butonDisabled = false;
    this.presentations = [];
    this.activatedRoute.params.subscribe(params => {
      this.configEvent.eventId = params['idEvent'] as number;
      this.getPresentations();
      this.configEvent.id = params['id'] as number;
    });
  }
  ngOnInit(): void {
    if (!(this.configEvent.id === undefined)) {
      this.createAction = false;
      this._configEventService.getById(this.configEvent.id).subscribe(resp => {
        this.configEvent = resp;
      });
    }
  }
  getPresentations() {
    this._presentationService.getByIdEvent(this.configEvent.eventId).subscribe(resp => {
      this.presentations = resp;
    });
  }
  executeAction(f: NgForm) {
    if (f.invalid) {
      return;
    }
    let fecha = this.datepipe.transform(this.configEvent.eventDate, 'yyyy-MM-dd');
    this.configEvent.eventDate = fecha as string;
    this._configEventService.save(this.configEvent).subscribe(resp => {
      this._snackBar.open(this.constants.ALERT_SUCCESS, this.constants.CLOSE, {
        duration: 2000,
        panelClass: ['green-snackbar'],
      });
      this.router.navigateByUrl(`configEvent/${this.configEvent.eventId}`);
    });
  }
  getMenu(){
    return this._menuService.itemsMenu;
  }
  validatePermissions():boolean{
    return this._menuService.seeMenu(['ROLE_ADMIN','ROLE_MANAGER']);
  }
}