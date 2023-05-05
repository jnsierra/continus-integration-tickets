import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigEvent } from 'src/app/entities/config-event';
import { Event } from 'src/app/entities/event';
import { Presentation } from 'src/app/entities/presentation';
import { Zone } from 'src/app/entities/zone';
import { ZoneConfigEvent } from 'src/app/entities/zone-config-event';
import { ConfigEventService } from 'src/app/service/config-event.service';
import { EventService } from 'src/app/service/event.service';
import { PresentationService } from 'src/app/service/presentation.service';
import { ZoneConfigEventService } from 'src/app/service/zone-config-event.service';
import { ZoneService } from 'src/app/service/zone.service';

@Component({
  selector: 'app-zone-config-event-edit',
  templateUrl: './zone-config-event-edit.component.html',
  styleUrls: ['./zone-config-event-edit.component.scss']
})
export class ZoneConfigEventEditComponent implements OnInit{
  zoneConfigEvent:ZoneConfigEvent;
  insertAccion:boolean;
  botonInactive:boolean;
  eventId:number;
  presentationId:number;
  zones:Zone[];
  configEvent:ConfigEvent;
  events:Event[];
  presentations:Presentation[];
  
  constructor(private activatedRoute: ActivatedRoute
    , private router:Router
    , private _zoneService: ZoneService
    , private _configEventsService: ConfigEventService
    , private _eventService: EventService
    , private _presentationService: PresentationService
    , private _zoneConfigEventService: ZoneConfigEventService
    , private _snackBar: MatSnackBar
    ){
    this.zoneConfigEvent = new ZoneConfigEvent();
    this.insertAccion = true;
    this.botonInactive = false;
    this.eventId = 0;
    this.getZones();
    this.getEvents();
    this.activatedRoute.params.subscribe(params => {
      this.zoneConfigEvent.id = params['id'] as number;
    });
  }
  ngOnInit(): void {
    if(this.zoneConfigEvent.id !== undefined){
      this.insertAccion = false;
      this.getZoneConfigEvent(this.zoneConfigEvent.id);
    }
  }
  getZoneConfigEvent(id:number){
    this._zoneConfigEventService.getById(id).subscribe(data => {
      this.getConfigEventById(data.configEventId);
      this.zoneConfigEvent=data;
    });
  }
  getConfigEventById(id:number){
    this._configEventsService.getById(id).subscribe(data => {
      this.configEvent = data;
      this.eventId = data.eventId;
      this.presentationId = data.presentationId;
      this.getPresentationsByEvent();
    });
  }
  getEvents(){
    this._eventService.getAll().subscribe(data => this.events = data);
  }
  getPresentationsByEvent(){
    this._presentationService.getByIdEvent(this.eventId).subscribe(resp => {
      this.presentations = resp;
    }); 
  }
  getZones(){
    this._zoneService.getAll().subscribe(data => {
      this.zones = data;
    });
  }
  getConfigEvents(){
    this._configEventsService.getConfigEvent(this.eventId, this.presentationId).subscribe(data => {
      this.configEvent = data;
      this.zoneConfigEvent.configEventId = this.configEvent.id;
    });
  }
  cancelar(){
    this.router.navigateByUrl('zoneConfig');
  }
  
  executeAction(f:NgForm){
    if(f.invalid){
      return ; 
    }
    this._zoneConfigEventService.save(this.zoneConfigEvent).subscribe(data => {
      if(data.id !== undefined){
        this._snackBar.open('Acción realizada exitosamente', 'cerrar', {
          duration: 2000,
          panelClass: ['green-snackbar'],
        });
        const URL_SERVICE = `/zoneConfig`;
        this.router.navigateByUrl(URL_SERVICE);
      } 
    });
  }
}