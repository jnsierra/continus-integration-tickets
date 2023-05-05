import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from 'src/app/entities/login'; 
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  loginEntity: Login;
  passwordsDoesntMatch:boolean;  
  
  constructor(private _authService: AuthService
    , private router: Router
    , private _snackBar: MatSnackBar){
    this.loginEntity = new Login();
    this.passwordsDoesntMatch = false;
  }
  changePassword(f: NgForm){
    if(f.invalid){
      return ; 
    }
    if(this.loginEntity.password !== this.loginEntity.confirmPassword){
      this.passwordsDoesntMatch = true;
    }else{
      this.passwordsDoesntMatch = false;
    }
    this._authService.changePassword(this.loginEntity.password).subscribe(data => {
      if(data){
        this._snackBar.open('Cambio de contraseña realizada con exito. Ingresa con tu nueva contraseña', 'Cerrar', {
          duration: 20000,
          panelClass: ['green-snackbar'],
          verticalPosition: 'top'
        }).afterDismissed().subscribe(info => {
          this.sendLogin();
        });
      }else {
        this._snackBar.open('Error al cambiar la contraseña', 'Cerrar', {
          duration: 20000,
          panelClass: ['red-snackbar'],
          verticalPosition: 'top'
        })
      }
    });
  }
  sendLogin() {
    this.router.navigateByUrl('/signin');
  }
}