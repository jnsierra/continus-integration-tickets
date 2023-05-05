import { Component } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
} from 'ng-apexcharts/public_api';
import { Event } from 'src/app/entities/event';
import { AuthService } from 'src/app/service/auth.service';
import { EventService } from 'src/app/service/event.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent {
  eventos: Event[];
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  labels: any;
  

  constructor(private _authService: AuthService
    , private _eventService: EventService
    , private _menuService: MenuService) {
    this.eventos = [];
    this.series = [44, 55, 13, 43, 22];
    this.chart = {
      type: 'donut',
    };
    this.labels = [
      'Andres Cepeda',
      'Natalia Jiménez',
      'Gloria Trevi',
      'Reik',
      'Gusi',
    ];
    this.title = {
      text: 'Ventas en el día por evento',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: '#263238',
      },
    };
  }
  getEvents(){
    this._eventService.getActiveEvents().subscribe((resp) => {
      this.eventos = resp;
    });
  }
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
  getMenu(){
    return this._menuService.itemsMenu;
  }
  validatePermissions():boolean{
    return this._menuService.seeMenu(['ROLE_ADMIN','ROLE_MANAGER']);
  }
} 