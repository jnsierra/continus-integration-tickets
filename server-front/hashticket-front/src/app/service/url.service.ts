import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  urlBaseBusiness: string;
  urlBaseDatos: string;
  urlBasePublic: string;

  constructor() {
    this.urlBaseBusiness = environment.urlBaseBussines;
    this.urlBaseDatos = environment.urlBaseDatos;
    this.urlBasePublic = environment.urlBasePublic;
  }

  getEndPointArtist() {
    return `${this.urlBaseDatos}v.1/artist/`;
  }
  getEndPointBusinessEventImages() {
    return `${this.urlBaseBusiness}v.1/event_images/`;
  }
  getEndPointBusinessTickets() {
    return `${this.urlBaseBusiness}v.1/ticket/`;
  }
  getEndPointCategory() {
    return `${this.urlBaseDatos}v.1/category/`;
  }
  getEndPointCategoryEvent() {
    return `${this.urlBaseDatos}v.1/category_event/`;
  }
  getEndPointCity() {
    return `${this.urlBaseDatos}v.1/city/`;
  }
  getEndPointConfigEvent() {
    return `${this.urlBaseDatos}v.1/config_event/`;
  }
  getEndPointCountry() {
    return `${this.urlBaseDatos}v.1/country/`;
  }
  getEndPointDepartment() {
    return `${this.urlBaseDatos}v.1/department/`;
  }
  getEndPointEvent() {
    return `${this.urlBaseDatos}v.1/event/`;
  }
  getEndPointEventImages() {
    return `${this.urlBaseDatos}v.1/event_images/`;
  }
  getEndPointMusicBand() {
    return `${this.urlBaseDatos}v.1/musicBand/`;
  }
  getEndPointPresentation() {
    return `${this.urlBaseDatos}v.1/presentation/`;
  }
  getEndPointPubCategory() {
    return `${this.urlBasePublic}v.1/category/`;
  }
  getEndPointPubConfigEvent() {
    return `${this.urlBasePublic}v.1/config_event/`;
  }
  getEndPointPubEvent() {
    return `${this.urlBasePublic}v.1/event/`;
  }
  getEndPointPubImageById() {
    return `${this.urlBasePublic}v.1/event_images/event/`;
  }
  getEndPointPubLogin() {
    return `${this.urlBasePublic}login/`;
  }
  getEndPointPubPresentation() {
    return `${this.urlBasePublic}v.1/presentation/event/`;
  }
  getEndPointPubTickets() {
    return `${this.urlBasePublic}v.1/ticket/`;
  }
  getEndPointPubUser() {
    return `${this.urlBasePublic}v.1/user/`;
  }
  getEndPointPubZone() {
    return `${this.urlBasePublic}v.1/zone/`;
  }
  getEndPointPubZoneConfigEvent() {
    return `${this.urlBasePublic}v.1/zone_config_event/`;
  }
  getEndPointTickets() {
    return `${this.urlBaseDatos}v.1/ticket/`;
  }
  getEndPointZone() {
    return `${this.urlBaseDatos}v.1/zone/`;
  }
  getEndPointZoneConfigEvent() {
    return `${this.urlBaseDatos}v.1/zone_config_event/`;
  }
  getEndPointBussinesUser() {
    return `${this.urlBaseBusiness}v.1/user/`;
  }
}
