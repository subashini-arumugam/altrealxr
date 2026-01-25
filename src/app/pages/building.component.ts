import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AMENITIES, BUILDING_IMAGE, MAIN_LOCATION } from '../constants/data';
import { Amenity } from '../models';
// import { AMENITIES, BUILDING_IMAGE, MAIN_LOCATION } from '../constants/data';
// import { Amenity } from '../models';

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

     

      <!-- Building Image with Hotspots -->
      <div class="building-image-container">
        <img [src]="buildingImage" alt="Building Top View" class="building-image" />

        <!-- Amenity Hotspots -->
        <button *ngFor="let amenity of amenities"
          class="amenity-hotspot"
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

           <!-- Amenities List at Bottom -->
           <!-- Floating Amenities Button -->
          <button class="open-amenities-btn" *ngIf="!showAmenities" (click)="toggleShowAmenities()">Amenities</button>
          <button class="open-gallery-btn" *ngIf="!showGallery" (click)="toggleShowGallery()">Gallery</button>

        <div class="amenities-footer" *ngIf="showAmenities">
          <div class="footer-header">
            <h3>Amenities</h3>
            <button class="toggle-btn" (click)="toggleShowAmenities()">
             Hide 
            </button>
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

        <div class="gallery-sidebar" *ngIf="showGallery">
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
  `,

  // <div class="amenities-footer">
  //         <div class="footer-header">
  //           <h3>Amenities</h3>
  //           <button class="toggle-btn" (click)="toggleShowAmenities()">
  //             {{ showAmenities ? 'Hide' : 'Show' }} All
  //           </button>
  //         </div>
  // <!-- I HEART Button -->
  //     <div class="iheart-button">
  //       <button class="btn-iheart" (click)="navigateToAmenity()">
  //         <span class="heart">💗</span>
  //         <span class="text">I HEART</span>
  //       </button>
  //     </div>
  //   </div>
  styles: [`
    .building-container {
      position: relative;
      width: 100%;
      height: 100vh;
      background-color: #000;
      overflow: hidden;
    }

    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 20;
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

    .building-info {
      position: absolute;
      top: 5rem;
      left: 1rem;
      z-index: 20;
      background-color: rgba(0, 0, 0, 0.9);
      border-radius: 0.5rem;
      padding: 1rem;
      width: 14rem;
    }

    .building-info h3 {
      color: #fff;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .info-content {
      color: #ccc;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .label {
      font-weight: 600;
    }

    .description {
      font-size: 0.75rem;
      color: #999;
      margin-top: 0.5rem;
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
    }

    .amenity-hotspot {
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

    .amenity-hotspot:hover .hotspot-tooltip {
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
    .open-amenities-btn {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      background: #ec4899;
      color: #fff;
      border: none;
      padding: .75rem 1.25rem;
      border-radius: 2rem;
      cursor: pointer;
      z-index: 20;
    }

    .amenities-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem 1rem;
      z-index: 20;
    }
    .footer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .footer-header h3 {
      color: #fff;
      font-weight: 600;
      margin: 0;
      font-size: 0.875rem;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: #abacf5ff;
      font-size: 0.875rem;
      cursor: pointer;
      transition: color 0.2s;
    }

    .toggle-btn:hover {
      color: #fff;
    }

    .amenities-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      max-height: 6rem;
      overflow-y: auto;
    }

    .amenity-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      cursor: pointer;
      white-space: nowrap;
      transition: background-color 0.2s;
    }

    .amenity-btn:hover {
      background-color: #ec4899;
    }

    .amenity-icon {
      font-size: 1rem;
    }

    .amenity-name {
      font-weight: 500;
    }

    .iheart-button {
      position: absolute;
      bottom: 8rem;
      right: 1rem;
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
      .open-gallery-btn {
  position: absolute;
  bottom: 5rem;
  right: 1rem;
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 2rem;
  cursor: pointer;
  z-index: 20;
}

.gallery-sidebar {
  position: absolute;
  top: 5rem;
  right: 0;
  width: 8rem;
  height: calc(100% - 5rem);
  background-color: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  overflow-y: auto;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.gallery-header h3 {
  color: #fff;
  font-size: 0.875rem;
  margin: 0;
}

.gallery-images img {
  width: 100%;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s, border 0.2s;
}

.gallery-images img:hover {
  transform: scale(1.05);
}

.gallery-images img.selected {
  border: 2px solid #3b82f6;
}

      
  `]

  //  .building-image {
  //     width: 100%;
  //     height: 100%;
  //     object-fit: cover;
  //   }


  //  <!-- Building Info -->
  //     <div class="building-info">
  //       <h3>Building Info</h3>
  //       <div class="info-content">
  //         <div>
  //           <span class="label">Total Units:</span> {{ mainLocation.totalUnits }}
  //         </div>
  //         <div class="description">{{ mainLocation.description }}</div>
  //       </div>
  //     </div>
})
export class BuildingComponent implements OnInit {
  mainLocation = MAIN_LOCATION;
  amenities = AMENITIES;
  buildingImage = BUILDING_IMAGE;
  showAmenities = false; 
   showGallery = false;

    // Gallery properties
  galleryImages = [
    '/assets/images/eno-ent.jpeg',
    '/assets/images/eno-enterance.jpeg',
    '/assets/images/front-apprtment.jpeg',
    '/assets/images/playground.png'
  ];
  selectedImage = this.galleryImages[0];

  // showAmenities = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleShowAmenities(): void {
    this.showAmenities = !this.showAmenities;
  }
   toggleShowGallery(): void {
    this.showGallery = !this.showGallery;
  }

  selectAmenity(amenity: Amenity): void {
    this.router.navigate(['/amenity', amenity.id]);
  }
  
  selectImage(img: string): void {
    // this.selectedImage = img;
    this.router.navigate(['/gallery-image'], { queryParams: { img } });
  }

  goBack(): void {
    this.router.navigate(['/location']);
  }

  navigateToAmenity(): void {
    if (this.amenities.length > 0) {
      this.selectAmenity(this.amenities[0]);
    }
  }
}
