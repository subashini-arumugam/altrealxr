import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MapOverviewComponent } from './map-overview-component/map-overview-component';
// import { DetailMapComponent } from './detail-map-component/detail-map-component';
import { HomeComponent } from './pages/home.component';
import { LocationComponent } from './pages/location.component';
import { BuildingComponent } from './pages/building.component';
import { AmenityViewerComponent } from './pages/amenity-viewer.component';
import { GalleryImageComponent } from './pages/galleryimage.component';

// export const routes: Routes = [];
// export const routes: Routes = [
//   { path: 'map', component: MapOverviewComponent },
//   { path: 'details', component: DetailMapComponent },
//   // { path: '**', redirectTo: '' }
//   { path: '', redirectTo: 'map', pathMatch: 'full' },
// ];
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: 'building',
    component: BuildingComponent
  },
  {
    path: 'amenity/:amenityId',
    component: AmenityViewerComponent
  },
  {
   path: 'gallery-image',
   component: GalleryImageComponent 
  },
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}