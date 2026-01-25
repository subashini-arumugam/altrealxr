// import { isPlatformBrowser } from '@angular/common';
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import * as L from 'leaflet';

// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleMapsService {
//   private map: any;
//   private isBrowser: boolean;
//   private polyline: any = null;
//   private popup: any = null;
//   private markers: any[] = [];

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   /** Initialize map (SSR-safe) */
//   async loadGoogleMaps(container: string | HTMLElement, lat: number, lng: number, zoom: number): Promise<any> {
//     if (!this.isBrowser) return null;

//     // Lazy import Leaflet only on browser
//     const L = await import('leaflet');
//     const mapContainer = typeof container === 'string' ? document.getElementById(container) : container;

//   if (!mapContainer) {
//     throw new Error('Map container element not found');
//   }

//     this.map = L.map(mapContainer).setView([lat, lng], zoom);

//     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//     // attribution: 'Tiles &copy; Esri &mdash; Source: Esri, NASA, USGS',
//     maxZoom: 19
//   }).addTo(this.map);

//     // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     //   attribution: '&copy; OpenStreetMap contributors'
//     // }).addTo(this.map);

//     return this.map;
//   }

//   async createMainLocationMarker(lat: number, lng: number, title: string) {
//     const L = await import('leaflet');

//     const marker = L.marker([lat, lng], {
//       title,
//       icon: L.divIcon({
//         className: 'main-icon',
//         html: `
//           <div style="
//             width: 26px;
//             height: 26px;
//             background:#ff005e;
//             border:3px solid white;
//             border-radius:50%;
//             box-shadow:0 0 8px rgba(0,0,0,.5);
//           "></div>
//         `,
//         iconSize: [26, 26],
//         iconAnchor: [13, 13]
//       })
//     }).addTo(this.map);

//     this.markers.push(marker);
//     return marker;
//   }

//   /** Add marker */
//   async createMarker(
//     position: { lat: number; lng: number },
//     title: string,
//     color: string
//   ) {
//     const L = await import('leaflet');

//     const marker = L.marker([position.lat, position.lng], {
//       title,
//       icon: L.divIcon({
//         className: '',
//         html: `
//           <div style="
//             width: 18px;
//             height: 18px;
//             background:${color};
//             border-radius:50%;
//             border:2px solid white;
//           "></div>
//         `,
//         iconSize: [18, 18],
//         iconAnchor: [9, 9]
//       })
//     }).addTo(this.map);

//     this.markers.push(marker);
//     return marker;
//   }
//   /** POPUP */
//   // async openPopup(lat: number, lng: number, content: string) {
//   //   const L = await import('leaflet');

//   //   if (this.popup) this.map.closePopup(this.popup);

//   //   this.popup = L.popup({ closeOnClick: true })
//   //     .setLatLng([lat, lng])
//   //     .setContent(content)
//   //     .openOn(this.map);
//   // }

// async drawRoute(start: { lat: number; lng: number }, end: { lat: number; lng: number }) {
//   debugger
//   if (!this.map) return;
//   const L = await import('leaflet');
//   await import('leaflet-routing-machine');
//   if (this.polyline) {
//     (this.map as any).removeControl(this.polyline);
//   }

//   this.polyline = (L as any).Routing.control({
//     waypoints: [
//       L.latLng(start.lat, start.lng),
//       L.latLng(end.lat, end.lng)
//     ],
//     lineOptions: {
//       styles: [{ color: '#ce2669e3', weight: 4 }]
//     },
//     routeWhileDragging: false,
//     addWaypoints: false,
//     draggableWaypoints: false,
//     show: false
//   }).addTo(this.map);
// }



//    clearMarkers() {
//     if (!this.markers) return;
//     this.markers.forEach(m => m.remove());
//     this.markers = [];
//   }
//   /** Dummy Directions placeholders */
//   getDirectionsService(): null {
//     console.warn('Leaflet does not have DirectionsService. Use a plugin like Leaflet Routing Machine.');
//     return null;
//   }

//   getDirectionsRenderer(): null {
//     console.warn('Leaflet does not have DirectionsRenderer. Use a plugin like Leaflet Routing Machine.');
//     return null;
//   }
//   async createTitleBubbleMarker(lat: number, lng: number, label: string) {
//     debugger
//   const L = await import('leaflet');

//   const marker = L.marker([lat, lng], {
//     icon: L.divIcon({
//       className: 'title-bubble-marker',
//       html: `
//           <div class="bubble-circle">
//             ${label}
//           </div>
//       `,
//       iconSize: [120, 120],
//       iconAnchor: [60, 60] 
//     })
//   }).addTo(this.map);

//   this.markers.push(marker);
//   return marker;
// }
// setMap(map: any) {
//   this.map = map;
// }

