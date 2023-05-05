export class GenericQuery <T>{
    results:T[];
    page:number;
    records:number;
    totalRecords:number;

    constructor(){
        this.page = 0;
        this.records = 0;
        this.totalRecords = 0;
    }
}