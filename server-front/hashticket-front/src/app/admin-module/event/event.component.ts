import { Component } from '@angular/core';
import { Event } from '../../entities/event';
import { EventService } from 'src/app/service/event.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ViewLocationComponent } from '../view-location/view-location.component';
import { MenuService } from 'src/app/service/menu.service';
import { AppConstants } from 'src/app/commons/app.constants';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  displayedColumns: string[] = [
    this.constants.COLUMN_SELECT,
    this.constants.COLUMN_PLACE,
    this.constants.COLUMN_DATE,
    this.constants.COLUMN_MINIMUM_AGE,
    this.constants.COLUMN_RESPONSIBLE,
    this.constants.COLUMN_CITY_CODE,
  ];
  dataSource = new MatTableDataSource<Event>();
  selection = new SelectionModel<Event>(true, []);

  constructor(
    private _eventService: EventService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _menuService: MenuService,
    public constants: AppConstants
  ) {
    this.getAllEvents();
  }
  getAllEvents() {
    this._eventService.getAll().subscribe((resp) => {
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
  checkboxLabel(row?: Event): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }
  openLocation(event: Event) {
    const dialogRef = this.dialog.open(ViewLocationComponent, {
      width: '500px',
      enterAnimationDuration: '10',
      exitAnimationDuration: '10',
      data: {
        cityCode: event.cityCode,
        departmentCode: event.departmentCode,
      },
    });
  }
  insertar() {
    if (this.selection.selected.length > 0) {
      this._snackBar.open(
        this.constants.ALERT_NO_ITEM,
        this.constants.CLOSE,
        {
          duration: 2000,
          panelClass: ['red-snackbar'],
        }
      );
      return;
    }
    this.router.navigateByUrl('/eventInsert');
  }
  update() {
    if (this.selection.selected.length == 1) {
      const URL_SERVICE = `/eventEdit/${this.selection.selected[0].id}`;
      this.router.navigateByUrl(URL_SERVICE);
    } else if (this.selection.selected.length == 0) {
      this._snackBar.open(this.constants.ALERT_SELECT_ITEM, this.constants.CLOSE, {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
    } else if (this.selection.selected.length > 1) {
      this._snackBar.open(this.constants.ALERT_ONLY_ONE_ITEM, this.constants.CLOSE, {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
    }
    return;
  }
  sendPresentation() {
    var msn = '';
    if (this.selection.selected.length == 1) {
      const URL_SERVICE = `/presentation/${this.selection.selected[0].id}`;
      this.router.navigateByUrl(URL_SERVICE);
      return ;
    } else if (this.selection.selected.length == 0) {
      msn = this.constants.ALERT_SELECT_ITEM;
    } else if (this.selection.selected.length > 1) {
      msn = this.constants.ALERT_ONLY_ONE_ITEM;
    }
    this._snackBar.open(msn, this.constants.CLOSE, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['red-snackbar'],
    });
    return;
  }
  sendImages() {
    var msn = '';
    if (this.selection.selected.length == 1) {
      const URL_SERVICE = `/imageEvent/${this.selection.selected[0].id}`;
      this.router.navigateByUrl(URL_SERVICE);
      return;
    } else if (this.selection.selected.length == 0) {
      msn = this.constants.ALERT_SELECT_ITEM;
    } else if (this.selection.selected.length > 1) {
      msn = this.constants.ALERT_ONLY_ONE_ITEM;
    }
    this._snackBar.open(msn, this.constants.CLOSE, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['red-snackbar'],
    });
  }
  configEvent() {
    var msn = '';
    if (this.selection.selected.length == 1) {
      const URL_SERVICE = `/configEvent/${this.selection.selected[0].id}`;
      this.router.navigateByUrl(URL_SERVICE);
      return;
    } else if (this.selection.selected.length == 0) {
      msn = this.constants.ALERT_SELECT_ITEM;
    } else if (this.selection.selected.length > 1) {
      msn = this.constants.ALERT_ONLY_ONE_ITEM;
    }
    this._snackBar.open(msn, this.constants.CLOSE, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['red-snackbar'],
    });
  }
  getMenu() {
    return this._menuService.itemsMenu;
  }
  validatePermissions(): boolean {
    return this._menuService.seeMenu(['ROLE_ADMIN', 'ROLE_MANAGER']);
  }
}
