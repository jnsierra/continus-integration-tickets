import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Login } from 'src/app/entities/login';
import { Meta, Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginEntity: Login;

  constructor(private _authService: AuthService, private router: Router, private title: Title, private meta: Meta) {
    this.loginEntity = new Login();
    title.setTitle('Login');
    meta.updateTag({ name: 'description', content: "Página para inicio de sesión" })
  }
  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this.sendHome();
    }
  }
  sendLogin() {
    this._authService.login(this.loginEntity).subscribe(resp => {
      if (resp.body!.loginAction == 'SUCCESS') {
        this.sendHome();
      }else if(resp.body!.loginAction == 'SUCCESS_CHANGE_PASSWORD'){
        this.router.navigateByUrl('/changePassword');
        localStorage.setItem('token', resp.body!.token);
      }
    });
  }
  generarLogin(f: NgForm) {
    this.sendLogin();
  }
  sendHome() {
    this.router.navigateByUrl('/homeAdmin');
  }
}