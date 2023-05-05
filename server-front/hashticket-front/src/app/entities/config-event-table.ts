export class ConfigEventTable {
    id: number;
    eventId: number;
    doorOpening: string;
    numberOfTickets: number;
    numberOfTicketsSold: number;
    eventDate: string;
    presentationId: number;
    presentationName: string;

    constructor() {
        this.id = 0;
        this.eventId = 0;
        this.doorOpening = '00:00 AM';
        this.numberOfTickets = 0;
        this.numberOfTicketsSold = 0;
        this.eventDate = '01/01/1999';
        this.presentationId = 0;
        this.presentationName = '';
    }
}