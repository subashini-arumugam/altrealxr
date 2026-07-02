import { Injectable } from '@angular/core';
import { Location } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  /**
   * Calculate distance between two coordinates using Haversine formula
   * Returns distance in kilometers
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Filter locations by categories
   */
  filterLocationsByCategories(locations: Location[], selectedCategories: string[]): Location[] {
    if (selectedCategories.length === 0) {
      return [];
    }
    return locations.filter((location) =>
      location.category && selectedCategories.includes(location.category)
    );
  }

  /**
   * Get category color for map markers
   */
  getCategoryColor(category: string | undefined): string {
    const colorMap: Record<string, string> = {
      'Health': '#2f1414ff',
      'Education': '#3b82f6',
      'Entertainment': '#f59e0b',
      'Landmarks': '#8b5cf6',
      'Transportation': '#10b981'
    };
   return colorMap[category ?? ''] ?? '#6b7280';

  }
}
