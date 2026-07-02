import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { GoogleMapComponent } from '../components/google-map.components';
import { MAIN_LOCATION, MAP_FILTER_CATEGORIES, NEARBY_LOCATIONS, TRANSPORTATION_CATEGORIES } from '../constants/data';
import { Location } from '../models';
import { GoogleMapsService } from '../services/google-maps.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, GoogleMapComponent],
  template: `
    <div class="location-container">
      <!-- Header with Breadcrumb -->
      <div class="header">
        <button class="back-btn" (click)="goBack()">←</button>
        <div class="breadcrumb">
          <span class="breadcrumb-item">Elephantine Enormous</span>
          <span class="separator">/</span>
          <span class="breadcrumb-item active">Location</span>
        </div>
      </div>

      <!-- Map -->
      <app-google-map
        [initialCenter]="{ lat: mainLocation.latitude, lng: mainLocation.longitude }"
        [initialZoom]="13"
        (mapReady)="onMapReady($event)"
      ></app-google-map>

      <!-- Filter Sidebar -->
      <div class="filter-sidebar glassmorphism">
        <h3 class="filter-title">MAP FILTERS</h3>

        <!-- Location Filters -->
        <button class="select-all-btn" [class.active]="selectedFilters.length === filterCategories.length" (click)="toggleSelectAll()">
          Show All
        </button>

        <div class="filter-group">
          <button *ngFor="let category of filterCategories"
            class="filter-btn"
            [class.active]="selectedFilters.includes(category.name)"
            (click)="toggleFilter(category.name)">
            <span>{{ category.name }}</span>
            <input type="checkbox" [checked]="selectedFilters.includes(category.name)" />
          </button>
        </div>

        <!-- Transportation Filters -->
        <div class="transport-section">
          <h3 class="filter-title">TRANSPORTATION</h3>
          <button class="select-all-btn" [class.active]="selectedTransport.length === transportCategories.length" (click)="toggleTransportSelectAll()">
            Show All
          </button>

          <div class="filter-group">
            <button *ngFor="let transport of transportCategories"
              class="filter-btn"
              [class.active]="selectedTransport.includes(transport.name)"
              (click)="toggleTransport(transport.name)">
              <span>{{ transport.name }}</span>
              <input type="checkbox" [checked]="selectedTransport.includes(transport.name)" />
            </button>
          </div>
        </div>
      </div>

      <!-- Locations List -->
      <div class="locations-list glassmorphism" *ngIf="filteredLocations.length > 0">
        <h3 class="list-title">NEARBY LOCATIONS</h3>
        <div class="locations-scroll">
          <button *ngFor="let location of filteredLocations"
            class="location-item"
            [class.selected]="selectedLocation?.id === location.id"
            (click)="selectLocation(location)">
            <div class="location-name">{{ location.name }}</div>
            <div class="location-category" [style.color]="locationService.getCategoryColor(location.category)">{{ location.category }}</div>
            <div *ngIf="selectedLocation?.id === location.id && distance !== null" class="distance-info">
              <span>🚗 {{ distance.toFixed(1) }} km</span>
              <span *ngIf="travelTime !== null" class="time-badge">⏱️ {{ travelTime }} mins</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Footer CTA Button -->
      <div class="iheart-button">
        <button class="btn-iheart" (click)="navigateToBuilding()">
          <span class="elepha">
            <img src="assets/images/organic.gif" alt="Elephantine" />
          </span>
          <span class="text">Elephantine Enormous</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .location-container {
      position: relative;
      width: 100%;
      height: 100vh;
      background-color: #0d0c0b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0));
      padding: 1.2rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }

    .back-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      font-size: 1.2rem;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .back-btn:hover {
      background: #d4af37;
      border-color: #d4af37;
      color: #000;
      transform: translateX(-3px);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
    }

    .breadcrumb-item {
      color: #aaa;
    }

    .breadcrumb-item.active {
      color: #d4af37;
      font-weight: 600;
    }

    .separator {
      color: #666;
    }

    /* Glassmorphism style helper */
    .glassmorphism {
      background: rgba(18, 18, 17, 0.75) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
    }

    .filter-sidebar {
      position: absolute;
      left: 1.5rem;
      top: 5.5rem;
      z-index: 20;
      border-radius: 12px;
      padding: 1.2rem;
      width: 13.5rem;
      max-height: 75vh;
      overflow-y: auto;
      transition: all 0.3s ease;
    }

    .filter-title {
      color: #d4af37;
      font-weight: 700;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      margin-top: 0;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 0.5rem;
    }

    .select-all-btn {
      width: 100%;
      padding: 0.5rem;
      border-radius: 6px;
      margin-bottom: 0.8rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      background-color: rgba(255, 255, 255, 0.05);
      color: #ccc;
    }

    .select-all-btn.active {
      background-color: #d4af37;
      color: #000;
      border-color: #d4af37;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .filter-btn {
      width: 100%;
      padding: 0.6rem 0.8rem;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.05);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.25s;
      background-color: rgba(255,255,255,0.02);
      color: #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
    }

    .filter-btn:hover {
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .filter-btn.active {
      background-color: rgba(212, 175, 55, 0.1);
      border-color: rgba(212, 175, 55, 0.3);
      color: #fff;
    }

    .filter-btn input {
      width: 0.9rem;
      height: 0.9rem;
      cursor: pointer;
      accent-color: #d4af37;
    }

    .transport-section {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 1rem;
    }

    .locations-list {
      position: absolute;
      right: 1.5rem;
      top: 5.5rem;
      z-index: 20;
      border-radius: 12px;
      padding: 1.2rem;
      width: 18rem;
      max-height: 75vh;
      display: flex;
      flex-direction: column;
    }

    .list-title {
      color: #d4af37;
      font-weight: 700;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      margin-top: 0;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 0.5rem;
    }

    .locations-scroll {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding-right: 0.2rem;
    }

    .location-item {
      padding: 0.8rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.25s;
      background-color: rgba(255, 255, 255, 0.03);
      color: #eee;
      text-align: left;
    }

    .location-item:hover {
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .location-item.selected {
      background-color: rgba(212, 175, 55, 0.12);
      border-color: #d4af37;
      color: #fff;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.15);
    }

    .location-name {
      font-weight: 600;
      line-height: 1.3;
    }

    .location-category {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 0.3rem;
    }

    .distance-info {
      font-size: 0.8rem;
      color: #fff;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: rgba(0, 0, 0, 0.3);
      padding: 0.3rem 0.5rem;
      border-radius: 4px;
      border-left: 3px solid #d4af37;
    }

    .time-badge {
      background: rgba(212, 175, 55, 0.2);
      color: #d4af37;
      padding: 0.1rem 0.4rem;
      border-radius: 3px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .iheart-button {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
    }

    .btn-iheart {
      background: rgba(18, 18, 17, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff;
      padding: 0.9rem 2.2rem;
      border-radius: 30px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
      letter-spacing: 1px;
    }

    .btn-iheart:hover {
      background-color: #d4af37;
      color: #000;
      border-color: #d4af37;
      transform: translateX(-50%) scale(1.05);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
    }

    .btn-iheart:hover .elepha img {
      filter: invert(1);
    }

    .elepha img {
      width: 26px;
      height: 26px;
      object-fit: contain;
      transition: all 0.3s ease;
    }

    /* --- MAP RADAR MARKERS & TOOLTIPS --- */
    ::ng-deep .upgraded-map-tooltip-card {
      background: rgba(18, 18, 18, 0.92) !important;
      backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      border-radius: 10px !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5) !important;
      color: #fff !important;
      padding: 0.8rem !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-size: 0.8rem !important;
      width: 180px !important;
      white-space: normal !important;
      z-index: 1000 !important;
      pointer-events: none !important;
    }

    ::ng-deep .leaflet-tooltip-top:before {
      border-top-color: rgba(18, 18, 18, 0.92) !important;
    }

    ::ng-deep .map-tooltip-card h4.tooltip-title {
      margin: 0 0 0.3rem 0;
      font-size: 0.85rem;
      font-weight: 700;
      color: #fff;
      line-height: 1.3;
    }

    ::ng-deep .map-tooltip-card span.tooltip-category {
      font-size: 0.65rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: inline-block;
      margin-bottom: 0.4rem;
    }

    ::ng-deep .map-tooltip-card p.tooltip-address {
      margin: 0 0 0.5rem 0;
      font-size: 0.75rem;
      color: #bbb;
      line-height: 1.3;
    }

    ::ng-deep .map-tooltip-card .tooltip-action {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 0.4rem;
    }

    /* Pulsing main location marker hotspot */
    ::ng-deep .pulsing-main-marker {
      position: relative;
      width: 46px;
      height: 46px;
    }

    ::ng-deep .main-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid #d4af37;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
      top: -2px;
      left: -2px;
    }

    ::ng-deep .main-pulse.wave1 {
      animation: main-pulse-anim 2s infinite ease-out;
    }
    ::ng-deep .main-pulse.wave2 {
      animation: main-pulse-anim 2s infinite ease-out 0.8s;
    }

    @keyframes main-pulse-anim {
      0% { transform: scale(0.6); opacity: 0; }
      20% { opacity: 0.8; }
      80% { transform: scale(1.8); opacity: 0; }
      100% { transform: scale(1.8); opacity: 0; }
    }

    /* Pulsing POI Markers */
    ::ng-deep .poi-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
      animation: poi-marker-pulse 2s infinite ease-out;
      top: -2px;
      left: -2px;
    }
    @keyframes poi-marker-pulse {
      0% { transform: scale(0.6); opacity: 0; }
      20% { opacity: 0.8; }
      80% { transform: scale(2.0); opacity: 0; }
      100% { transform: scale(2.0); opacity: 0; }
    }

    /* Custom Leaflet popup formatting in global view */
    ::ng-deep .custom-leaflet-popup .leaflet-popup-content-wrapper {
      background: rgba(18, 18, 18, 0.85) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      border-radius: 12px !important;
      color: #fff !important;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
    }
    ::ng-deep .custom-leaflet-popup .leaflet-popup-tip {
      background: rgba(18, 18, 18, 0.85) !important;
      border-left: 1px solid rgba(255, 255, 255, 0.15) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
    }
    ::ng-deep .map-popup-card {
      padding: 0.3rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-width: 180px;
    }
    ::ng-deep .map-popup-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #d4af37;
      margin-bottom: 0.25rem;
      line-height: 1.3;
    }
    ::ng-deep .map-popup-category {
      font-size: 0.7rem;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    ::ng-deep .map-popup-address {
      font-size: 0.75rem;
      color: #ccc;
      margin-bottom: 0.6rem;
    }
    ::ng-deep .map-popup-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin-bottom: 0.6rem;
    }
    ::ng-deep .map-popup-metrics {
      display: flex;
      gap: 1rem;
    }
    ::ng-deep .metric-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #fff;
    }

    /* Mobile view styling */
    @media (max-width: 992px) {
      .filter-sidebar {
        left: 1rem;
        width: 11rem;
        padding: 0.8rem;
      }
      .locations-list {
        right: 1rem;
        width: 15rem;
        padding: 0.8rem;
      }
    }

    @media (max-width: 768px) {
      .filter-sidebar {
        position: absolute;
        top: auto;
        bottom: 5.5rem;
        left: 1rem;
        width: calc(50% - 1.5rem);
        max-height: 40vh;
      }
      .locations-list {
        position: absolute;
        top: auto;
        bottom: 5.5rem;
        right: 1rem;
        width: calc(50% - 1.5rem);
        max-height: 40vh;
      }
      .header {
        padding: 0.8rem;
      }
    }
  `]
})
export class LocationComponent implements OnInit {
  mainLocation = MAIN_LOCATION;
  filterCategories = MAP_FILTER_CATEGORIES;
  transportCategories = TRANSPORTATION_CATEGORIES;
  selectedFilters: string[] = [];
  selectedTransport: string[] = [];
  selectedLocation: Location | null = null;
  distance: number | null = null;
  travelTime: number | null = null;
  filteredLocations: Location[] = [];
  map: any;

