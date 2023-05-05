import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/commons/app.constants';
import { Artist } from 'src/app/entities/artist';
import { ArtistService } from 'src/app/service/artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicBand } from 'src/app/entities/music-band';
import { MusicBandService } from 'src/app/service/music-band.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.scss']
})
export class ArtistEditComponent implements OnInit {
  artist: Artist;
  id: string;
  insert: boolean;
  butonEnabled: boolean;
  msn: string;
  musicBand: MusicBand[];

  constructor(
    private _artistService: ArtistService,
    private _musicBandService: MusicBandService,
    private _snackBar: MatSnackBar,
    public constants: AppConstants,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.artist = new Artist();
    this.musicBand = [];
    this.id = '';
    this.msn = '';
    this.insert = true;
    this.butonEnabled = false;
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'] as string;
      if (this.id === undefined) {
        this.insert = true;
        this.msn = 'Artista creado exitosamente';
      } else {
        this.insert = false;
        this.msn = 'Artista actualizado exitosamente';
        this._artistService.getById(this.id).subscribe((resp) => {
          this.artist = resp;
        });
      }
    });
  }

  ngOnInit(): void {
    this.findMusicBand();
  }

  findMusicBand() {
    this._musicBandService.getAll().subscribe((resp) => {
      this.musicBand = resp;
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
    this._artistService.insert(this.artist).subscribe((resp) => {
      if (resp.id === undefined || resp.id === null) {
        this._snackBar.open('Error al crear artista', this.constants.CLOSE, {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      } else {
        this.butonEnabled = true;
        this._snackBar
          .open(this.msn, 'OK', {
            duration: 1000,
            panelClass: ['green-snackbar'],
          })
          .afterDismissed()
          .subscribe((resp) => {
            this.router.navigateByUrl('artist');
          });
      }
    });
  }
}
