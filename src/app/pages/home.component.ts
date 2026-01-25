// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { GoogleMapComponent } from '../components/google-map.components';
// import { MAIN_LOCATION } from '../constants/data';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, GoogleMapComponent],
//   template: `
//     <div class="home-container">

//       <div class="header">
//         <div class="header-left">
//           <div class="logo">Elephantine Enormous</div>
//           <span class="city">Chennai</span>
//         </div>
//       </div>

//       <app-google-map
//         [initialCenter]="{ lat: mainLocation.latitude, lng: mainLocation.longitude }"
//         [initialZoom]="zoomLevel"
//         (mapReady)="onMapReady($event)">
//       </app-google-map>

//       <div class="zoom-controls">
//         <button class="zoom-btn" (click)="zoomIn()">+</button>
//         <div class="zoom-level">{{ zoomLevel }}</div>
//         <button class="zoom-btn" (click)="zoomOut()">−</button>
//       </div>

//     </div>
//   `,
//   styles: [`

// .home-container {
//   position: relative;
//   width: 100%;
//   height: 100vh;
// }

// .header {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 100;
//   padding: 1rem;
//   background: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
//   display: flex;
// }

// .logo { color: #fff; font-size: 20px; font-weight: bold; }
// .city { color: #aaa; margin-left: 10px; }

// .zoom-controls {
//   position: absolute;
//   right: 1rem;
//   bottom: 6rem;
//   z-index: 1000;
// }

// .zoom-btn {
//   width: 40px;
//   height: 40px;
//   margin-bottom: 6px;
//   border: none;
//   cursor: pointer;
// }

// .zoom-level {
//   color: white;
//   text-align: center;
//   margin-bottom: 6px;
// }

// /* ============================= */
// /* MAIN LOCATION MARKER STYLES */
// /* ============================= */

// .main-location-icon {
//   background: none !important;
//   border: none !important;
// }

// .main-location-wrapper {
//   position: relative;
//   width: 200px;
//   height: 200px;
// }

// /* Pink pin */
// .main-pin {
//   position: absolute;
//   bottom: 0;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 26px;
//   height: 26px;
//   background: #ff005e;
//   border: 3px solid #fff;
//   border-radius: 50%;
//   box-shadow: 0 0 8px rgba(0,0,0,.5);
// }

// /* dotted line */
// .pin-line {
//   position: absolute;
//   bottom: 26px;
//   left: 50%;
//   transform: translateX(-50%);
//   height: 70px;
//   border-left: 2px dotted white;
// }

// /* bubble button */
// .pin-bubble {
//   position: absolute;
//   bottom: 100px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: white;
//   color: black;
//   padding: 8px 14px;
//   border-radius: 20px;
//   font-weight: 600;
//   font-size: 13px;
//   white-space: nowrap;
//   box-shadow: 0 4px 6px rgba(0,0,0,.4);
//   cursor: pointer;
// }

// .pin-bubble:hover {
//   background: #f0f0f0;
// }

//   `]
// })
// export class HomeComponent implements OnInit {

//   mainLocation = MAIN_LOCATION;
//   zoomLevel = 13;
//   map!: L.Map;
//   mainMarker!: L.Marker;

//   constructor(private router: Router) {}

//   ngOnInit(): void {}

//   onMapReady(map: L.Map): void {
//     this.map = map;
//     this.addMainLocationMarker();
//   }

//   async addMainLocationMarker() {
//     const L = await import('leaflet');

//     const html = `
//       <div class="main-location-wrapper">
//         <div class="main-pin"></div>
//         <div class="pin-line"></div>
//         <div class="pin-bubble" onclick="window.location.href='/location'">
//           Elephantine Enormous
//         </div>
//       </div>
//     `;

//     const icon = L.divIcon({
//       className: 'main-location-icon',
//       html,
//       iconSize: [200, 200],
//       iconAnchor: [100, 180]
//     });

//     this.mainMarker = L.marker(
//       [this.mainLocation.latitude, this.mainLocation.longitude],
//       { icon }
//     ).addTo(this.map);
//   }

//   zoomIn() {
//     this.zoomLevel++;
//     this.map.setZoom(this.zoomLevel);
//   }

