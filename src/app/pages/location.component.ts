import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { GoogleMapComponent } from '../components/google-map.component';
import { LocationService } from '../services/location.service';
import { GoogleMapComponent } from '../components/google-map.components';
import { MAIN_LOCATION, MAP_FILTER_CATEGORIES, NEARBY_LOCATIONS, TRANSPORTATION_CATEGORIES } from '../constants/data';
// import { MAIN_LOCATION, NEARBY_LOCATIONS, MAP_FILTER_CATEGORIES, TRANSPORTATION_CATEGORIES } from '../constants/data';
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
          <span class="breadcrumb-item">ALT Real</span>
          <span class="separator">/</span>
          <span class="breadcrumb-item active">Location</span>
        </div>
      </div>

      <!-- Map -->
      <app-google-map
        [initialCenter]="{ lat: mainLocation.latitude, lng: mainLocation.longitude }"
        [initialZoom]="15"
        (mapReady)="onMapReady($event)"
      ></app-google-map>

      <!-- Filter Sidebar -->
      <div class="filter-sidebar">
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
      <div class="locations-list">
        <h3 class="list-title">NEARBY LOCATIONS</h3>
        <div class="locations-scroll">
          <button *ngIf="filteredLocations.length === 0" class="no-locations">
            No locations selected
          </button>
          <button *ngFor="let location of filteredLocations"
            class="location-item"
            [class.selected]="selectedLocation?.id === location.id"
            (click)="selectLocation(location)">
            <div class="location-name">{{ location.name }}</div>
            <div class="location-category">{{ location.category }}</div>
            <div *ngIf="selectedLocation?.id === location.id && distance !== null" class="distance">
              Distance: {{ distance.toFixed(2) }} km
            </div>
          </button>
        </div>
      </div>

      <!-- I HEART Button -->
      <div class="iheart-button">
        <button class="btn-iheart" (click)="navigateToBuilding()">
          <span class="heart">💗</span>
          <span class="text">ALT Real</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .location-container {
      position: relative;
      width: 100%;
      height: 100vh;
      background-color: #000;
    }

    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .back-btn {
      background: none;
      border: none;
      color: #999;
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.3s;
    }

    .back-btn:hover {
      color: #fff;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    .breadcrumb-item {
      color: #999;
    }

    .breadcrumb-item.active {
      color: #fff;
      font-weight: 600;
    }

    .separator {
      color: #999;
    }

    .filter-sidebar {
      position: absolute;
      left: 1rem;
      top: 5rem;
      z-index: 20;
      background-color: rgba(0, 0, 0, 0.9);
      border-radius: 0.5rem;
      padding: 1rem;
      width: 12rem;
      max-height: 70vh;
      overflow-y: auto;
    }

    .filter-title {
      color: #fff;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 1rem;
      margin-top: 0;
    }

    .select-all-btn {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.25rem;
      margin-bottom: 0.5rem;
      border: none;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #444;
      color: #ccc;
    }

    .select-all-btn.active {
      background-color: #ec4899;
      color: #fff;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .filter-btn {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.25rem;
      border: none;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #333;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .filter-btn:hover {
      background-color: #444;
    }

    .filter-btn.active {
      background-color: #555;
      color: #fff;
    }

    .filter-btn input {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
    }

    .transport-section {
      border-top: 1px solid #555;
      padding-top: 1rem;
    }

    .locations-list {
      position: absolute;
      right: 1rem;
      top: 5rem;
      z-index: 20;
      background-color: rgba(0, 0, 0, 0.9);
      border-radius: 0.5rem;
      padding: 1rem;
      width: 16rem;
      max-height: 70vh;
      display: flex;
      flex-direction: column;
    }

    .list-title {
      color: #fff;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 1rem;
      margin-top: 0;
    }

    .locations-scroll {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .location-item {
      padding: 0.75rem;
      border-radius: 0.25rem;
      border: none;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #333;
      color: #ccc;
      text-align: left;
    }

    .location-item:hover {
      background-color: #444;
    }

    .location-item.selected {
      background-color: #ec4899;
      color: #fff;
    }

    .location-name {
      font-weight: 600;
    }

    .location-category {
      font-size: 0.75rem;
      color: #999;
      margin-top: 0.25rem;
    }

    .location-item.selected .location-category {
      color: #f0f0f0;
    }

    .distance {
      font-size: 0.75rem;
      color: #fff;
      margin-top: 0.25rem;
    }

    .no-locations {
      padding: 1rem;
      border: none;
      background: none;
      color: #999;
      font-size: 0.875rem;
      cursor: default;
    }

    .iheart-button {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
    }

    .btn-iheart {
      background-color: #fff;
      color: #000;
      padding: 1rem 2rem;
      border: none;
      border-radius: 2rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      transition: background-color 0.2s;
    }

    .btn-iheart:hover {
      background-color: #f0f0f0;
    }

    .heart {
      font-size: 1.5rem;
    }
 .title-bubble-marker .bubble-circle {
  width: 120px;               /* circle width */
  height: 120px;              /* circle height */
  background-color: #ff005e;  /* pink circle background */
  border-radius: 50%;          /* perfect circle */
  color: #ffffff;              /* white text */
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  line-height: 120px;          /* vertical center */
  border: 3px solid #ffffff;   /* optional white border */
  box-shadow: 0 0 6px rgba(0,0,0,0.5);
  white-space: normal;         /* allow wrapping */
  overflow: hidden;
  display: inline-block;
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
  filteredLocations: Location[] = [];
  map!: google.maps.Map;
  directionsRenderer!: google.maps.DirectionsRenderer;

  constructor(
    private router: Router,
    private locationService: LocationService,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit(): void {}

  // onMapReady(map: google.maps.Map): void {
  //   this.map = map;
  //   this.directionsRenderer = new google.maps.DirectionsRenderer({
  //     map: this.map,
  //     polylineOptions: {
  //       strokeColor: '#ec4899',
  //       strokeWeight: 3
  //     }
  //   });

  //   this.addMainLocationMarker();
  // }

async onMapReady(map: any) {
  this.map = map;

  // Main location marker
  await this.googleMapsService.createMainLocationMarker(
    MAIN_LOCATION.latitude,
    MAIN_LOCATION.longitude,
    MAIN_LOCATION.name
  );

  // LANDING PAGE BUBBLE MARKERS (big circular titles)
  NEARBY_LOCATIONS.forEach(loc => {
    this.googleMapsService.createTitleBubbleMarker(
      loc.latitude,
      loc.longitude,
      loc.name
    );
  });

  // Small category markers (like before)
  NEARBY_LOCATIONS.forEach(async loc => {
    const marker = await this.googleMapsService.createMarker(
      { lat: loc.latitude, lng: loc.longitude },
      loc.name,
      this.locationService.getCategoryColor(loc.category)
    );

    marker.on('click', () => this.handleLocationClick(loc));
  });
}


async handleLocationClick(location: Location) {
  // Calculate distance KM
  const distance = this.locationService.calculateDistance(
    MAIN_LOCATION.latitude,
    MAIN_LOCATION.longitude,
    location.latitude,
    location.longitude
  );

  // Draw polyline
await this.googleMapsService.drawRoute(
  { lat: MAIN_LOCATION.latitude, lng: MAIN_LOCATION.longitude },
  { lat: location.latitude, lng: location.longitude }
);


  // Popup content
  const popupHtml = `
    <div style="font-size:14px;font-weight:bold;">${location.name}</div>
    <div>${location.category}</div>
    <div>${location.address}</div>
    <div style="margin-top:6px;color:#ff005e;font-weight:bold;">
      Distance: ${distance.toFixed(2)} km
    </div>
  `;

  // Show popup
  await this.googleMapsService.openPopup(
    location.latitude,
    location.longitude,
    popupHtml
  );
}
  // private addMainLocationMarker(): void {
  //   new google.maps.Marker({
  //     position: {
  //       lat: this.mainLocation.latitude,
  //       lng: this.mainLocation.longitude
  //     },
  //     map: this.map,
  //     title: this.mainLocation.name,
  //     icon: {
  //       path: google.maps.SymbolPath.CIRCLE,
  //       scale: 10,
  //       fillColor: '#ec4899',
  //       fillOpacity: 1,
  //       strokeColor: '#fff',
  //       strokeWeight: 2
  //     }
  //   });
  // }

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
    this.updateMapMarkers();
  }

  private updateMapMarkers(): void {
    // Clear previous markers (except main location)
    this.filteredLocations.forEach(location => {
      new google.maps.Marker({
        position: {
          lat: location.latitude,
          lng: location.longitude
        },
        map: this.map,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#3b82f6',
          fillOpacity: 0.8,
          strokeColor: '#fff',
          strokeWeight: 1
        }
      });
    });
  }

  selectLocation(location: Location): void {
    this.selectedLocation = location;
    this.distance = null;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: {
          lat: this.mainLocation.latitude,
          lng: this.mainLocation.longitude
        },
        destination: {
          lat: location.latitude,
          lng: location.longitude
        },
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          this.directionsRenderer.setDirections(result);
          this.distance = this.locationService.calculateDistance(
            this.mainLocation.latitude,
            this.mainLocation.longitude,
            location.latitude,
            location.longitude
          );
        }
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  navigateToBuilding(): void {
    this.router.navigate(['/building']);
  }
}
