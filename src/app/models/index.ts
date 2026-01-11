export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category?: string;
  icon?: string;
  totalUnits?: number;
  description?: string;
}

// export interface Amenity {
//   id: string;
//   name: string;
//   icon: string;
//   position: {
//     x: number;
//     y: number;
//   };
//   description: string;
//   image360: string;
// }

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  image360: string; // MUST be 360 panorama
  position: {
    x: number;
    y: number;
  };
}


export interface FilterCategory {
  id: string;
  name: string;
  icon: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}
