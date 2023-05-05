import { NgModule } from '@angular/core';
import { ArtistComponent } from './artist/artist.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { CategoryComponent } from './category/category.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CommonModule } from '@angular/common';
import { ConfigEventComponent } from './config-event/config-event.component';
import { ConfigEventEditComponent } from './config-event-edit/config-event-edit.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventCategoryComponent } from './event-category/event-category.component';
import { EventCategoryEditComponent } from './event-category-edit/event-category-edit.component';
import { EventComponent } from './event/event.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { FormsModule } from '@angular/forms';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ImagesEventComponent } from './images-event/images-event.component';
import { ImagesEventEditComponent } from './images-event-edit/images-event-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MusicBandComponent } from './music-band/music-band.component';
import { MusicBandEditComponent } from './music-band-edit/music-band-edit.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PresentationComponent } from './presentation/presentation.component';
import { PresentationEditComponent } from './presentation-edit/presentation-edit.component';
import { RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { ViewLocationComponent } from './view-location/view-location.component';
import { ZoneComponent } from './zone/zone.component';
import { ZoneConfigEventComponent } from './zone-config-event/zone-config-event.component';
import { ZoneConfigEventEditComponent } from './zone-config-event-edit/zone-config-event-edit.component';
import { ZoneEditComponent } from './zone-edit/zone-edit.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    HomeAdminComponent,
    EventComponent,
    ViewLocationComponent,
    EventEditComponent,
    CategoryComponent,
    CategoryEditComponent,
    MusicBandComponent,
    MusicBandEditComponent,
    PresentationComponent,
    PresentationEditComponent,
    EventCardComponent,
    ImagesEventComponent,
    ViewImageComponent,
    ImagesEventEditComponent,
    ZoneComponent,
    ZoneEditComponent,
    ConfigEventComponent,
    ConfigEventEditComponent,
    EventCategoryComponent,
    EventCategoryEditComponent,
    TicketsComponent,
    ArtistComponent,
    ArtistEditComponent,
    ZoneConfigEventComponent,
    ZoneConfigEventEditComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    NgApexchartsModule,
    MatSidenavModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  exports: [
    EventCardComponent
  ]
})
export class AdminModuleModule { }