// }


//2.changes

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private map: any;
  private markers: any[] = [];
  private polyline: any = null;
  private popup: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /** Initialize map */
  async loadGoogleMaps(container: HTMLElement, lat: number, lng: number, zoom: number) {
    if (!this.isBrowser) return;
    const L = await import('leaflet');

    this.map = L.map(container).setView([lat, lng], zoom);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19
    }).addTo(this.map);

    return this.map;
  }

  /** Main location marker */
  /** Main location marker (supports image icon) */
/** Main location marker with perfectly round image (no square background) */
/** Main location marker with LOCATION-PIN shape + image */
async createMainLocationMarker(
  lat: number,
  lng: number,
  title: string,
  iconUrl?: string
) {
  const L = await import('leaflet');

  const icon = iconUrl
    ? L.divIcon({
        className: 'main-location-pin',
        html: `
        <div style="
          width:35px;
          height:35px;
          position: relative;
          transform: rotate(-45deg);
          border-radius: 50% 50% 50% 0;
          background: white;
          border:2px solid #ff005e;
          box-shadow: 0 3px 8px rgba(0,0,0,0.4);
        ">
          <div style="
            width:28px;
            height:28px;
            border-radius:50%;
            overflow:hidden;
            position:absolute;
            top:4px;
            left:4px;
            transform: rotate(45deg);
            background:#fff;
          ">
            <img src="${iconUrl}"
              style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
          </div>
        </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      })
    : L.divIcon({
        className: '',
        html: `<div style="
          width:24px;height:24px;
          background:#ff005e;border-radius:50%;
          border:2px solid white;
        "></div>`,
        iconSize: [24,24],
        iconAnchor: [12,24]
      });

  const marker = L.marker([lat, lng], { title, icon }).addTo(this.map);
  this.markers.push(marker);
  return marker;
}



// async createMainLocationMarker(
//   lat: number,
//   lng: number,
//   title: string,
//   iconUrl?: string
// ) {
//   const L = await import('leaflet');

//   // If iconUrl is provided → use image icon
//   const icon = iconUrl
//     ? L.icon({
//         iconUrl: iconUrl,
//         iconSize: [50, 50],      // adjust size here
//         iconAnchor: [25, 50],    // bottom center anchor
//         popupAnchor: [0, -50]
//       })
//     : L.divIcon({
//         className: '',
//         html: `<div style="
//           width:28px;height:28px;
//           background:#ff005e;border-radius:50%;
//           border:3px solid white;
//           box-shadow:0 0 8px rgba(0,0,0,0.5);
//         "></div>`,
//         iconSize: [28,28],
//         iconAnchor: [14,28]
//       });

//   const marker = L.marker([lat, lng], {
//     title,
//     icon
//   }).addTo(this.map);

//   this.markers.push(marker);
//   return marker;
// }

  // async createMainLocationMarker(lat: number, lng: number, title: string,iconUrl?: string) {
  //   const L = await import('leaflet');
  //   const marker = L.marker([lat, lng], {
  //     title,
  //     icon: L.divIcon({
  //       className: '',
  //       html: `<div style="
  //         width:28px;height:28px;
  //         background:#ff005e;border-radius:50%;
  //         border:3px solid white;
  //         box-shadow:0 0 8px rgba(0,0,0,0.5);
  //       "></div>`,
  //       iconSize: [28,28],
  //       iconAnchor: [14,28]
  //     })
  //   }).addTo(this.map);

  //   this.markers.push(marker);
  //   return marker;
  // }

  /** Nearby location marker with blinking + category color + icon */

