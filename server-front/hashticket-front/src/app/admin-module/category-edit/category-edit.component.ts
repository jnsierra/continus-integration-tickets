import { AppConstants } from 'src/app/commons/app.constants';
import { Component } from '@angular/core';
import { Category } from 'src/app/entities/category';
import { CategoryService } from 'src/app/service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent {
  category: Category;
  id: string;
  insert: boolean;
  butonEnabled: boolean;
  msn: string;

  constructor(
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constants: AppConstants,
  ) {
    this.category = new Category();
    this.id = '';
    this.msn = '';
    this.insert = true;
    this.butonEnabled = false;
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'] as string;
      if (this.id === undefined) {
        this.insert = true;
        this.msn = 'Categor\u00eda creada exitosamente';
      } else {
        this.insert = false;
        this.msn = 'Categor\u00eda actualizada exitosamente';
        this._categoryService.getById(this.id).subscribe((resp) => {
          this.category = resp;
        });
      }
    });
  }

  executeAction(f: NgForm) {
    if (f.invalid) {
      this._snackBar.open(this.constants.ALERT_INVALID_FORM, this.constants.CLOSE, {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
      return;
    }
    this._categoryService.insert(this.category).subscribe((resp) => {
      if (resp.id === undefined || resp.id === null) {
        this._snackBar.open('Error al crear categor\u00eda', this.constants.CLOSE, {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      } else {
        this.butonEnabled = true;
        this._snackBar
          .open(this.msn, 'OK', {
            duration: 1500,
            panelClass: ['green-snackbar'],
          })
          .afterDismissed()
          .subscribe((resp) => {
            this.router.navigateByUrl('category');
          });
      }
    });
  }
}
