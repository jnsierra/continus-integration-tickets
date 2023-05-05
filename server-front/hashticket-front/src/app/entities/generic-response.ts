export class GenericResponse {
    code:number;
    type:string;
    message:string;
    dataObject:string;
    data:[]

    constructor(){
        this.code = 0;
        this.type = '';
        this.message = '';
        this.dataObject = '';
        this.data = [];
    }
}