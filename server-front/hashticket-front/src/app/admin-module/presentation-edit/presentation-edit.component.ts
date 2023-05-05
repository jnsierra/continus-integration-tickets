import { Component, OnInit } from '@angular/core';
import { Presentation } from 'src/app/entities/presentation';
import { PresentationService } from 'src/app/service/presentation.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-presentation-edit',
  templateUrl: './presentation-edit.component.html',
  styleUrls: ['./presentation-edit.component.scss']
})
export class PresentationEditComponent implements OnInit {
  presentation: Presentation;
  botonInactive: boolean;

  constructor(private _presentationService: PresentationService
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private _snackBar: MatSnackBar) {
    this.presentation = new Presentation();
    this.botonInactive = false;
    this.activatedRoute.params.subscribe(params => {
      this.presentation.eventId = params['idEvent'] as number;
      this.presentation.id = params['id'] as number;
    });
  }
  ngOnInit(): void {
    if (!(this.presentation.id === undefined)) {
      this._presentationService.getById(this.presentation.id).subscribe(resp => {
        this.presentation = resp;
      });
    }
  }
  executeAction(f: NgForm) {
    if (f.invalid) {
      return
    }
    this._presentationService.insert(this.presentation).subscribe(resp => {
      this.botonInactive = true;
      this._snackBar.open('Operación exitosa', 'cerrar').onAction().subscribe(resp => {
        this.sendListPresentation();
      });
    });
  }
  cancelar() {
    this.sendListPresentation();
  }
  sendListPresentation() {
    this.router.navigateByUrl(`presentation/${this.presentation.eventId}`);
  }
}