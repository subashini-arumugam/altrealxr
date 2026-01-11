import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, Inject, PLATFORM_ID } from '@angular/core';
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
export class GoogleMapComponent implements AfterViewInit {
 @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Input() initialCenter: { lat: number; lng: number } = { lat: 12.9716, lng: 80.2428 };
  @Input() initialZoom: number = 13;
  @Output() mapReady = new EventEmitter<any>();

  map: any;
  private isBrowser: boolean;

  constructor(
    private googleMapsService: GoogleMapsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;

    try {
      this.map = await this.googleMapsService.loadGoogleMaps(
        this.mapContainer.nativeElement,
        this.initialCenter.lat,
        this.initialCenter.lng,
        this.initialZoom
      );

      // Emit the map object
      this.mapReady.emit(this.map);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }
}

