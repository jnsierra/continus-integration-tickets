import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hashticket-front';
  year = new Date().getFullYear();
  constructor(private _authService: AuthService
    , private router: Router) { }

  logout() {
    this._authService.logout();
    this.router.navigateByUrl('/');
  }
  isAutenticated():boolean {
    return this._authService.isAuthenticated();
  }
}