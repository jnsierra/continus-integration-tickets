import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Zone } from 'src/app/entities/zone';
import { ZoneService } from 'src/app/service/zone.service';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss']
})
export class ZoneEditComponent implements OnInit {
  zone: Zone;
  id: string;
  insert: boolean;
  butonEnabled: boolean;
  msn: string;
  category: Category[];

  constructor(
    private _zoneService: ZoneService,
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.zone = new Zone();
    this.category = [];
    this.id = '';
    this.msn = '';
    this.insert = true;
    this.butonEnabled = false;
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'] as string;
      if (this.id === undefined) {
        this.insert = true;
        this.msn = 'Zona creada exitosamente';
      } else {
        this.insert = false;
        this.msn = 'Zona actualizada exitosamente';
        this._zoneService.getById(this.id).subscribe((resp) => {
          this.zone = resp;
        });
      }
    });
  }

  ngOnInit(): void {
    this.findCategories();
  }

  findCategories() {
    this._categoryService.getAll().subscribe((resp) => {
      this.category = resp;
    });
  }
  executeAction(f: NgForm) {
    if (f.invalid) {
      this._snackBar.open('Formulario Invalido', 'Cerrar', {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
      return;
    }
    this._zoneService.insert(this.zone).subscribe((resp) => {
      if (resp.id === undefined || resp.id === null) {
        this._snackBar.open('Error al crear la zona', 'Cerrar', {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      } else {
        this.butonEnabled = true;
        this._snackBar
          .open('Zona creada exitosamente', 'OK', {
            duration: 1500,
            panelClass: ['green-snackbar'],
          })
          .afterDismissed()
          .subscribe((resp) => {
            this.router.navigateByUrl('zone');
          });
      }
    });
  }
}
