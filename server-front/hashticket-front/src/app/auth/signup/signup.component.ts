import { AppConstants } from 'src/app/commons/app.constants';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { Login } from 'src/app/entities/login';
import { Meta, Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  loginEntity: Login;
  msn: string;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _authService: AuthService,
    public constants: AppConstants,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private _snackBar: MatSnackBar
  ) {
    this.loginEntity = new Login();
    this.msn = '';
    this.title.setTitle('CompraBoletas - Crear cuenta');
    this.meta.updateTag({ name: 'description', content: "Página para creación de cuenta" })
  }
  sendForm(f: NgForm) {
    if (f.invalid) {
      this.msn = 'Información invalida';
      this.openErrorSnackbar();
    } else {
      this.createUser();
    }
  }
  createUser() {
    this._authService.signUp(this.loginEntity).subscribe({
      next: (resp) => {
        if (resp.status == 200 && resp.body === true) {
          this._snackBar.open('Se ha enviado un mail con tu contraseña temporal.', this.constants.CLOSE, {
            duration: 20000,
            panelClass: ['green-snackbar'],
            verticalPosition: 'top'
          }).afterDismissed().subscribe(info => {
            this.sendLogin();
          });
        }
      },
      error: (e) => {
        this.msn = 'Correo ya registrado';
        this.openErrorSnackbar();
      }
    });
  }
  sendLogin() {
    this.router.navigateByUrl('/signin');
  }
  openErrorSnackbar() {
    this._snackBar.open(this.msn, 'Cerrar', {
      duration: 2000,
      panelClass: ['red-snackbar'],
      verticalPosition: 'top'
    });
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingrese correo';
    }
    return this.email.hasError('email') ? 'Correo no válido' : '';
  }
}
