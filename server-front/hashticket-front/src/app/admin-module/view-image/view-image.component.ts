import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventImages } from 'src/app/entities/event-images';
import { EventImageService } from 'src/app/service/event-image.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent {

  idImage: number;
  eventImages: EventImages;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
    , private _eventImageService: EventImageService) {
    this.idImage = data.idEventImage;
    this.eventImages = new EventImages();
    this.getImage();
  }
  getImage() {
    this._eventImageService.getEventImagesById(this.idImage).subscribe(data => {
      this.eventImages = data;
    });
  }
}