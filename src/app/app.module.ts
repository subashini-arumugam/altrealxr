import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
// import { MapOverviewComponent } from './map-overview-component/map-overview-component';
// import { DetailMapComponent } from './detail-map-component/detail-map-component';
import { PoiService } from './poi.service';

@NgModule({
  declarations: [
    // AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // MapOverviewComponent,
    // DetailMapComponent
  ],
  providers: [PoiService],
  bootstrap: []
})
export class AppModule {}
