import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AMENITIES, BUILDING_IMAGE, MAIN_LOCATION } from '../constants/data';
import { Amenity } from '../models';

@Component({
  selector: 'app-building',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="building-container">
      <!-- Header with Breadcrumb -->
      <div class="header">
        <button class="back-btn" (click)="goBack()">←</button>
        <div class="breadcrumb">
          <span class="breadcrumb-item">Elephantine Enormous</span>
          <span class="separator">/</span>
          <span class="breadcrumb-item">Location</span>
          <span class="separator">/</span>
          <span class="breadcrumb-item active">Elephantine Enormous</span>
        </div>
      </div>

      <!-- Design Mode Switcher -->
      <button class="toggle-view-btn" (click)="toggleViewMode()">
        <span>{{ isUpgradedView ? 'Classic Hotspots' : '✨ Upgraded Hotspots' }}</span>
      </button>

      <!-- Building Image with Hotspots -->
      <div class="building-image-container">
        <img [src]="buildingImage" alt="Building Top View" class="building-image" />

        <!-- CLASSIC HOTSPOTS -->
        <ng-container *ngIf="!isUpgradedView">
          <button *ngFor="let amenity of amenities"
            class="amenity-hotspot classic"
            [style.left.%]="amenity.position.x"
            [style.top.%]="amenity.position.y"
            (click)="selectAmenity(amenity)"
            [title]="amenity.name">
            <div class="hotspot-circle">
              <div class="hotspot-bg"></div>
              <div class="hotspot-icon">{{ amenity.icon }}</div>
            </div>
            <div class="hotspot-tooltip">{{ amenity.name }}</div>
          </button> 
        </ng-container>

        <!-- UPGRADED HOTSPOTS -->
        <ng-container *ngIf="isUpgradedView">
          <button *ngFor="let amenity of amenities"
            class="amenity-hotspot upgraded"
            [style.left.%]="amenity.position.x"
            [style.top.%]="amenity.position.y"
            (click)="selectAmenity(amenity)">
            
            <div class="pulsing-ring-container">
              <div class="ring-pulse pulse1"></div>
              <div class="ring-pulse pulse2"></div>
              <div class="ring-core">
                <span class="core-icon">{{ amenity.icon }}</span>
              </div>
            </div>
            
            <!-- Hover Preview Card -->
            <div class="upgraded-tooltip-card">
              <div class="tooltip-thumbnail-wrapper">
                <img [src]="amenity.image360" alt="thumbnail" class="tooltip-thumbnail" />
                <div class="tooltip-badge">360° VR</div>
              </div>
              <div class="tooltip-card-body">
                <h4>{{ amenity.name }}</h4>
                <p>{{ amenity.description | slice:0:70 }}...</p>
                <div class="click-to-explore">Click to Explore VR ➔</div>
              </div>
            </div>
          </button>
        </ng-container>

        <!-- Floating Control Buttons -->
        <div class="controls-panel">
          <button class="control-btn" [class.active]="showAmenities" (click)="toggleShowAmenities()">Amenities</button>
          <button class="control-btn" [class.active]="showGallery" (click)="toggleShowGallery()">Gallery</button>
        </div>

        <!-- Amenities Footer -->
        <div class="amenities-footer glassmorphism" *ngIf="showAmenities">
          <div class="footer-header">
            <h3>Amenities Overlay</h3>
            <button class="toggle-btn" (click)="toggleShowAmenities()">Hide</button>
          </div>

          <div class="amenities-grid">
            <button *ngFor="let amenity of amenities"
              class="amenity-btn"
              (click)="selectAmenity(amenity)">
              <span class="amenity-icon">{{ amenity.icon }}</span>
              <span class="amenity-name">{{ amenity.name }}</span>
            </button>
          </div>
        </div>

        <!-- Gallery Sidebar -->
        <div class="gallery-sidebar glassmorphism" *ngIf="showGallery">
          <div class="gallery-header">
            <h3>Gallery</h3>
            <button class="toggle-btn" (click)="toggleShowGallery()">Hide</button>
          </div>

          <div class="gallery-images">
            <img *ngFor="let img of galleryImages" [src]="img"
                 [class.selected]="img === selectedImage"
                 (click)="selectImage(img)" />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .building-container {
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
      z-index: 20;
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

    /* Design View Toggle Button */
    .toggle-view-btn {
      position: absolute;
      top: 5rem;
      left: 1.5rem;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid #d4af37;
      color: #d4af37;
      padding: 0.6rem 1.4rem;
      border-radius: 30px;
      cursor: pointer;
      z-index: 25;
      font-weight: 700;
      letter-spacing: 0.5px;
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .toggle-view-btn:hover {
      background: #d4af37;
      color: #000;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
      transform: translateY(-2px);
    }

    .building-image-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .building-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* CLASSIC HOTSPOTS STYLING */
    .amenity-hotspot.classic {
      position: absolute;
      transform: translate(-50%, -50%);
      background: none;
      border: none;
      cursor: pointer;
      z-index: 15;
      padding: 0;
    }

    .hotspot-circle {
      position: relative;
      width: 1.8rem;
      height: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hotspot-bg {
      position: absolute;
      inset: 0;
      background-color: #ec4899;
      border-radius: 50%;
      opacity: 0.3;
      animation: pulse 2s infinite;
    }

    .hotspot-icon {
      position: relative;
      z-index: 2;
      background-color: #ec4899;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      transition: transform 0.2s;
    }

    .amenity-hotspot:hover .hotspot-icon {
      transform: scale(1.2);
    }

    .hotspot-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 0.5rem;
      background-color: rgba(50, 50, 50, 0.95);
      color: #fff;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    .amenity-hotspot.classic:hover .hotspot-tooltip {
      opacity: 1;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.3;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.6;
      }
    }

    /* UPGRADED HOTSPOTS STYLING */
    .amenity-hotspot.upgraded {
      position: absolute;
      transform: translate(-50%, -50%);
      background: none;
      border: none;
      cursor: pointer;
      z-index: 18;
      padding: 0;
    }

    .pulsing-ring-container {
      position: relative;
      width: 2.8rem;
      height: 2.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ring-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid #d4af37;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }
    .ring-pulse.pulse1 {
      animation: ring-pulse-anim 2s infinite ease-out;
    }
    .ring-pulse.pulse2 {
      animation: ring-pulse-anim 2s infinite ease-out 0.8s;
    }

    @keyframes ring-pulse-anim {
      0% { transform: scale(0.6); opacity: 0; }
      20% { opacity: 0.8; }
      80% { transform: scale(1.8); opacity: 0; }
      100% { transform: scale(1.8); opacity: 0; }
    }

    .ring-core {
      position: relative;
      z-index: 2;
      background: rgba(18, 18, 18, 0.85);
      border: 2px solid #d4af37;
      border-radius: 50%;
      width: 1.8rem;
      height: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.6);
      transition: all 0.3s ease;
      color: #fff;
    }

    .core-icon {
      font-size: 0.95rem;
    }

    .amenity-hotspot.upgraded:hover .ring-core {
      transform: scale(1.2);
      background: #d4af37;
      color: #000;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
    }

    .upgraded-tooltip-card {
      position: absolute;
      bottom: 3.2rem;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      width: 220px;
      background: rgba(18, 18, 18, 0.92);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.6);
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 30;
      text-align: left;
    }

    .amenity-hotspot.upgraded:hover .upgraded-tooltip-card {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    .tooltip-thumbnail-wrapper {
      position: relative;
      width: 100%;
      height: 100px;
      overflow: hidden;
    }

    .tooltip-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .amenity-hotspot.upgraded:hover .tooltip-thumbnail {
      transform: scale(1.1);
    }

    .tooltip-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #d4af37;
      color: #000;
      font-size: 0.6rem;
      font-weight: 800;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }

    .tooltip-card-body {
      padding: 0.8rem;
    }

    .tooltip-card-body h4 {
      margin: 0 0 0.3rem 0;
      font-size: 0.9rem;
      font-weight: 700;
      color: #fff;
    }

    .tooltip-card-body p {
      margin: 0 0 0.6rem 0;
      font-size: 0.75rem;
      color: #bbb;
      line-height: 1.4;
    }

    .click-to-explore {
      font-size: 0.75rem;
      font-weight: 700;
      color: #d4af37;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* controls panel */
    .controls-panel {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      z-index: 20;
    }

    .control-btn {
      background: rgba(18, 18, 17, 0.8);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff;
      padding: 0.75rem 1.6rem;
      border-radius: 30px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
      letter-spacing: 0.5px;
    }

    .control-btn:hover, .control-btn.active {
      background: #d4af37;
      color: #000;
      border-color: #d4af37;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35);
      transform: translateY(-2px);
    }

    .glassmorphism {
      background: rgba(18, 18, 17, 0.8) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
    }

    /* Amenities overlay footer */
    .amenities-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem;
      z-index: 22;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .footer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 0.5rem;
    }

    .footer-header h3 {
      color: #d4af37;
      font-weight: 700;
      margin: 0;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: #aaa;
      font-size: 0.85rem;
      cursor: pointer;
      transition: color 0.2s;
    }

    .toggle-btn:hover {
      color: #fff;
    }

    .amenities-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      max-height: 7.5rem;
      overflow-y: auto;
    }

    .amenity-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1rem;
      background-color: rgba(255, 255, 255, 0.04);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.25s;
    }

    .amenity-btn:hover {
      background-color: rgba(212, 175, 55, 0.15);
      border-color: #d4af37;
      color: #d4af37;
    }

    .amenity-icon {
      font-size: 1.1rem;
    }

    .amenity-name {
      font-weight: 500;
    }

    /* Gallery sidebar */
    .gallery-sidebar {
      position: absolute;
      top: 5rem;
      right: 0;
      width: 9.5rem;
      height: calc(100% - 5rem);
      padding: 1.2rem 1rem;
      overflow-y: auto;
      z-index: 22;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      border-left: 1px solid rgba(255,255,255,0.1);
      animation: slideInRight 0.3s ease-out;
    }

    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .gallery-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 0.5rem;
    }

    .gallery-header h3 {
      color: #d4af37;
      font-size: 0.85rem;
      font-weight: 700;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .gallery-images {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .gallery-images img {
      width: 100%;
      height: 70px;
      object-fit: cover;
      border-radius: 6px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.25s;
    }

    .gallery-images img:hover {
      transform: scale(1.05);
      border-color: rgba(212,175,55,0.5);
    }

    .gallery-images img.selected {
      border-color: #d4af37;
      box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
    }

    @media (max-width: 768px) {
      .toggle-view-btn {
        top: 4.8rem;
        left: 1rem;
        padding: 0.45rem 1rem;
        font-size: 0.75rem;
      }
      .controls-panel {
        bottom: auto;
        top: 4.8rem;
        right: 1rem;
        flex-direction: row;
        gap: 0.5rem;
      }
      .control-btn {
        padding: 0.45rem 1rem;
        font-size: 0.75rem;
      }
      .gallery-sidebar {
        top: auto;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 120px;
        flex-direction: row;
        border-left: none;
        border-top: 1px solid rgba(255,255,255,0.1);
        overflow-x: auto;
        overflow-y: hidden;
      }
      .gallery-images {
        flex-direction: row;
      }
      .gallery-images img {
        width: 100px;
        height: 60px;
      }
    }
  `]
})
export class BuildingComponent implements OnInit {
  mainLocation = MAIN_LOCATION;
  amenities = AMENITIES;
  buildingImage = BUILDING_IMAGE;
  showAmenities = false; 
  showGallery = false;
  isUpgradedView = false; // defaults to Classic View

  galleryImages = [
    '/assets/images/eno-ent.jpeg',
    '/assets/images/eno-enterance.jpeg',
    '/assets/images/front-apprtment shot.jpeg',
    '/assets/images/playground.png'
  ];
  selectedImage = this.galleryImages[0];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleViewMode(): void {
    this.isUpgradedView = !this.isUpgradedView;
  }

  toggleShowAmenities(): void {
    this.showAmenities = !this.showAmenities;
    if (this.showAmenities) {
      this.showGallery = false;
    }
  }

  toggleShowGallery(): void {
    this.showGallery = !this.showGallery;
    if (this.showGallery) {
      this.showAmenities = false;
    }
  }

  selectAmenity(amenity: Amenity): void {
    this.router.navigate(['/amenity', amenity.id]);
  }
  
  selectImage(img: string): void {
    this.router.navigate(['/gallery-image'], { queryParams: { img } });
  }

  goBack(): void {
    this.router.navigate(['/location']);
  }
}
