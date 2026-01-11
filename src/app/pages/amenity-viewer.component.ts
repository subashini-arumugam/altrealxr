import { Component, OnInit, OnDestroy,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Viewer } from 'photo-sphere-viewer';
import { HostListener } from '@angular/core';


import { AMENITIES } from '../constants/data';
import { Amenity } from '../models';

@Component({
  selector: 'app-amenity-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">

      <!-- Header -->
      <div class="header">
        <button class="back-btn" (click)="goBack()">←</button>
        <span class="title">360 View</span>
      </div>

      <!-- 360 Viewer -->
      <div id="psvContainer" class="viewer"></div>

      <!-- Bottom Info -->
      <div class="info" *ngIf="amenity">
        <div>
          <h2>{{ amenity.icon }} {{ amenity.name }}</h2>
          <p>{{ amenity.description }}</p>
        </div>

        <div class="nav">
          <button (click)="previousAmenity()" [disabled]="currentIndex === 0">
            ← Previous
          </button>
          <button (click)="nextAmenity()" [disabled]="currentIndex === amenities.length - 1">
            Next →
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
  .container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
  background: #000;
}


    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      z-index: 10;
      display: flex;
      align-items: center;
      padding: 1rem;
      color: #fff;
      background: rgba(0,0,0,0.4);  
    }

    .back-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      margin-right: 1rem;
    }

 .viewer {
      position: absolute;
      top: 60px;      /* same as header height */
      bottom: 120px;  /* same as info height */
      left: 0;
      right: 0;
    }

    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 120px;
      z-index: 10;
      background: rgba(0,0,0,0.75);
      color: #fff;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav button {
      background: #ec4899;
      border: none;
      color: #fff;
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 4px;
      margin-left: 0.5rem;
    }

    .nav button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]

  //    .viewer {
//   position: absolute; /* not fixed */
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: 1;
// }
})
export class AmenityViewerComponent implements OnInit, OnDestroy,AfterViewInit {

  amenities = AMENITIES;
  amenity!: Amenity;
  currentIndex = 0;
  viewer!: Viewer;

  isViewerReady = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['amenityId'];
      const found = this.amenities.find(a => a.id === id);

     if (!found) return;

      this.amenity = found;
      this.currentIndex = this.amenities.indexOf(found);
 if (this.isViewerReady) {
        this.changePanorama();
      }
    //    if (!this.isViewerReady) {
    //   setTimeout(() => this.initViewer(), 0);
    // } else {
    //   this.changePanorama();
    // }
    });
  }
  ngAfterViewInit(): void {
  setTimeout(() => {
    this.initViewer();
  }, 100); // small delay ensures full DOM layout
}

initViewer(): void {
  const container = document.getElementById('psvContainer')!;

  this.viewer = new Viewer({
    container,
    panorama: this.amenity.image360,
    defaultLong: 0,
    defaultLat: 0,
    mousewheel: true,
    navbar: []   // hide navbar correctly
  });

  this.isViewerReady = true;
  setTimeout(() => this.resizeViewer(), 50);
}



// initViewer(): void {
//   this.viewer = new Viewer({
//     container: document.getElementById('psvContainer')!,
//     panorama: this.amenity.image360,
//     defaultLong: 0,
//     defaultLat: 0,
//     mousewheel: true,
//     navbar: [] // ✅ correct way to hide navbar
//   });

//   this.isViewerReady = true;
//    setTimeout(() => this.resizeViewer(), 0);
// }

// @HostListener('window:resize')
// onResize() {
//   const container = document.getElementById('psvContainer');
//   if (container && this.viewer) {
//     this.viewer.resize({
//       width: container.clientWidth,
//       height: container.clientHeight
//     });
//   }
// }
  changePanorama(): void {
    if (this.viewer) {
      this.viewer.setPanorama(this.amenity.image360, {
        longitude: 0,
        latitude: 0,
        zoom: 0
      });
      setTimeout(() => this.resizeViewer(), 50);
    }
  }
  resizeViewer(): void {
  const container = document.getElementById('psvContainer');
  if (container && this.viewer) {
    this.viewer.resize({
      width: container.offsetWidth + 'px',
      height: container.offsetHeight + 'px'
    });
  }
}
  @HostListener('window:resize')
  onResize() {
    this.resizeViewer();
  }
  previousAmenity(): void {
    if (this.currentIndex > 0) {
      this.router.navigate(['/amenity', this.amenities[this.currentIndex - 1].id]);
    }
  }

  nextAmenity(): void {
    if (this.currentIndex < this.amenities.length - 1) {
      this.router.navigate(['/amenity', this.amenities[this.currentIndex + 1].id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }


//  resizeViewer(): void {
//   const container = document.getElementById('psvContainer');
//   if (container && this.viewer) {
//     this.viewer.resize({
//       width: container.clientWidth + 'px',
//       height: container.clientHeight + 'px'
//     });
//   }
// }


}