//   zoomOut() {
//     this.zoomLevel--;
//     this.map.setZoom(this.zoomLevel);
//   }

// }




// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { Router } from '@angular/router';
// // import { GoogleMapComponent } from '../components/google-map.components';
// // import { MAIN_LOCATION } from '../constants/data';
// // // import * as L from 'leaflet';
// // import { isPlatformBrowser } from '@angular/common';
// // import { Inject, PLATFORM_ID } from '@angular/core';
// // // import { GoogleMapComponent } from '../components/google-map.component';
// // // import { MAIN_LOCATION } from '../constants/data';

// // @Component({
// //   selector: 'app-home',
// //   standalone: true,
// //   imports: [CommonModule, GoogleMapComponent],
// //   template: `
// //     <div class="home-container">
// //       <!-- Header -->
   
// //       <div class="header">
// //         <div class="header-left">
// //           <div class="logo">Elephantine Enormous</div>
// //           <span class="city">Chennai</span>
// //         </div>
// //       </div>

// //       <!-- Map Container -->
// //       <app-google-map
// //         [initialCenter]="{ lat: mainLocation.latitude, lng: mainLocation.longitude }"
// //         [initialZoom]="zoomLevel"
// //         (mapReady)="onMapReady($event)"
// //       ></app-google-map>

// //       <!-- Zoom Controls -->
// //       <div class="zoom-controls">
// //         <button class="zoom-btn" (click)="zoomIn()">+</button>
// //         <div class="zoom-level">{{ zoomLevel }}</div>
// //         <button class="zoom-btn" (click)="zoomOut()">−</button>
// //       </div>

// //       <!-- I HEART Button -->
// // <div class="iheart-button">
// //         <button class="btn-iheart" (click)="navigateToLocation()">
// //           <span class="text">Elephantine Enormous</span>
// //         </button>
// // </div>
// // <div class="cloud-layer cloud-top"></div>
// //     </div>
// //   `,
// //   // <div class="header-right">
// //   //         <button class="nav-btn">Menu</button>
// //   //         <button class="nav-btn">Login</button>
// //   //       </div>
// //   styles: [`
// //     .home-container {
// //       position: relative;
// //       width: 100%;
// //       height: 100vh;
// //       background-color: #000;
// //       overflow: hidden;
// //     }
// //    .map-container { z-index: 1; }
// //     .header {
// //       position: absolute;
// //       top: 0;
// //       left: 0;
// //       right: 0;
// //       z-index: 100;
// //       background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
// //       padding: 1rem;
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: center;
// //     }

// //     .header-left {
// //       display: flex;
// //       align-items: center;
// //       gap: 0.5rem;
// //     }

// //     .logo {
// //       font-size: 1.5rem;
// //       font-weight: bold;
// //       color: #fff;
// //     }

// //     .city {
// //       font-size: 0.875rem;
// //       color: #999;
// //     }

// //     .header-right {
// //       display: flex;
// //       gap: 1rem;
// //     }

// //     .nav-btn {
// //       padding: 0.5rem 1rem;
// //       font-size: 0.875rem;
// //       color: #999;
// //       background: none;
// //       border: none;
// //       cursor: pointer;
// //       transition: color 0.3s;
// //     }

// //     .nav-btn:hover {
// //       color: #fff;
// //     }

// //     .zoom-controls {
// //       position: absolute;
// //       bottom: 8rem;
// //       right: 1rem;
// //       z-index: 1000;
// //       display: flex;
// //       flex-direction: column;
// //       gap: 0.5rem;
// //     }

// //     .zoom-btn {
// //       width: 2.5rem;
// //       height: 2.5rem;
// //       padding: 0;
// //       background-color: #fff;
// //       border: none;
// //       border-radius: 0.25rem;
// //       color: #000;
// //       font-size: 1.25rem;
// //       cursor: pointer;
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       transition: background-color 0.2s;
// //     }

// //     .zoom-btn:hover {
// //       background-color: #f0f0f0;
// //     }

// //     .zoom-level {
// //       text-align: center;
// //       color: #fff;
// //       font-size: 0.75rem;
// //       background-color: rgba(0, 0, 0, 0.5);
// //       padding: 0.25rem 0.5rem;
// //       border-radius: 0.25rem;
// //     }

