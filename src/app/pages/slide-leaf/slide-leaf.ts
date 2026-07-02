import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-leaf',
  imports: [CommonModule],
  templateUrl: './slide-leaf.html',
  styleUrl: './slide-leaf.css',
})
export class SlideLeaf {

  hoverTransform = '';
  // isBrowser: boolean;
  // baseX = 0;
  // baseY = 0;

  // constructor(@Inject(PLATFORM_ID) platformId: Object,private router: Router) {
  //   this.isBrowser = isPlatformBrowser(platformId);

  //   if (this.isBrowser) {
  //     this.baseX = window.innerWidth / 2;
  //     this.baseY = window.innerHeight / 2;
  //   }
  // }

  // onMouseMove(event: MouseEvent) {
  //   if (!this.isBrowser) return;

  //   const dx = event.clientX - this.baseX;
  //   const dy = event.clientY - this.baseY;
  //   const distance = Math.sqrt(dx * dx + dy * dy);

  //   if (distance < 200) {
  //     const offsetX = -(dx / distance) * 30;
  //     const offsetY = -(dy / distance) * 20;
  //     this.hoverTransform = `translate(${offsetX}px, ${offsetY}px)`;
  //   } else {
  //     this.resetLeaf();
  //   }
  // }

  // resetLeaf() {
  //   this.hoverTransform = '';
  // }

   navigateToLocation(): void {
    // this.showPopup = true;
    this.router.navigate(['/ongoinf']);
  }

   isBrowser: boolean;
  bgTransform = '';
  rainDrops = Array(80);

  constructor(@Inject(PLATFORM_ID) platformId: Object,private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 30;
    const y = (event.clientY / window.innerHeight - 0.5) * 30;

    this.bgTransform = `translate(${x}px, ${y}px) scale(1.05)`;
  }

  resetParallax() {
    this.bgTransform = 'translate(0,0) scale(1)';
  }
}
