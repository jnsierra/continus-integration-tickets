export class TicketView {
    eventId: number;
    zoneId: number;
    zoneName:string;
    categoryId: number;
    categoryName:string;
    presentationId: number;
    presentationName:string;
    numberTicket: number;
    state: string;
    constructor(){
        this.eventId = 0;
        this.zoneId = 0;
        this.zoneName = '';
        this.categoryId = 0;
        this.categoryName = '';
        this.presentationId = 0;
        this.numberTicket = 0;
        this.state = '';
        this.presentationName = '';
    }
}
