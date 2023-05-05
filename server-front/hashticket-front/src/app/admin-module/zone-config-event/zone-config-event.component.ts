import { AppConstants } from 'src/app/commons/app.constants';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Event } from 'src/app/entities/event';
import { Presentation } from 'src/app/entities/presentation';
import { ZoneConfigEvent } from 'src/app/entities/zone-config-event';
import { EventService } from 'src/app/service/event.service';
import { PresentationService } from 'src/app/service/presentation.service';
import { ZoneConfigEventService } from 'src/app/service/zone-config-event.service';

@Component({
  selector: 'app-zone-config-event',
  templateUrl: './zone-config-event.component.html',
  styleUrls: ['./zone-config-event.component.scss']
})
export class ZoneConfigEventComponent implements OnInit {
  events:Event[];
  eventId:number;
  presentationId:number;
  presentations:Presentation[];

  displayedColumns: string[] = [
    this.constants.COLUMN_SELECT, 
    'zone', 
    'configEvent', 
    'cost', 
    'numberOfTickets'
  ];
  dataSource = new MatTableDataSource<ZoneConfigEvent>();
  selection = new SelectionModel<ZoneConfigEvent>(true, []);

  constructor( private router:Router
    , private _snackBar: MatSnackBar
    , private _zoneConfigEventService: ZoneConfigEventService
    , private _eventService: EventService
    , private _presentationService: PresentationService
    , public constants: AppConstants){
    this.events = [];
    this.eventId = 0;
    this.presentationId = 0; 
    this.presentations = [];
  }
  ngOnInit(): void {
    this._eventService.getAll().subscribe(data => this.events = data);
  }
  getPresentationsByEvent(){
    this._presentationService.getByIdEvent(this.eventId).subscribe(resp => {
      this.presentations = resp;
    }); 
  }
  consultar(){
    this._zoneConfigEventService.getByIdEventAndIdPresentation(this.eventId, this.presentationId).subscribe(data =>{
      this.dataSource.data = data;
    });
  }
  insertar(){
    if (this.selection.selected.length == 0) {
      const URL_SERVICE = `/zoneConfigInsert`;
      this.router.navigateByUrl(URL_SERVICE);
      return ;
    }
    this._snackBar.open('No puede tener items seleccionados ', 'cerrar', {
      duration: 2000,
      panelClass: ['red-snackbar'],
    });
  }
  update() {
    if (this.selection.selected.length == 1) {
      const URL_SERVICE = `/zoneConfigUpdate/${this.selection.selected[0].id}`;
      this.router.navigateByUrl(URL_SERVICE);
    } else if (this.selection.selected.length == 0) {
      this._snackBar.open('Debes seleccionar un item', 'cerrar', {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
    } else if (this.selection.selected.length > 1) {
      this._snackBar.open('Acción no permitida para más de un item', 'cerrar', {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ZoneConfigEvent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }

}