// //     .iheart-button {
// //       position: absolute;
// //       bottom: 2rem;
// //       left: 50%;
// //       transform: translateX(-50%);
// //       z-index: 20;
// //     }

// //     .btn-iheart {
// //       background-color: #fff;
// //       color: #000;
// //       padding: 1rem 2rem;
// //       border: none;
// //       border-radius: 2rem;
// //       font-size: 1rem;
// //       font-weight: 600;
// //       cursor: pointer;
// //       display: flex;
// //       align-items: center;
// //       gap: 0.5rem;
// //       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
// //       transition: background-color 0.2s;
// //     }

// //     .btn-iheart:hover {
// //       background-color: #f0f0f0;
// //     }

// //     .heart {
// //       font-size: 1.5rem;
// //     }
 
// // /* Base style for all clouds */
// // .cloud-layer {
// //   position: absolute;
// //   left: -200%; /* start far left */
// //   width: 300%; /* long enough to loop */
// //   height: 150px;
// //   background-repeat: repeat-x;
// //   background-size: contain;
// //   pointer-events: none;
// //   z-index: 500; /* above map but below header/buttons */
// // }

// // /* Top clouds */
// // .cloud-top {
// //   top: 2rem;
// //   background-image: url('/assets/images/Dramatic-Fog-Cloud-Over-Mountain-Peaks-PNG.png');
// //   opacity: 0.6;
// //   animation: moveCloudsTop 120s linear infinite;
// // }


// // /* Animations */
// // @keyframes moveCloudsTop {
// //   0% { transform: translateX(0); }
// //   100% { transform: translateX(100%); }
// // }
// // .main-location-icon {
// //   background: none !important;
// //   border: none !important;
// // }

// // .main-location-wrapper {
// //   position: relative;
// //   width: 200px;
// //   height: 200px;
// //   pointer-events: auto;
// // }

// // /* Circle Pin */
// // .main-pin {
// //   position: absolute;
// //   bottom: 0;
// //   left: 50%;
// //   transform: translateX(-50%);
// //   width: 26px;
// //   height: 26px;
// //   background: #ff005e;
// //   border: 3px solid white;
// //   border-radius: 50%;
// //   box-shadow: 0 0 8px rgba(0,0,0,0.5);
// //   z-index: 3;
// // }

// // /* Dotted Line */
// // .pin-line {
// //   position: absolute;
// //   bottom: 26px;
// //   left: 50%;
// //   transform: translateX(-50%);
// //   height: 60px;
// //   border-left: 2px dotted white;
// //   z-index: 2;
// // }

// // /* Bubble Button */
// // .pin-bubble {
// //   position: absolute;
// //   bottom: 86px;
// //   left: 50%;
// //   transform: translateX(-50%);
// //   background: white;
// //   color: black;
// //   padding: 8px 14px;
// //   border-radius: 20px;
// //   font-weight: 600;
// //   font-size: 13px;
// //   white-space: nowrap;
// //   box-shadow: 0 4px 6px rgba(0,0,0,0.4);
// //   z-index: 4;
// //   cursor: pointer;
// // }

// // /* Optional hover */
// // .pin-bubble:hover {
// //   background: #f2f2f2;
// // }

// //     `]
// // })
// // // <div class="fog-layer fog-top"></div>
// // //   <div class="fog-layer fog-bottom"></div>
// // //      /* CLOUD BASE STYLE */
// // // /* FOG BASE STYLE */
// // // .fog-layer {
// // //   position: absolute;
// // //   left: 0;
// // //   width: 300%;
// // //   height: 250px;
// // //   background-image: url('/assets/images/fog1.png'); /* your fog texture */
// // //   background-repeat: repeat-x;
// // //   background-size: cover;
// // //   opacity: 0.8; 
// // //   animation: fogMove 40s linear infinite;
// // //   pointer-events: none;
// // //   z-index: 9999; 
// // // }

// // // /* TOP FOG POSITION */
// // // .fog-top {
// // //   top: 0;

// // // }

// // // /* BOTTOM FOG POSITION */
// // // .fog-bottom {
// // //   bottom: 0;

// // // }

