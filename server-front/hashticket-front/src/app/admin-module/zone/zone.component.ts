import { AppConstants } from 'src/app/commons/app.constants';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Zone } from 'src/app/entities/zone';
import { ZoneService } from 'src/app/service/zone.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent {
  displayedColumns: string[] = [
    this.constants.COLUMN_SELECT,
    this.constants.COLUMN_NAME,
    'categoryId'
  ];
  dataSource = new MatTableDataSource<Zone>();
  selection = new SelectionModel<Zone>(true, []);

  constructor(
    private _zoneService: ZoneService,
    public constants: AppConstants,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.getAllZones();
  }
  getAllZones() {
    this._zoneService.getAll().subscribe((resp) => {
      this.dataSource.data = resp;
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Zone): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }

  insert() {
    if (this.selection.selected.length > 0) {
      this._snackBar.open(
        'Al insertar no debe estar seleccionado ningún item',
        'Cerrar',
        {
          duration: 2000,
          panelClass: ['red-snackbar'],
        }
      );
      return;
    }
    this.router.navigateByUrl(`/zoneEdit`);
  }
  update() {
    if (this.selection.selected.length == 1) {
      const URL_SERVICE = `/zoneEdit/${this.selection.selected[0].id}`;
      this.router.navigateByUrl(URL_SERVICE);
    } else if (this.selection.selected.length == 0) {
      this._snackBar.open('Debes seleccionar un item', 'Cerrar', {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
    } else if (this.selection.selected.length > 1) {
      this._snackBar.open('Acción no permitida para mas de un item', 'Cerrar', {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
    }
  }
}
