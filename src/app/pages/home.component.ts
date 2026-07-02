import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GoogleMapComponent } from '../components/google-map.components';
import { MAIN_LOCATION, NEARBY_LOCATIONS, ONGOINGPROJECT_LOCATIONS } from '../constants/data';
import { Router } from '@angular/router';
import { GoogleMapsService } from '../services/google-maps.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GoogleMapComponent],
  template: `
    <div class="home-container">
      <!-- Header -->
      <div class="header glassmorphism">
        <div class="header-left">
          <div class="logo">Elephantine Enormous</div>
          <span class="separator">/</span>
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
      <div class="zoom-controls glassmorphism">
        <button class="zoom-btn" (click)="zoomIn()">+</button>
        <div class="zoom-level">{{ zoomLevel }}</div>
        <button class="zoom-btn" (click)="zoomOut()">−</button>
      </div>

      <!-- Footer CTA Button -->
      <div class="iheart-button">
        <button class="btn-iheart" (click)="navigateToLocation()">
          <span class="elepha">
            <img src="assets/images/organic.gif" alt="Elephantine" />
          </span>
          <span class="text">Elephantine Enormous</span>
        </button>
      </div>

      <!-- Fixed Popup Modal -->
      <div class="popup-overlay">
        <div class="popup-modal glassmorphism">
          <div class="popup-header">
            <h2 class="popup-title">ELEPHANTINE</h2>
          </div>

          <div class="popup-content">
            <h3 class="popup-heading">Welcome to Elephantine Mambakkam</h3>
            
            <p class="popup-description">
              Discover Elephantine Enormous, an integrated residential community in Mambakkam, 
              Chennai. Experience modern living with world-class amenities, lush green spaces, 
              and sustainable architecture designed for your comfort and convenience.
            </p>

            <div class="popup-social">
              <a href="https://www.linkedin.com/company/elephantine-enterprises/?originalSubdomain=in" target="_blank" class="social-icon">🔗</a>
              <a href="https://www.instagram.com/elephantineenterprises/?hl=en" target="_blank" class="social-icon">📷</a>
              <a href="https://www.youtube.com/@elephantineenterprises" target="_blank" class="social-icon">🎬</a>
              <a href="#" class="social-icon">✉️</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Cloud/Fog Layers for Atmosphere -->
      <div class="cloud-container">
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
        <div class="cloud cloud3"></div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      position: relative;
      width: 100%;
      height: 100vh;
      background-color: #0d0c0b;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1.2rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .logo {
      font-size: 1.4rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: 0.5px;
    }

    .city {
      font-size: 0.85rem;
      color: #d4af37;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .separator {
      color: #555;
    }

    /* Glassmorphism style helper */
    .glassmorphism {
      background: rgba(18, 18, 17, 0.75) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
    }

    .zoom-controls {
      position: absolute;
      bottom: 8rem;
      right: 1.5rem;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 8px;
    }

    .zoom-btn {
      width: 2.2rem;
      height: 2.2rem;
      padding: 0;
      background-color: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #fff;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s;
    }

    .zoom-btn:hover {
      background-color: #d4af37;
      color: #000;
      border-color: #d4af37;
    }

    .zoom-level {
      text-align: center;
      color: #aaa;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0;
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
      transform: scale(1.05);
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

    /* Popup Modal Styles */
    .popup-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease-in-out;
      pointer-events: none;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .popup-modal {
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 550px;
      width: 90%;
      position: relative;
      animation: slideUp 0.3s ease-out;
      pointer-events: auto;
    }

    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .popup-header {
      text-align: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      padding-bottom: 1rem;
    }

    .popup-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: #d4af37;
      letter-spacing: 0.2em;
      margin: 0;
      text-transform: uppercase;
    }

    .popup-content {
      text-align: center;
    }

    .popup-heading {
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 1rem 0;
      letter-spacing: 0.5px;
    }

    .popup-description {
      font-size: 0.88rem;
      color: #ccc;
      line-height: 1.6;
      margin: 0 0 1.5rem 0;
      text-align: center;
    }

    .popup-social {
      display: flex;
      justify-content: center;
      gap: 1.2rem;
      margin-top: 1.5rem;
    }

    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      height: 2.4rem;
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      color: #d4af37;
      text-decoration: none;
      font-size: 1.1rem;
      transition: all 0.25s;
      cursor: pointer;
    }

    .social-icon:hover {
      background-color: rgba(212, 175, 55, 0.15);
      border-color: #d4af37;
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
    }

    /* Fog Cloud Animation */
    .cloud-container {
      position: absolute;
      top: 4rem;
      left: 0;
      width: 100%;
      height: 150px;
      pointer-events: none;
      z-index: 500;
      overflow: hidden;
    }

    .cloud {
      position: absolute;
      top: 0;
      width: 220px;
      height: 110px;
      background-image: url('/assets/images/Dramatic-Fog-Cloud-Over-Mountain-Peaks-PNG.png');
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.45;
      animation: moveCloud 50s linear infinite;
    }

    .cloud1 {
      left: -250px;
      animation-duration: 35s;
      animation-delay: 0s;
    }

    .cloud2 {
      left: -250px;
      top: 30px;
      animation-duration: 80s;
      animation-delay: 10s;
    }

    .cloud3 {
      left: -250px;
      top: 60px;
      animation-duration: 100s;
      animation-delay: 20s;
    }

    @keyframes moveCloud {
      0%   { transform: translateX(-250px); opacity: 0; }
      10%  { opacity: 0.55; }
      90%  { opacity: 0.55; }
      100% { transform: translateX(120vw); opacity: 0; }
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

    @media (max-width: 768px) {
      .popup-modal {
        padding: 1.8rem;
      }
      .popup-title {
        font-size: 1.5rem;
      }
      .header {
        padding: 1rem;
      }
      .logo {
        font-size: 1.1rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  mainLocation = MAIN_LOCATION;
  nearbyLocations = NEARBY_LOCATIONS;
  zoomLevel = 10;
  map: any;
  mainMarker: any;
  ongoingProjects = ONGOINGPROJECT_LOCATIONS;
  ongoingProjectMarkers: any[] = [];
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private googleMapsService: GoogleMapsService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  async onMapReady(map: any): Promise<void> {
    if (!this.isBrowser) return;

    this.map = map;
    this.googleMapsService.setMap(map);

    await this.addMainLocationMarker();
    await this.addOngoingProjectMarkers();  
  }

  private async addMainLocationMarker(): Promise<void> {
    if (!this.map) return;
    this.mainMarker = await this.googleMapsService.createMainLocationMarker(
      this.mainLocation.latitude,
      this.mainLocation.longitude,
      this.mainLocation.name,
      this.mainLocation.icon
    );

    this.mainMarker.bindPopup(`
      <div class="map-popup-card">
        <div class="map-popup-title">${this.mainLocation.name}</div>
        <div class="map-popup-address">${this.mainLocation.address}</div>
      </div>
    `);
  }

  private async addOngoingProjectMarkers(): Promise<void> {
    if (!this.map) return;

    this.ongoingProjects.forEach(async project => {
      const color = '#00b3ff';
      const marker = await this.googleMapsService.createMarker(
        { lat: project.latitude, lng: project.longitude },
        project.name,
        color,
        project.icon ?? '📍',
        'Ongoing Project',
        project.address
      );

      marker.bindPopup(`
        <div class="map-popup-card">
          <div class="map-popup-title" style="color: #00b3ff;">${project.name}</div>
          <div class="map-popup-category" style="color: #aaa;">Ongoing Project</div>
          <div class="map-popup-address">${project.address}</div>
        </div>
      `);

      this.ongoingProjectMarkers.push(marker);
    });
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
