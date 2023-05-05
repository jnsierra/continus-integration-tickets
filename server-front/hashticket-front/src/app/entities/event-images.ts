export class EventImages {
  id: number;
  eventId: number;
  description: string;
  location: string;
  typeImages: string;
  base64: string;

  constructor() {
    this.id = 0;
    this.description = '';
    this.location = '';
    this.typeImages = '';
    this.eventId = 0;
    this.base64 = '';
  }
}
