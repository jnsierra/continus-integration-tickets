import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Presentation } from 'src/app/entities/presentation';
import { PresentationService } from 'src/app/service/presentation.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent {
  displayedColumns: string[] = ['select', 'id', 'name'];
  dataSource = new MatTableDataSource<Presentation>();
  selection = new SelectionModel<Presentation>(true, []);
  idEvent: number;

  constructor(
    private _presentationService: PresentationService
    , public dialog: MatDialog
    , private router: Router
    , private activatedRoute: ActivatedRoute
    , private _menuService: MenuService
  ) {
    this.idEvent = 0;
    this.activatedRoute.params.subscribe(params => {
      this.idEvent = params['id'] as number;
      this.getPresentationByEventId(this.idEvent);
    });
  }
  getAllPresentations() {
    this._presentationService.getAll().subscribe((resp) => {
      this.dataSource.data = resp;
    });
  }
  getPresentationByEventId(idEvent:number){
    this._presentationService.getByIdEvent(idEvent).subscribe(resp =>{
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
  checkboxLabel(row?: Presentation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }

  insert() {
    if (this.selection.selected.length > 0) {
      alert('Al insertar no debe estar seleccionado ningún item');
      return;
    }
    this.router.navigateByUrl(`/presentationInsert/${this.idEvent}`);
  }
  update() {
    if (this.selection.selected.length == 1) {
      const URL_SERVICE = `/presentationUpdate/${this.selection.selected[0].eventId}/${this.selection.selected[0].id}`;
      this.router.navigateByUrl(URL_SERVICE);
    } else if (this.selection.selected.length == 0) {
      alert('Debes seleccionar un item');
    } else if (this.selection.selected.length > 1) {
      alert('Acción no permitida para mas de un item');
    }
  }
  getMenu(){
    return this._menuService.itemsMenu;
  }
  validatePermissions():boolean{
    return this._menuService.seeMenu(['ROLE_ADMIN','ROLE_MANAGER']);
  }
}