  constructor(
    private router: Router,
    protected locationService: LocationService,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit(): void {
    // Show all filters by default
    this.selectedFilters = this.filterCategories.map(c => c.name);
    this.selectedTransport = this.transportCategories.map(t => t.name);
    this.updateFilteredLocations();
  }

  async onMapReady(map: any) {
    this.map = map;
    this.googleMapsService.setMap(map);

    // Main location marker
    await this.googleMapsService.createMainLocationMarker(
      MAIN_LOCATION.latitude,
      MAIN_LOCATION.longitude,
      MAIN_LOCATION.name,
      MAIN_LOCATION.icon
    );

    // Initial setup of markers
    this.updateMapMarkers();
  }

  toggleFilter(categoryName: string): void {
    const index = this.selectedFilters.indexOf(categoryName);
    if (index > -1) {
      this.selectedFilters.splice(index, 1);
    } else {
      this.selectedFilters.push(categoryName);
    }
    this.updateFilteredLocations();
  }

  toggleSelectAll(): void {
    if (this.selectedFilters.length === this.filterCategories.length) {
      this.selectedFilters = [];
    } else {
      this.selectedFilters = this.filterCategories.map(c => c.name);
    }
    this.updateFilteredLocations();
  }

  toggleTransport(transportName: string): void {
    const index = this.selectedTransport.indexOf(transportName);
    if (index > -1) {
      this.selectedTransport.splice(index, 1);
    } else {
      this.selectedTransport.push(transportName);
    }
    this.updateFilteredLocations();
  }

  toggleTransportSelectAll(): void {
    if (this.selectedTransport.length === this.transportCategories.length) {
      this.selectedTransport = [];
    } else {
      this.selectedTransport = this.transportCategories.map(t => t.name);
    }
    this.updateFilteredLocations();
  }

  private updateFilteredLocations(): void {
    const allCategories = [...this.selectedFilters, ...this.selectedTransport];
    this.filteredLocations = this.locationService.filterLocationsByCategories(NEARBY_LOCATIONS, allCategories);
    if (this.map) {
      this.updateMapMarkers();
    }
  }

  private async updateMapMarkers(): Promise<void> {
    this.googleMapsService.clearMarkers();

    // Redraw main location
    await this.googleMapsService.createMainLocationMarker(
      MAIN_LOCATION.latitude,
      MAIN_LOCATION.longitude,
      MAIN_LOCATION.name,
      MAIN_LOCATION.icon
    );

    // Add filtered markers
    this.filteredLocations.forEach(async loc => {
      const color = this.locationService.getCategoryColor(loc.category);
      const marker = await this.googleMapsService.createMarker(
        { lat: loc.latitude, lng: loc.longitude },
        loc.name,
        color,
        loc.icon ?? '📍',
        loc.category,
        loc.address
      );

      marker.on('click', () => this.handleLocationClick(loc));
    });
  }

  async handleLocationClick(location: Location) {
    this.selectedLocation = location;
    await this.calculateAndDrawRoute(location);
  }

  async selectLocation(location: Location) {
    this.selectedLocation = location;
    await this.calculateAndDrawRoute(location);
  }

  private async calculateAndDrawRoute(location: Location) {
    try {
      const routeInfo = await this.googleMapsService.drawRoute(
        { lat: MAIN_LOCATION.latitude, lng: MAIN_LOCATION.longitude },
        { lat: location.latitude, lng: location.longitude }
      );

      this.distance = routeInfo.distance;
      this.travelTime = routeInfo.time;
    } catch (err) {
      console.error('Error drawing route:', err);
      // Fallback calculations in case routing fails
      this.distance = this.locationService.calculateDistance(
        MAIN_LOCATION.latitude,
        MAIN_LOCATION.longitude,
        location.latitude,
        location.longitude
      );
      this.travelTime = Math.round((this.distance / 40) * 60); // assume 40km/h avg speed
    }

    // Popup content with styled HTML
    const popupHtml = `
      <div class="map-popup-card">
        <div class="map-popup-title">${location.name}</div>
        <div class="map-popup-category" style="color: ${this.locationService.getCategoryColor(location.category)}">${location.category}</div>
        <div class="map-popup-address">${location.address}</div>
        <div class="map-popup-divider"></div>
        <div class="map-popup-metrics">
          <div class="metric-item">
            <span class="metric-icon">🚗</span>
            <span class="metric-val">${this.distance.toFixed(1)} km</span>
          </div>
          <div class="metric-item">
            <span class="metric-icon">⏱️</span>
            <span class="metric-val" style="color:#d4af37;">${this.travelTime} mins</span>
          </div>
        </div>
      </div>
    `;

    await this.googleMapsService.openPopup(
      location.latitude,
      location.longitude,
      popupHtml
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  navigateToBuilding(): void {
    this.router.navigate(['/building']);
  }
}
