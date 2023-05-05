import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicBand } from 'src/app/entities/music-band';
import { MusicBandService } from 'src/app/service/music-band.service';
import { NgForm } from '@angular/forms';
import { Presentation } from 'src/app/entities/presentation';
import { PresentationService } from 'src/app/service/presentation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-music-band-edit',
  templateUrl: './music-band-edit.component.html',
  styleUrls: ['./music-band-edit.component.scss']
})
export class MusicBandEditComponent {
  msn: string;
  musicBand: MusicBand;
  presentation: Presentation[];
  id: string;
  insert: boolean;
  butonEnabled: boolean;

  constructor(
    private _musicBandService: MusicBandService,
    private _presentationService: PresentationService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.msn = '';
    this.musicBand = new MusicBand();
    this.presentation = [];
    this.id = '';
    this.insert = true;
    this.butonEnabled = false;
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'] as string;
      if (this.id === undefined) {
        this.insert = true;
        this.msn = 'Banda creada exitosamente';
      } else {
        this.insert = false;
        this.msn = 'Banda actualizada exitosamente';
        this._musicBandService.getById(this.id).subscribe((resp) => {
          this.musicBand = resp;
        });
      }
    });
  }

  ngOnInit(): void {
    this.findPresentations();
  }
  findPresentations() {
    this._presentationService.getAll().subscribe(resp => {
      this.presentation = resp;
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
    this._musicBandService.insert(this.musicBand).subscribe(resp => {
      if (resp.id === undefined || resp.id === null) {
        this._snackBar.open('Error al crear evento', 'Cerrar', {
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
            this.router.navigateByUrl('musicBand');
          });
      }
    });
  }
}
