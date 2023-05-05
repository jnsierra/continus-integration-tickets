import { AppConstants } from 'src/app/commons/app.constants';
import { Artist } from 'src/app/entities/artist';
import { ArtistService } from 'src/app/service/artist.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MusicBandService } from 'src/app/service/music-band.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {
  displayedColumns: string[] = [
    this.constants.COLUMN_SELECT,
    this.constants.COLUMN_NAME, 
    this.constants.COLUMN_DESCRIPTION,
    this.constants.COLUMN_MUSIC_BAND_NAME
  ];
  dataSource = new MatTableDataSource<Artist>();
  selection = new SelectionModel<Artist>(true, []);

  constructor(
    private _artistService: ArtistService,
    private _musicBandService: MusicBandService,
    public constants: AppConstants,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.getAllArtists();
  }
  getAllArtists() {
    this._artistService.getAll().subscribe((resp) => {
      resp.forEach(element => {
        this._musicBandService.getById(element.musicBandId.toString()).subscribe((response) => {
          element.musicBandName = response.name
        });
      });
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
  checkboxLabel(row?: Artist): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }

  insert() {
    if (this.selection.selected.length > 0) {
      this._snackBar.open(
        this.constants.ALERT_NO_ITEM,
        'Cerrar',
        {
          duration: 2000,
          panelClass: ['red-snackbar'],
        }
      );
      return;
    }
    this.router.navigateByUrl('/artistEdit');
  }

  update() {
    if (this.selection.selected.length == 1) {
      const URL_SERVICE = `/artistEdit/${this.selection.selected[0].id}`;
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

}
