import { Component, ViewChild, ElementRef, AfterViewInit,OnInit, Output, EventEmitter, Input, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GoogleMapsService } from '../services/google-maps.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #mapContainer class="map-container"></div>
  `,
  styles: [`
    .map-container {
      width: 100%;
      height: 100%;
       z-index: 1;
    }
  `]
})
export class GoogleMapComponent implements OnInit,AfterViewInit {

  @Input() initialCenter: { lat: number; lng: number } = { lat: 12.81396, lng: 80.16782 };
  @Input() initialZoom: number = 13;
  @Output() mapReady = new EventEmitter<any>();
   @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  map: any;
  private isBrowser: boolean;
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit(): void {}
  // constructor(
  //   private googleMapsService: GoogleMapsService,
  //   @Inject(PLATFORM_ID) private platformId: Object
  // ) {
  //   this.isBrowser = isPlatformBrowser(this.platformId);
  // }
  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;

    try {
      await this.initializeMap();
      this.mapReady.emit(this.map);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private async initializeMap(): Promise<void> {
    if (!this.mapContainer) return;

    // Dynamically import Leaflet only in browser environment
    const L = await import('leaflet');

    this.map = L.map(this.mapContainer.nativeElement).setView(
      [this.initialCenter.lat, this.initialCenter.lng],
      this.initialZoom
    );

    // Add tile layer
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19
    }).addTo(this.map);
  }
  // async ngAfterViewInit(): Promise<void> {
  //   if (!this.isBrowser) return;

  //   try {
  //     this.map = await this.googleMapsService.loadGoogleMaps(
  //       this.mapContainer.nativeElement,
  //       this.initialCenter.lat,
  //       this.initialCenter.lng,
  //       this.initialZoom
  //     );

  //     // Emit the map object
  //     this.mapReady.emit(this.map);
  //   } catch (error) {
  //     console.error('Error initializing map:', error);
  //   }
  // }
}

