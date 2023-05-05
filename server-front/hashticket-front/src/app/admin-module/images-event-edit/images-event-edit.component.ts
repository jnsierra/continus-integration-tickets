import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EventImages } from 'src/app/entities/event-images';
import { UtilesBase64Service } from 'src/app/service/utiles-base64.service';
import { EventImageService } from '../../service/event-image.service';
import { ViewImageComponent } from '../view-image/view-image.component';


@Component({
  selector: 'app-images-event-edit',
  templateUrl: './images-event-edit.component.html',
  styleUrls: ['./images-event-edit.component.scss']
})
export class ImagesEventEditComponent implements OnInit {

  eventImages: EventImages;
  createAccion: boolean;
  enableButton: boolean;
  fileName: string;

  constructor(
    private activatedRoute: ActivatedRoute
    , private _snackBar: MatSnackBar
    , private _utilesBase64Service: UtilesBase64Service
    , private _eventImageService: EventImageService
    , private router: Router
    , public dialog: MatDialog
  ) {
    this.eventImages = new EventImages();
    this.createAccion = true;
    this.enableButton = true;
    this.fileName = '';
    this.eventImages.typeImages = '-1';
    this.activatedRoute.params.subscribe((params) => {
      let idEvent = params['idEvent'] as number;
      this.eventImages.id = params['id'] as number;
      this.eventImages.eventId = idEvent;
      this.createAccion = true;
    });
  }
  ngOnInit(): void {
    if (!(this.eventImages.id === undefined)) {
      this._eventImageService.getEventImagesById(this.eventImages.id).subscribe(resp => {
        this.eventImages = resp;
        this.createAccion = false;
      });
    }
  }
  ejecutarAccion(f: NgForm) {
    if (f.invalid) {
      return;
    }
    if (this.eventImages.typeImages === '-1') {
      this._snackBar.open('Seleccione un tipo de imagen', 'Cerrar', {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
      return;
    }
    if (this.fileName === '') {
      this._snackBar.open('La imagen es obligatoria', 'Cerrar', {
        duration: 2000,
        panelClass: ['red-snackbar'],
      });
      return;
    }
    this._eventImageService.insertByEvent(this.eventImages).subscribe(resp => {
      if (!(resp.id === undefined) && !(resp.id === null) && !(resp.id === 0)) {
        this.enableButton = false;
        this._snackBar.open('Operacion exitosa', 'Cerrar', {
          duration: 2000,
          panelClass: ['green-snackbar'],
        });
        this.router.navigateByUrl(`imageEvent/${this.eventImages.eventId}`);
      }
    });
  }
  cancelar() {
    this.router.navigateByUrl('imageEventπ');
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      var base = await this._utilesBase64Service.baseTo64File(file);
      this.eventImages.base64 = String(base);
      this.fileName = file.name;
    }
  }
  showImages(id: number) {
    const dialogRef = this.dialog.open(ViewImageComponent, {
      width: '400px',
      height: '400px',
      enterAnimationDuration: '10',
      exitAnimationDuration: '10',
      data: {
        idEventImage: id
      },
    });
  }
}