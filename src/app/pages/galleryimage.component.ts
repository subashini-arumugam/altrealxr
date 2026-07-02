import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery-image',
  template: `
    <div class="gallery-image-page">
      <button class="back-btn" (click)="goBack()">← Back</button>
      <img [src]="imageUrl" alt="Gallery Image" class="full-image" />
    </div>
  `,
  styles: [`
    .gallery-image-page {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #000;
      overflow: hidden;
    }

    .back-btn {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: none;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 20;
    }

    .full-image {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 0.5rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }
  `]
})
export class GalleryImageComponent implements OnInit {
  imageUrl: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the image URL from route query parameter
    this.route.queryParams.subscribe(params => {
      this.imageUrl = params['img'] || '';
    });
  }

  goBack(): void {
    this.router.navigate(['/building']);
  }
}