// // // /* MOVEMENT ANIMATION */
// // // @keyframes fogMove {
// // //   0% { transform: translateX(-20%); }
// // //   100% { transform: translateX(10%); }
// // // }
// // export class HomeComponent implements OnInit {
// //   mainLocation = MAIN_LOCATION;
// //   zoomLevel = 13;
// //   // map!: google.maps.Map;
// //   map!: L.Map;
// //   mainMarker!: L.Marker;

// //   constructor(private router: Router) {}

// //   ngOnInit(): void {}

// //   onMapReady(map: L.Map): void {
// //   this.map = map;
// //   this.addMainLocationMarker();
// // }

// // private async addMainLocationMarker(): Promise<void> {
// //   if (!this.map) return;
// //   const L = await import('leaflet');

// //   const html = `
// //     <div class="main-location-wrapper">
      
// //       <!-- Pin Circle -->
// //       <div class="main-pin"></div>

// //       <!-- Dotted line -->
// //       <div class="pin-line"></div>

// //       <!-- Button Bubble -->
// //       <div class="pin-bubble">
// //         Elephantine Enormous
// //       </div>
// //     </div>
// //   `;

// //   const icon = L.divIcon({
// //     className: 'main-location-icon',
// //     html,
// //     iconSize: [200, 200],
// //     iconAnchor: [100, 180] 
// //   });

// //   this.mainMarker = L.marker(
// //     [this.mainLocation.latitude, this.mainLocation.longitude],
// //     { icon }
// //   ).addTo(this.map);
// // }

// // // private addMainLocationMarker(): void {
// // //     if (!this.map) return;

// // //     const L = require('leaflet');

// // //     const marker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude])
// // //       .addTo(this.map)
// // //       .bindPopup(`<div style="padding:0.5rem;"><strong>${this.mainLocation.name}</strong><br/>${this.mainLocation.address}</div>`)
// // //       .openPopup();

// // //     this.mainMarker = marker;
// // //   }

// //   zoomIn(): void {
// //     if (this.zoomLevel < 20) {
// //       this.zoomLevel++;
// //       this.map.setZoom(this.zoomLevel);
// //     }
// //   }

// //   zoomOut(): void {
// //     if (this.zoomLevel > 1) {
// //       this.zoomLevel--;
// //       this.map.setZoom(this.zoomLevel);
// //     }
// //   }

