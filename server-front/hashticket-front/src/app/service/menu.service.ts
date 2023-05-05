import { Injectable, OnInit } from "@angular/core";
import { Menu } from "../entities/menu";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
export class MenuService{
    itemsMenu:Menu[];
    constructor(private _authService: AuthService){
        this.itemsMenu = [];
        this.generateMenu();
    }
    generateMenu(){
        this.itemsMenu.push(this.createItem("Eventos","/event"));
        this.itemsMenu.push(this.createItem("Categorias evento","/eventCategory"));
        this.itemsMenu.push(this.createItem("Configuración de costo","/zoneConfig"));
        this.itemsMenu.push(this.createItem("Categorias","/category"));
        this.itemsMenu.push(this.createItem("Zonas","/zone"));
        this.itemsMenu.push(this.createItem("Artistas","/artist"));
        this.itemsMenu.push(this.createItem("Bandas musicales","/musicBand"));
        this.itemsMenu.push(this.createItem("Tickets","/tickets"));
    }
    createItem(name:string, url:string): Menu{
        const item = new Menu();
        item.name = name;
        item.url = url;
        return item;
    }
    seeMenu(roleMenu: string[]):boolean{
        if (this._authService.isAuthenticated()) {
            const ROLES: string[] = this._authService.getAuthoritiesUser()
              .filter(role => this.checkRoleWithMenu(role, roleMenu));
            return ROLES.length > 0 ? true : false;
          }

        return false;
    }
    checkRoleWithMenu(role: string, roleMenu: string[]) {
        var roleFiltered: string[] = roleMenu.filter(item => role === item);
        return (roleFiltered.length > 0) ? true : false;
    } 
  }