import { ConfigEvent } from "./config-event";
import { Presentation } from "./presentation";

export class FullEvent {
    id: number;
    name: string;
    place: string;
    date: string;
    time: string;
    minimumAge: number;
    responsible: string;
    nit: number;
    address: string;
    cityName: number;
    departmentName: number;
    countyName: string;
    eventStatus: string;
    categoryEventName: string;
    presentation: Presentation[];
    configEvents: ConfigEvent[];

    constructor() {
      this.id = 0;
      this.name = '';
      this.place = '';
      this.date = '';
      this.time = '';
      this.minimumAge = 0;
      this.responsible = '';
      this.nit = 0;
      this.address = '';
      this.cityName = 0;
      this.countyName = '';
      this.departmentName = 0;
      this.eventStatus = '';
      this.categoryEventName = '';
      this.presentation = [];
      this.configEvents = [];
    }
}


