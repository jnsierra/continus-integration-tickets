export class Login {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.email = '';
    this.name = '';
    this.password = '';
    this.confirmPassword = '';
  }
}