// //   navigateToLocation(): void {
// //     this.router.navigate(['/location']);
// //   }
// // }
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GoogleMapComponent } from '../components/google-map.components';
import { MAIN_LOCATION, NEARBY_LOCATIONS } from '../constants/data';
// import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GoogleMapComponent],
  template: `
    <div class="home-container">
      <!-- Header -->
      <div class="header">
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
      <div class="zoom-controls">
        <button class="zoom-btn" (click)="zoomIn()">+</button>
        <div class="zoom-level">{{ zoomLevel }}</div>
        <button class="zoom-btn" (click)="zoomOut()">−</button>
      </div>
 <!-- I HEART Button -->
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
        <div class="popup-modal">
          
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

      <!-- Cloud Layer -->
     <div class="cloud-container">
  <div class="cloud cloud1"></div>
  <div class="cloud cloud2"></div>
  <div class="cloud cloud3"></div>
</div>

    </div>
  `,
  //  <div class="cloud-layer cloud-top"></div>
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
    .separator {
      color: #999;
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
      /* Popup Modal Styles */
    .popup-overlay {
      position: fixed;
      inset: 0;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease-in-out;
      pointer-events: none;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .popup-modal {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 3rem 2.5rem;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
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
      border-bottom: 2px solid rgba(212, 175, 55, 0.3);
      padding-bottom: 1rem;
    }

    .popup-title {
      font-size: 2rem;
      font-weight: 700;
      color: #d4af37;
      letter-spacing: 0.15em;
      margin: 0;
      text-transform: uppercase;
    }

    .popup-content {
      text-align: center;
    }

    .popup-heading {
      font-size: 1.3rem;
      font-weight: 600;
      color: #fff;
      margin: 0 0 1rem 0;
      letter-spacing: 0.05em;
    }

    .popup-description {
      font-size: 0.9rem;
      color: #ccc;
      line-height: 1.6;
      margin: 0 0 1.5rem 0;
      text-align: justify;
    }

    .popup-social {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      background-color: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 50%;
      color: #d4af37;
      text-decoration: none;
      font-size: 1.2rem;
      transition: all 0.2s;
      cursor: pointer;
    }

    .social-icon:hover {
      background-color: rgba(212, 175, 55, 0.2);
      border-color: #d4af37;
      transform: translateY(-2px);
    }

    .cloud-container {
  position: absolute;
  top: 2rem;
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
  width: 200px;
  height: 100px;
  background-image: url('/assets/images/Dramatic-Fog-Cloud-Over-Mountain-Peaks-PNG.png');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.7;
  animation: moveCloud 50s linear infinite;
}

.cloud1 {
  left: -250px;
  animation-duration: 30s;
  animation-delay: 0s;
}

.cloud2 {
  left: -250px;
  top: 30px;
  animation-duration: 90s;
  animation-delay: 7s;
}

.cloud3 {
  left: -250px;
  top: 60px;
  animation-duration: 110s;
  animation-delay: 14s;
}

@keyframes moveCloud {
  0%   { transform: translateX(-250px); opacity: 0; }
  10%  { opacity: 0.7; }
  100% { transform: translateX(120vw); opacity: 0; }
}
  .elepha img {
  width: 28px;     /* adjust size */
  height: 28px;
  object-fit: contain;
}
  `]
})
  //  .cloud-layer {
  //     position: absolute;
  //     left: -200%;
  //     width: 300%;
  //     height: 150px;
  //     background-image: url('/assets/images/Dramatic-Fog-Cloud-Over-Mountain-Peaks-PNG.png');
  //     background-repeat: repeat-x;
  //     background-size: contain;
  //     pointer-events: none;
  //     z-index: 500;
  //   }

  //   .cloud-top {
  //     top: 2rem;
  //     opacity: 0.6;
  //     animation: moveCloudsTop 120s linear infinite;
  //   }

  //   @keyframes moveCloudsTop {
  //     0% { transform: translateX(0); }
  //     100% { transform: translateX(100%); }
  //   }
export class HomeComponent implements OnInit {
  mainLocation = MAIN_LOCATION;
    nearbyLocations = NEARBY_LOCATIONS;
  zoomLevel = 13;
  // map!: L.Map;
    map: any;
  mainMarker: any;
  locationLabelMarker: any;
  polyline: any;
 iheartMarker: any;
  nearbyMarkers: any[] = [];
  // showPopup = true;
   private isBrowser: boolean;


// constructor(private router: Router) {}
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

    ngOnInit(): void {}

   async onMapReady(map: any): Promise<void> {
    if (!this.isBrowser) return;

    this.map = map;
      // await this.addNearbyLocationMarkers();
    await this.addMainLocationMarker();
    // await this.addIHeartMarker();
    // await this.addLocationLabelButton();
    // await this.drawDottedLine();

  }
  
  // closePopup(): void {
  //   this.showPopup = false;
  // }

  ///3.

    private async addMainLocationMarker(): Promise<void> {
    if (!this.map) return;

    const L = await import('leaflet');

    // Create location pin icon
    const locationPinSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
        <defs>
          <style>
            .pin-fill { fill: #ff005e; }
            .pin-stroke { stroke: #fff; stroke-width: 1; }
          </style>
        </defs>
        <path class="pin-fill pin-stroke" d="M12 2C6.48 2 2 6.48 2 12c0 7 10 13 10 13s10-6 10-13c0-5.52-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
    `;

    const marker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude], {
      icon: L.divIcon({
        className: 'location-pin-marker',
        html: locationPinSvg,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      })
    }).addTo(this.map);

    marker.bindPopup(`
      <div style="padding: 0.75rem; font-family: Arial, sans-serif;">
        <strong style="font-size: 1rem; color: #ff005e;">${this.mainLocation.name}</strong>
        <br/>
        <span style="font-size: 0.85rem; color: #666;">${this.mainLocation.address}</span>
      </div>
    `);

    this.mainMarker = marker;
  }

  // private async addLocationLabelButton(): Promise<void> {
  //   if (!this.map) return;

  //   const L = await import('leaflet');

  //   // Create a small button with location name positioned offset from the main location
  //   const labelButtonHtml = `
  //     <div id="locationLabelBtn" style="
  //       background-color: #fff;
  //       padding: 0.5rem 1rem;
  //       border-radius: 1.5rem;
  //       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  //       font-size: 0.8rem;
  //       font-weight: 600;
  //       color: #000;
  //       white-space: nowrap;
  //       border: 1px solid #e0e0e0;
  //       cursor: pointer;
  //       transition: all 0.2s ease;
  //       width:135px;
  //     ">
  //       ${this.mainLocation.name}
  //     </div>
  //   `;

  //   // Position the button offset from the main location
  //   const offsetLat = this.mainLocation.latitude + 0.008;
  //   const offsetLng = this.mainLocation.longitude + 0.008;

  //   const labelMarker = L.marker([offsetLat, offsetLng], {
  //     icon: L.divIcon({
  //       className: 'location-label-marker',
  //       html: labelButtonHtml,
  //       iconSize: [150, 35],
  //       iconAnchor: [75, 17],
  //       popupAnchor: [0, -17]
  //     })
  //   }).addTo(this.map);

  //   this.locationLabelMarker = labelMarker;
  //    setTimeout(() => {
  //   const btn = document.getElementById('locationLabelBtn');
  //   if (btn) {
  //     btn.addEventListener('click', () => {
  //       this.navigateToLocation();
  //     });
  //   }
  // }, 0);
  // }
  //   private async drawDottedLine(): Promise<void> {
  //   if (!this.map || !this.mainMarker || !this.locationLabelMarker) return;

  //   const L = await import('leaflet');

  //   // Create a dotted line from main marker to label button
  //   const mainLatLng = this.mainMarker.getLatLng();
  //   const labelLatLng = this.locationLabelMarker.getLatLng();

  //   this.polyline = L.polyline([mainLatLng, labelLatLng], {
  //     color: '#d4af37',
  //     weight: 2,
  //     dashArray: '6, 4',
  //     opacity: 0.8,
  //     lineCap: 'round',
  //     lineJoin: 'round'
  //   }).addTo(this.map);
  // }


