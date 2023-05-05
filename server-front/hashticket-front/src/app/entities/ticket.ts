export class Ticket {
    eventId: number;
    zoneId: number;
    categoryId: number;
    presentationId: number;
    numberTicket: number;
    numberOfTickets:number;
    state?: string;
    numberTickets: [];
    constructor(){
        this.eventId = 0;
        this.zoneId = 0;
        this.categoryId = 0;
        this.presentationId = 0;
        this.numberTicket = 0;
        this.numberOfTickets = 0;
        this.state = '';
        this.numberTickets = [];
    }
}
