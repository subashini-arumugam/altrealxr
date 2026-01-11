import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GoogleMapComponent } from '../components/google-map.components';
import { MAIN_LOCATION } from '../constants/data';
import * as L from 'leaflet';
// import { GoogleMapComponent } from '../components/google-map.component';
// import { MAIN_LOCATION } from '../constants/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GoogleMapComponent],
  template: `
    <div class="home-container">
      <!-- Header -->
   
      <div class="header">
        <div class="header-left">
          <div class="logo">ALT Real</div>
          <span class="city">Chennai</span>
        </div>
      </div>

      <!-- Map Container -->
      <app-google-map
        [initialCenter]="{ lat: mainLocation.latitude, lng: mainLocation.longitude }"
        [initialZoom]="zoomLevel"
        (mapReady)="onMapReady($event)"
      ></app-google-map>

      <!-- Zoom Controls -->
      <div class="zoom-controls">
        <button class="zoom-btn" (click)="zoomIn()">+</button>
        <div class="zoom-level">{{ zoomLevel }}</div>
        <button class="zoom-btn" (click)="zoomOut()">−</button>
      </div>

      <!-- I HEART Button -->
      <div class="iheart-button">
        <button class="btn-iheart" (click)="navigateToLocation()">
          <span class="heart">💗</span>
          <span class="text">ALT Real</span>
        </button>
      </div>

    </div>
  `,
  // <div class="header-right">
  //         <button class="nav-btn">Menu</button>
  //         <button class="nav-btn">Login</button>
  //       </div>
  styles: [`
    .home-container {
      position: relative;
      width: 100%;
      height: 100vh;
      background-color: #000;
      overflow: hidden;
    }
   .map-container { z-index: 1; }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
    }

    .city {
      font-size: 0.875rem;
      color: #999;
    }

    .header-right {
      display: flex;
      gap: 1rem;
    }

    .nav-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      color: #999;
      background: none;
      border: none;
      cursor: pointer;
      transition: color 0.3s;
    }

    .nav-btn:hover {
      color: #fff;
    }

    .zoom-controls {
      position: absolute;
      bottom: 8rem;
      right: 1rem;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .zoom-btn {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      background-color: #fff;
      border: none;
      border-radius: 0.25rem;
      color: #000;
      font-size: 1.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .zoom-btn:hover {
      background-color: #f0f0f0;
    }

    .zoom-level {
      text-align: center;
      color: #fff;
      font-size: 0.75rem;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
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
 
  `]
})
// <div class="fog-layer fog-top"></div>
//   <div class="fog-layer fog-bottom"></div>
//      /* CLOUD BASE STYLE */
// /* FOG BASE STYLE */
// .fog-layer {
//   position: absolute;
//   left: 0;
//   width: 300%;
//   height: 250px;
//   background-image: url('/assets/images/fog1.png'); /* your fog texture */
//   background-repeat: repeat-x;
//   background-size: cover;
//   opacity: 0.8; 
//   animation: fogMove 40s linear infinite;
//   pointer-events: none;
//   z-index: 9999; 
// }

// /* TOP FOG POSITION */
// .fog-top {
//   top: 0;

// }

// /* BOTTOM FOG POSITION */
// .fog-bottom {
//   bottom: 0;

// }

// /* MOVEMENT ANIMATION */
// @keyframes fogMove {
//   0% { transform: translateX(-20%); }
//   100% { transform: translateX(10%); }
// }
export class HomeComponent implements OnInit {
  mainLocation = MAIN_LOCATION;
  zoomLevel = 13;
  // map!: google.maps.Map;
  map!: L.Map;
  mainMarker!: L.Marker;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onMapReady(map: L.Map): void {
    this.map = map;
    this.addMainLocationMarker();
  } 
    private addMainLocationMarker(): void {
    if (!this.map) return;

    const L = require('leaflet');

    const marker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude])
      .addTo(this.map)
      .bindPopup(`<div style="padding:0.5rem;"><strong>${this.mainLocation.name}</strong><br/>${this.mainLocation.address}</div>`)
      .openPopup();

    this.mainMarker = marker;
  }

  zoomIn(): void {
    if (this.zoomLevel < 20) {
      this.zoomLevel++;
      this.map.setZoom(this.zoomLevel);
    }
  }

  zoomOut(): void {
    if (this.zoomLevel > 1) {
      this.zoomLevel--;
      this.map.setZoom(this.zoomLevel);
    }
  }

  navigateToLocation(): void {
    this.router.navigate(['/location']);
  }
}
