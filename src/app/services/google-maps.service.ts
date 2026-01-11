import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private map: any;
  private isBrowser: boolean;
  private polyline: any = null;
  private popup: any = null;
  private markers: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /** Initialize map (SSR-safe) */
  async loadGoogleMaps(container: string | HTMLElement, lat: number, lng: number, zoom: number): Promise<any> {
    if (!this.isBrowser) return null;

    // Lazy import Leaflet only on browser
    const L = await import('leaflet');
    const mapContainer = typeof container === 'string' ? document.getElementById(container) : container;

  if (!mapContainer) {
    throw new Error('Map container element not found');
  }

    this.map = L.map(mapContainer).setView([lat, lng], zoom);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    // attribution: 'Tiles &copy; Esri &mdash; Source: Esri, NASA, USGS',
    maxZoom: 19
  }).addTo(this.map);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; OpenStreetMap contributors'
    // }).addTo(this.map);

    return this.map;
  }

  async createMainLocationMarker(lat: number, lng: number, title: string) {
    const L = await import('leaflet');

    const marker = L.marker([lat, lng], {
      title,
      icon: L.divIcon({
        className: 'main-icon',
        html: `
          <div style="
            width: 26px;
            height: 26px;
            background:#ff005e;
            border:3px solid white;
            border-radius:50%;
            box-shadow:0 0 8px rgba(0,0,0,.5);
          "></div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      })
    }).addTo(this.map);

    this.markers.push(marker);
    return marker;
  }

  /** Add marker */
  async createMarker(
    position: { lat: number; lng: number },
    title: string,
    color: string
  ) {
    const L = await import('leaflet');

    const marker = L.marker([position.lat, position.lng], {
      title,
      icon: L.divIcon({
        className: 'category-marker',
        html: `
          <div style="
            width: 18px;
            height: 18px;
            background:${color};
            border-radius:50%;
            border:2px solid white;
          "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      })
    }).addTo(this.map);

    this.markers.push(marker);
    return marker;
  }
  /** POPUP */
  async openPopup(lat: number, lng: number, content: string) {
    const L = await import('leaflet');

    if (this.popup) this.map.closePopup(this.popup);

    this.popup = L.popup({ closeOnClick: true })
      .setLatLng([lat, lng])
      .setContent(content)
      .openOn(this.map);
  }

async drawRoute(start: { lat: number; lng: number }, end: { lat: number; lng: number }) {
  debugger
  if (!this.map) return;
  const L = await import('leaflet');
  await import('leaflet-routing-machine');
  if (this.polyline) {
    (this.map as any).removeControl(this.polyline);
  }

  this.polyline = (L as any).Routing.control({
    waypoints: [
      L.latLng(start.lat, start.lng),
      L.latLng(end.lat, end.lng)
    ],
    lineOptions: {
      styles: [{ color: '#ce2669e3', weight: 4 }]
    },
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    show: false
  }).addTo(this.map);
}



   clearMarkers() {
    if (!this.markers) return;
    this.markers.forEach(m => m.remove());
    this.markers = [];
  }
  /** Dummy Directions placeholders */
  getDirectionsService(): null {
    console.warn('Leaflet does not have DirectionsService. Use a plugin like Leaflet Routing Machine.');
    return null;
  }

  getDirectionsRenderer(): null {
    console.warn('Leaflet does not have DirectionsRenderer. Use a plugin like Leaflet Routing Machine.');
    return null;
  }
  async createTitleBubbleMarker(lat: number, lng: number, label: string) {
  const L = await import('leaflet');

  const marker = L.marker([lat, lng], {
    icon: L.divIcon({
      className: 'title-bubble-marker',
      html: `
          <div class="bubble-circle">
            ${label}
          </div>
      `,
      iconSize: [120, 120],
      iconAnchor: [60, 60] 
    })
  }).addTo(this.map);

  this.markers.push(marker);
  return marker;
}

}

