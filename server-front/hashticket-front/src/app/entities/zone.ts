export class Zone {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    categoryName: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.categoryId = 0;
        this.categoryName = '';
    }
}
