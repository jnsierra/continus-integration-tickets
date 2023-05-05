export class SignupResponse {
    id: number;
    email: string;
    code: string;
    password: string;
    name: string;
    changePassword: string;
    attempts: string;
    state: string;

    constructor() {
        this.id = 0;
        this.email = '';
        this.code = '';
        this.password = '';
        this.name = '';
        this.changePassword = '';
        this.attempts = '';
        this.state = '';
    }
}
