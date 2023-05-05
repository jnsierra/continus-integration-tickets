import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private _authService: AuthService){}

  isAutenticated():boolean {
    return this._authService.isAuthenticated();
  }
  getRoleUser(roleMenu: string[]): boolean {
    if (this._authService.isAuthenticated()) {
      const ROLES: string[] = this._authService.getAuthoritiesUser()
        .filter(role => this.checkRoleWithMenu(role, roleMenu));
      return ROLES.length > 0 ? true : false;
    }
    return true;
  }
  checkRoleWithMenu(role: string, roleMenu: string[]) {
    var roleFiltered: string[] = roleMenu.filter(item => role === item);
    return (roleFiltered.length > 0) ? true : false;
  }

}
