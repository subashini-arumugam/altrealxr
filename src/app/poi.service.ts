import { Injectable } from '@angular/core';

export type Category = 'landmark' | 'education' | 'entertainment' | 'health' | 'transportation';

export interface Poi {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: Category;
  description?: string;
}

@Injectable()
export class PoiService {
  // getNearbyPlaces() {
  //   throw new Error('Method not implemented.');
  // }
  // Sample POIs near Pallikaranai / Velachery (approx lat/lng). Replace with real data / API as needed.
  private pois: Poi[] = [
    { id: 'kamakshi', name: 'Dr. Kamakshi Memorial Hospital', lat: 12.9493, lng: 80.2090, category: 'health' },
    { id: 'kamatchi', name: 'Kamatchi Hospital', lat: 12.9378, lng: 80.2122, category: 'health' },
    { id: 'rail_velechery', name: 'Velachery Railway Station', lat: 12.9940, lng: 80.2100, category: 'transportation' }, // example
    { id: 'novotel', name: 'Novotel Chennai', lat: 12.9263, lng: 80.2215, category: 'landmark' },
    { id: 'vivira', name: 'Vivira Mall', lat: 12.9442, lng: 80.2140, category: 'entertainment' },
    { id: 'saraswathi', name: 'Saraswathi Hospital', lat: 12.9340, lng: 80.2135, category: 'health' },
    { id: 'tcservices', name: 'Tata Consultancy Services', lat: 12.9200, lng: 80.2050, category: 'education' } // sample
  ];

  getNearbyPlaces(): Poi[] {
    return this.pois;
  }
  getAll(): Poi[] {
    return this.pois.slice();
  }

  // return POIs only for selected categories
  getByCategories(categories: Category[]): Poi[] {
    if (!categories || categories.length === 0) return [];
    return this.pois.filter(p => categories.includes(p.category));
  }

  // Haversine distance in kilometers
  distanceInKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}
