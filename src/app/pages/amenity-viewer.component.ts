import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
        <button class="back-btn" (click)="goBack()">← Back to Building</button>
        <span class="title" *ngIf="amenity">{{ amenity.name }} - 360° View</span>
      </div>

      <!-- 360 Viewer Container -->
      <div id="psvContainer" class="viewer-container">
        <!-- Fallback if viewer is loading or not browser -->
        <div *ngIf="!isViewerReady" class="loading-fallback">
          <div class="spinner"></div>
          <p>Loading 360° Panorama...</p>
        </div>
      </div>

      <!-- Bottom Info Panel -->
      <div class="info-panel" *ngIf="amenity">
        <div class="info-text">
          <h2>{{ amenity.icon }} {{ amenity.name }}</h2>
          <p>{{ amenity.description }}</p>
        </div>

        <div class="nav-controls">
          <button class="nav-btn" (click)="previousAmenity()" [disabled]="currentIndex === 0">
            ← Previous
          </button>
          <button class="nav-btn" (click)="nextAmenity()" [disabled]="currentIndex === amenities.length - 1">
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
      background: #0d0d0c;
      position: relative;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 70px;
      z-index: 10;
      display: flex;
      align-items: center;
      padding: 0 2rem;
      color: #fff;
      background: linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0));
    }

    .back-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 0.9rem;
      padding: 0.5rem 1.2rem;
      border-radius: 30px;
      cursor: pointer;
      margin-right: 1.5rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    }

    .back-btn:hover {
      background: #d4af37;
      border-color: #d4af37;
      color: #000;
      transform: translateX(-3px);
    }

    .title {
      font-size: 1.2rem;
      font-weight: 600;
      letter-spacing: 1px;
      color: #f3f3f3;
    }

    .viewer-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }

    .loading-fallback {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #111;
      color: #fff;
      z-index: 5;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      border-top-color: #d4af37;
      animation: spin 1s ease-in-out infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .info-panel {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 800px;
      z-index: 10;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      color: #fff;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .info-text {
      flex: 1;
    }

    .info-text h2 {
      font-size: 1.4rem;
      margin: 0 0 0.5rem 0;
      color: #d4af37;
      letter-spacing: 0.5px;
    }

    .info-text p {
      font-size: 0.9rem;
      color: #ccc;
      margin: 0;
      line-height: 1.5;
    }

    .nav-controls {
      display: flex;
      gap: 0.8rem;
    }

    .nav-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      padding: 0.6rem 1.2rem;
      cursor: pointer;
      border-radius: 30px;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .nav-btn:hover:not(:disabled) {
      background: rgba(212, 175, 55, 0.2);
      border-color: #d4af37;
      color: #d4af37;
      transform: translateY(-2px);
    }

    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .info-panel {
        flex-direction: column;
        align-items: stretch;
        bottom: 1rem;
        padding: 1.2rem;
        gap: 1.2rem;
      }
      .nav-controls {
        justify-content: space-between;
      }
      .header {
        padding: 0 1rem;
      }
    }
  `]
})
export class AmenityViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  amenities = AMENITIES;
  amenity!: Amenity;
  currentIndex = 0;
  viewer: any;
  isViewerReady = false;
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

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
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initViewer();
      }, 150);
    }
  }

  async initViewer(): Promise<void> {
    const container = document.getElementById('psvContainer');
    if (!container) return;

    try {
      const { Viewer } = await import('photo-sphere-viewer');
      this.viewer = new Viewer({
        container: container,
        panorama: this.amenity.image360,
        defaultLong: 0,
        defaultLat: 0,
        mousewheel: true,
        navbar: [
          'autorotate',
          'zoom',
          'fullscreen'
        ]
      });

      this.isViewerReady = true;
      setTimeout(() => this.resizeViewer(), 100);
    } catch (e) {
      console.error('Failed to load Photo Sphere Viewer:', e);
    }
  }

  changePanorama(): void {
    if (this.viewer) {
      this.viewer.setPanorama(this.amenity.image360, {
        longitude: 0,
        latitude: 0,
        zoom: 0
      }).then(() => {
        this.resizeViewer();
      });
    }
  }

  resizeViewer(): void {
    if (this.viewer) {
      this.viewer.resize();
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
    this.router.navigate(['/building']);
  }

  ngOnDestroy(): void {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }
}
