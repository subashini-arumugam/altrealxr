import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private map: any;
  private markers: any[] = [];
  private polyline: any = null;
  private popup: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /** Initialize map with Esri Satellite View */
  async loadGoogleMaps(container: HTMLElement, lat: number, lng: number, zoom: number) {
    if (!this.isBrowser) return;
    const L = await import('leaflet');

    this.map = L.map(container, {
      zoomControl: false
    }).setView([lat, lng], zoom);

    // Esri World Imagery tile layer for green nature surroundings
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, USDA, USGS'
    }).addTo(this.map);

    return this.map;
  }

  /** Main location marker with pulsing gold hotspot + image + hover card */
  async createMainLocationMarker(
    lat: number,
    lng: number,
    title: string,
    iconUrl?: string
  ) {
    const L = await import('leaflet');

    const icon = iconUrl
      ? L.divIcon({
          className: 'main-location-pin-hotspot',
          html: `
          <div class="pulsing-main-marker" style="
            width:46px;
            height:46px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <!-- Pulsing Rings -->
            <div class="main-pulse wave1"></div>
            <div class="main-pulse wave2"></div>
            
            <div style="
              width:32px;
              height:32px;
              border-radius:50%;
              overflow:hidden;
              background:#181817;
              border: 2px solid #d4af37;
              z-index: 2;
              box-shadow: 0 4px 10px rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <img src="${iconUrl}"
                style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
            </div>
          </div>
          `,
          iconSize: [46, 46],
          iconAnchor: [23, 23]
        })
      : L.divIcon({
          className: '',
          html: `<div style="
            width:24px;height:24px;
            background:#d4af37;border-radius:50%;
            border:2px solid white;
          "></div>`,
          iconSize: [24,24],
          iconAnchor: [12,12]
        });

    const marker = L.marker([lat, lng], { title, icon }).addTo(this.map);
    
    // Bind main project tooltip card on hover
    const tooltipContent = `
      <div class="map-tooltip-card main-project">
        <h4 class="tooltip-title" style="color: #d4af37; margin: 0 0 0.2rem 0; font-size: 0.9rem;">${title}</h4>
        <span class="tooltip-category" style="color: #fff; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">Main Project Site</span>
      </div>
    `;

    marker.bindTooltip(tooltipContent, {
      permanent: false,
      direction: 'top',
      offset: [0, -20],
      className: 'upgraded-map-tooltip-card'
    });

    this.markers.push(marker);
    return marker;
  }

  /** POI markers styled as category-pulsing hotspots with hover cards */
  async createMarker(
    position: {lat:number,lng:number},
    title: string,
    color: string,
    icon: string,
    category?: string,
    address?: string
  ) {
    const L = await import('leaflet');
    const isImage = icon.includes('/') || icon.includes('.');

    const marker = L.marker([position.lat, position.lng], {
      title,
      icon: L.divIcon({
        className: 'custom-poi-marker-hotspot',
        html: `
        <div class="pulsing-poi-marker" style="
          width:36px;
          height:36px;
          position:relative;
          display:flex;
          align-items:center;
          justify-content:center;
        ">
          <!-- Pulse wave -->
          <div class="poi-pulse" style="border-color: ${color};"></div>
          
          <div style="
            position:relative;
            z-index:2;
            width:22px;
            height:22px;
            background:#181817;
            border:2px solid ${color};
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            overflow:hidden;
            box-shadow:0 4px 10px rgba(0,0,0,0.6);
          ">
            ${
              isImage
              ? `<img src="${icon}" style="width:100%;height:100%;object-fit:cover;" />`
              : `<span style="font-size:12px;color:#fff;display:flex;align-items:center;justify-content:center;">${icon}</span>`
            }
          </div>
        </div>
        `,
        iconSize: [36,36],
        iconAnchor: [18,18]
      })
    }).addTo(this.map);

    // Bind preview card tooltip on hover
    const tooltipContent = `
      <div class="map-tooltip-card">
        <h4 class="tooltip-title">${title}</h4>
        ${category ? `<span class="tooltip-category" style="color: ${color};">${category}</span>` : ''}
        ${address ? `<p class="tooltip-address">${address}</p>` : ''}
        <div class="tooltip-action" style="color: ${color};">Click to view route ➔</div>
      </div>
    `;

    marker.bindTooltip(tooltipContent, {
      permanent: false,
      direction: 'top',
      offset: [0, -15],
      className: 'upgraded-map-tooltip-card'
    });

    this.markers.push(marker);
    return marker;
  }

  /** Draw route and return distance + travel time estimation */
  async drawRoute(start: { lat: number; lng: number }, end: { lat: number; lng: number }): Promise<{ distance: number; time: number }> {
    if (!this.map) throw new Error('Map not initialized');
    const L = await import('leaflet');
    await import('leaflet-routing-machine');

    if (this.polyline) {
      this.map.removeControl(this.polyline);
    }

    return new Promise<{ distance: number; time: number }>((resolve, reject) => {
      const routingControl = (L as any).Routing.control({
        waypoints: [
          L.latLng(start.lat, start.lng),
          L.latLng(end.lat, end.lng)
        ],
        lineOptions: {
          styles: [
            { color: '#000', weight: 6, opacity: 0.6 },  // Underlay route border/shadow
            { color: '#d4af37', weight: 4, opacity: 0.95 } // Glowing gold route line
          ]
        },
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        createMarker: () => null // Hide routing machine default markers
      }).addTo(this.map);

      routingControl.on('routesfound', (e: any) => {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const summary = routes[0].summary;
          const distanceKm = summary.totalDistance / 1000;
          const timeMinutes = Math.round(summary.totalTime / 60);
          resolve({ distance: distanceKm, time: timeMinutes });
        } else {
          resolve({ distance: 0, time: 0 });
        }
      });

      routingControl.on('routingerror', (err: any) => {
        console.error('Routing error:', err);
        resolve({ distance: 0, time: 0 });
      });

      this.polyline = routingControl;
    });
  }

  /** Display a custom popup */
  async openPopup(lat: number, lng: number, content: string) {
    const L = await import('leaflet');

    if (this.popup) this.map.closePopup(this.popup);

    this.popup = L.popup({
      closeOnClick: true,
      className: 'custom-leaflet-popup'
    })
      .setLatLng([lat, lng])
      .setContent(content)
      .openOn(this.map);
  }

  clearMarkers() {
    if (!this.markers) return;
    this.markers.forEach(m => m.remove());
    this.markers = [];
  }

  setMap(map: any) {
    this.map = map;
  }
}
