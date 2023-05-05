export class Event {
  id: number;
  name: string;
  place: string;
  date: string;
  time: string;
  minimumAge: number;
  responsible: string;
  nit: number;
  address: string;
  cityCode: number;
  departmentCode: number;
  eventStatus: string;
  categoryEventId: number;

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
    this.cityCode = 0;
    this.departmentCode = 0;
    this.eventStatus = '';
    this.categoryEventId = 0;
  }
}