/** Nearby location marker with category color + IMAGE or EMOJI icon */
async createMarker(
  position: {lat:number,lng:number},
  title: string,
  color: string,
  icon: string   // can be emoji OR image path
) {
  const L = await import('leaflet');

  // Detect if icon is an image path
  const isImage = icon.includes('/') || icon.includes('.');

  const marker = L.marker([position.lat, position.lng], {
    title,
    icon: L.divIcon({
      className: '',
      html: `
      <div class="blinking-marker" style="
        width:32px;height:32px;
        background:${color};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        position:relative;
        border:2px solid white;
        box-shadow:0 0 6px rgba(0,0,0,0.5);
      ">
        <div style="
          position:absolute;
          width:18px;height:18px;
          background:white;
          border-radius:50%;
          top:7px;left:7px;
        "></div>

        ${
          isImage
          ? `<img src="${icon}" style="
              position:absolute;
              width:16px;height:16px;
              top:8px;left:8px;
              transform:rotate(45deg);
              border-radius:50%;
              object-fit:cover;
            " />`
          : `<span style="
              position:absolute;
              transform:rotate(45deg);
              top:6px;left:6px;
              font-size:14px;
            ">${icon}</span>`
        }
      </div>
      <style>
      .blinking-marker {
  animation: blink 3s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
 </style>
      `,
      iconSize: [32,32],
      iconAnchor: [16,32]
    })
  }).addTo(this.map);

  this.markers.push(marker);
  return marker;
}





  // async createMarker(position: {lat:number,lng:number}, title: string, color: string, iconText: string) {
  //   const L = await import('leaflet');

  //   const marker = L.marker([position.lat, position.lng], {
  //     title,
  //     icon: L.divIcon({
  //       className: '',
  //       html: `
  //       <div style="
  //         width:25px;height:25px;
  //         background:${color};
  //         border-radius:50% 50% 50% 0;
  //         transform:rotate(-45deg);
  //         position:relative;
  //         border:2px solid white;
  //         box-shadow:0 0 6px rgba(0,0,0,0.5);
  //         animation:pinblink 1s infinite;
  //       ">
  //         <div style="
  //           position:absolute;width:14px;height:14px;
  //           background:white;border-radius:50%;
  //           top:8px;left:8px;"></div>
  //         <span style="
  //           position:absolute;transform:rotate(45deg);
  //           top:6px;left:6px;font-size:14px;">${iconText}</span>
  //       </div>
  //       <style>
  //         @keyframes pinblink {
  //           0%,100% { transform:rotate(-45deg) scale(1); opacity:1; }
  //           50% { transform:rotate(-45deg) scale(1.3); opacity:0.5; }
  //         }
  //       </style>
  //       `,
  //       iconSize: [34,34],
  //       iconAnchor: [17,34]
  //     })
  //   }).addTo(this.map);

  //   this.markers.push(marker);
  //   return marker;
  // }

  /** Draw dotted line route using Leaflet Routing Machine */
  // async drawRoute(start: {lat:number,lng:number}, end: {lat:number,lng:number}) {
  //   if (!this.map) return;
  //   const L = await import('leaflet');
  //   await import('leaflet-routing-machine');

  //   if (this.polyline) {
  //     (this.map as any).removeControl(this.polyline);
  //   }

  //   this.polyline = (L as any).Routing.control({
  //     waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
  //     lineOptions: { styles:[{color:'#ce2669e3',weight:4,dashArray:'5,10'}] },
  //     routeWhileDragging: false,
  //     addWaypoints: false,
  //     draggableWaypoints: false,
  //     show: false
  //   }).addTo(this.map);
  // }

  
async drawRoute(start: { lat: number; lng: number }, end: { lat: number; lng: number }) {
  debugger
  if (!this.map) return;
  const L = await import('leaflet');
  await import('leaflet-routing-machine');
  if (this.polyline) {
    (this.map as any).removeControl(this.polyline);
  }

  this.polyline = (L as any).Routing.control({
    waypoints: [
      L.latLng(start.lat, start.lng),
      L.latLng(end.lat, end.lng)
    ],
    lineOptions: {
      styles: [{ color: '#ce2669e3', weight: 4 }]
    },
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    show: false
  }).addTo(this.map);
}

  /** Bubble marker with dotted line */
  async createTitleBubbleMarker(lat:number,lng:number,label:string, icon:string){
    const L = await import('leaflet');

    const marker = L.marker([lat,lng], {
      icon: L.divIcon({
        className:'',
        html: `
          <div style="
            width:100px;height:100px;
            background:rgba(0,0,0,0.6);
            border-radius:50%;
            color:#fff;font-weight:bold;
            text-align:center;line-height:100px;
            font-size:14px;
            border:2px solid #fff;
          ">${icon} ${label}</div>
        `,
        iconSize:[100,100],
        iconAnchor:[50,50]
      })
    }).addTo(this.map);

    this.markers.push(marker);
    return marker;
  }

  // clearMarkers() {
  //   this.markers.forEach(m => m.remove());
  //   this.markers = [];
  //   this.markers = [];
  // }
     clearMarkers() {
    if (!this.markers) return;
    this.markers.forEach(m => m.remove());
    this.markers = [];
  }
  setMap(map: any) {
  this.map = map;
}
 /** Dummy Directions placeholders */
  getDirectionsService(): null {
    console.warn('Leaflet does not have DirectionsService. Use a plugin like Leaflet Routing Machine.');
    return null;
  }

  getDirectionsRenderer(): null {
    console.warn('Leaflet does not have DirectionsRenderer. Use a plugin like Leaflet Routing Machine.');
    return null;
  }
    async openPopup(lat: number, lng: number, content: string) {
    const L = await import('leaflet');

    if (this.popup) this.map.closePopup(this.popup);

    this.popup = L.popup({ closeOnClick: true })
      .setLatLng([lat, lng])
      .setContent(content)
      .openOn(this.map);
  }
}


