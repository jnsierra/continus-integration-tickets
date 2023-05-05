export class ConfigEvent {
    id: number;
    eventId: number;
    doorOpening: string;
    numberOfTickets: number;
    numberOfTicketsSold: number;
    eventDate: string;
    presentationId: number;

    constructor() {
        this.id = 0;
        this.eventId = 0;
        this.doorOpening = '00:00';
        this.numberOfTickets = 0;
        this.numberOfTicketsSold = 0;
        this.eventDate = '';
        this.presentationId = 0;
    }
}