//2.
  //   private async addMainLocationMarker(): Promise<void> {
  //   if (!this.map) return;

  //   const L = await import('leaflet');

  //   // Create main location marker with white circle and red dot
  //   const mainIconHtml = `
  //     <div style="
  //       width: 32px;
  //       height: 32px;
  //       background-color: #fff;
  //       border: 3px solid #ff005e;
  //       border-radius: 50%;
  //       display: flex;
  //       align-items: center;
  //       justify-content: center;
  //       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  //       position: relative;
  //     ">
  //       <div style="
  //         width: 12px;
  //         height: 12px;
  //         background-color: #ff005e;
  //         border-radius: 50%;
  //       "></div>
  //     </div>
  //   `;

  //   const marker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude], {
  //     icon: L.divIcon({
  //       className: 'main-location-marker',
  //       html: mainIconHtml,
  //       iconSize: [32, 32],
  //       iconAnchor: [16, 16],
  //       popupAnchor: [0, -16]
  //     })
  //   }).addTo(this.map);

  //   marker.bindPopup(`
  //     <div style="padding: 0.75rem; font-family: Arial, sans-serif;">
  //       <strong style="font-size: 1rem; color: #ff005e;">${this.mainLocation.name}</strong>
  //       <br/>
  //       <span style="font-size: 0.85rem; color: #666;">${this.mainLocation.address}</span>
  //     </div>
  //   `);

  //   this.mainMarker = marker;
  // }

  // private async addIHeartMarker(): Promise<void> {
  //   if (!this.map) return;

  //   const L = await import('leaflet');

  //   // Create iHEART marker with heart icon and label
  //   const iheartIconHtml = `
  //     <div style="
  //       background-color: #fff;
  //       padding: 0.75rem 1.25rem;
  //       border-radius: 0.5rem;
  //       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  //       display: flex;
  //       align-items: center;
  //       gap: 0.5rem;
  //       font-weight: 600;
  //       font-size: 0.9rem;
  //       color: #000;
  //       white-space: nowrap;
  //       width:150px;
  //     ">
  //       <span>Elephantine Enormous</span>
  //     </div>
  //   `;

  //   const iheartMarker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude], {
  //     icon: L.divIcon({
  //       className: 'iheart-marker',
  //       html: iheartIconHtml,
  //       iconSize: [130, 45],
  //       iconAnchor: [65, 22],
  //       popupAnchor: [0, -22]
  //     })
  //   }).addTo(this.map);

  //   this.iheartMarker = iheartMarker;
  // }

  // private async addNearbyLocationMarkers(): Promise<void> {
  //   if (!this.map) return;

  //   const L = await import('leaflet');

  //   // Color mapping for different categories
  //   const categoryColors: { [key: string]: string } = {
  //     'Health': '#ff6b6b',
  //     'Education': '#ffd93d',
  //     'Entertainment': '#a78bfa',
  //     'Landmarks': '#4ecdc4'
  //   };

  //   this.nearbyLocations.forEach((location, index) => {
  //     const category = location.category || 'default';
  //     const color = categoryColors[category] || '#999';

  //     const markerIconHtml = `
  //       <div style="
  //         width: 24px;
  //         height: 24px;
  //         background-color: ${color};
  //         border: 2px solid #fff;
  //         border-radius: 50%;
  //         box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  //       "></div>
  //     `;

  //     const marker = L.marker([location.latitude, location.longitude], {
  //       icon: L.divIcon({
  //         className: 'nearby-location-marker',
  //         html: markerIconHtml,
  //         iconSize: [24, 24],
  //         iconAnchor: [12, 12],
  //         popupAnchor: [0, -12]
  //       })
  //     }).addTo(this.map);

  //     marker.bindPopup(`
  //       <div style="padding: 0.5rem; font-family: Arial, sans-serif;">
  //         <strong style="color: ${color};">${location.name}</strong>
  //         <br/>
  //         <span style="font-size: 0.8rem; color: #666;">${location.category}</span>
  //       </div>
  //     `);

  //     this.nearbyMarkers.push(marker);
  //   });
  // }

  // private async drawDottedLine(): Promise<void> {
  //   if (!this.map || !this.mainMarker || !this.iheartMarker) return;

  //   const L = await import('leaflet');

  //   // Create a dotted line from main marker to iHEART marker
  //   const mainLatLng = this.mainMarker.getLatLng();
  //   const iheartLatLng = this.iheartMarker.getLatLng();

  //   // Offset the iHEART position slightly for visual effect
  //   const offsetLatLng = L.latLng(
  //     mainLatLng.lat + 0.006,
  //     mainLatLng.lng + 0.006
  //   );

  //   this.polyline = L.polyline([mainLatLng, offsetLatLng], {
  //     color: '#f2f0e8',
  //     weight: 2,
  //     dashArray: '6, 4',
  //     opacity: 0.9,
  //     lineCap: 'round',
  //     lineJoin: 'round'
  //   }).addTo(this.map);
  // }


  //1.
  // private async drawDottedLine(): Promise<void> {
  //   if (!this.map) return;

  //   const L = await import('leaflet');

  //   // Create a dotted line from main location to a point slightly offset
  //   const mainLatLng = L.latLng(this.mainLocation.latitude, this.mainLocation.longitude);
  //   const offsetLatLng = L.latLng(
  //     this.mainLocation.latitude + 0.008,
  //     this.mainLocation.longitude + 0.008
  //   );

  //   // Draw the dotted line
  //   this.polyline = L.polyline([mainLatLng, offsetLatLng], {
  //     color: '#ff005e',
  //     weight: 3,
  //     dashArray: '8, 5',
  //     opacity: 0.9,
  //     lineCap: 'round',
  //     lineJoin: 'round'
  //   }).addTo(this.map);
  // }

  //  private async addMainLocationMarker(): Promise<void> {
  //   if (!this.map) return;

  //   const L = await import('leaflet');

  //   // Create SVG location icon
  //   const locationIconSvg = `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff005e" width="40" height="40">
  //       <path d="M12 2C6.48 2 2 6.48 2 12c0 7 10 13 10 13s10-6 10-13c0-5.52-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
  //     </svg>
  //   `;

  //   const marker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude], {
  //     icon: L.divIcon({
  //       className: 'location-marker',
  //       html: locationIconSvg,
  //       iconSize: [40, 40],
  //       iconAnchor: [20, 40],
  //       popupAnchor: [0, -40]
  //     })
  //   }).addTo(this.map);

  //   marker.bindPopup(`
  //     <div style="padding: 0.75rem; font-family: Arial, sans-serif;">
  //       <strong style="font-size: 1rem; color: #ff005e;">${this.mainLocation.name}</strong>
  //       <br/>
  //       <span style="font-size: 0.85rem; color: #666;">${this.mainLocation.address}</span>
  //     </div>
  //   `);

  //   this.mainMarker = marker;
  // }
  
  // private async addButtonMarker(): Promise<void> {
  //   if (!this.map) return;

  //   const L = await import('leaflet');

  //   // Create a custom button marker at the main location
  //   const buttonMarker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude], {
  //     icon: L.divIcon({
  //       className: 'button-marker',
  //       html: `
  //         <div style="
  //           background-color: #fff;
  //           color: #000;
  //           padding: 0.75rem 1.5rem;
  //           border: none;
  //           border-radius: 2rem;
  //           font-size: 0.875rem;
  //           font-weight: 600;
  //           cursor: pointer;
  //           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  //           white-space: nowrap;
  //           display: flex;
  //           align-items: center;
  //           justify-content: center;
  //           transition: all 0.2s ease;
  //         ">
  //           Explore
  //         </div>
  //       `,
  //       iconSize: [120, 40],
  //       iconAnchor: [60, 20],
  //       popupAnchor: [0, -20]
  //     })
  //   }).addTo(this.map);

  //   this.buttonMarker = buttonMarker;
  // }

  // private async addMainLocationMarker(): Promise<void> {
  //   if (!this.map) return;
  //   const L = await import('leaflet');

  //   const marker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude], {
  //     icon: L.divIcon({
  //       className: 'main-icon',
  //       html: `
  //         <div style="
  //           width: 26px;
  //           height: 26px;
  //           background:#ff005e;
  //           border:3px solid white;
  //           border-radius:50%;
  //           box-shadow:0 0 8px rgba(0,0,0,.5);
  //         "></div>
  //       `,
  //       iconSize: [26, 26],
  //       iconAnchor: [13, 13]
  //     })
  //   }).addTo(this.map);

  //   marker.bindPopup(`<div style="padding:0.5rem;"><strong>${this.mainLocation.name}</strong><br/>${this.mainLocation.address}</div>`);
  //   this.mainMarker = marker;
  // }

  // private async addButtonMarker(): Promise<void> {
  //   if (!this.map) return;

  //   const L = await import('leaflet');
  //   // Create a custom button marker at the main location
  //   const buttonMarker = L.marker([this.mainLocation.latitude, this.mainLocation.longitude], {
  //     icon: L.divIcon({
  //       className: 'button-marker',
  //       html: `
  //         <div style="
  //           background-color: #fff;
  //           color: #000;
  //           padding: 0.75rem 1.5rem;
  //           border: none;
  //           border-radius: 2rem;
  //           font-size: 0.875rem;
  //           font-weight: 600;
  //           cursor: pointer;
  //           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  //           white-space: nowrap;
  //           display: flex;
  //           align-items: center;
  //           justify-content: center;
  //         ">
  //           Explore
  //         </div>
  //       `,
  //       iconSize: [120, 40],
  //       iconAnchor: [60, 20],
  //       popupAnchor: [0, -20]
  //     })
  //   }).addTo(this.map);

  //   this.buttonMarker = buttonMarker;
  // }

  // private async drawDottedLine(): Promise<void> {
  //   if (!this.map || !this.mainMarker || !this.buttonMarker) return;

  //    const L = await import('leaflet');
  //   // Create a dotted line from main marker to button marker
  //   // Since they're at the same location, we'll create a line from the marker to a point slightly offset
  //   const mainLatLng = this.mainMarker.getLatLng();
  //   const offsetLatLng = L.latLng(mainLatLng.lat + 0.005, mainLatLng.lng + 0.005);

  //   this.polyline = L.polyline([mainLatLng, offsetLatLng], {
  //     color: '#d41958',
  //     weight: 2,
  //     dashArray: '5, 5',
  //     opacity: 0.7
  //   }).addTo(this.map);
  // }

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
    // this.showPopup = true;
    this.router.navigate(['/location']);
  }
}
