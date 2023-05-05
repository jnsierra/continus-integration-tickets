export class LoginResponse {
  token: string;
  time: number;
  mensaje: string;
  loginAction: string;

  constructor() {
    this.token = '';
    this.time = 0;
    this.mensaje = '';
    this.loginAction = '';
  }
}