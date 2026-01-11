import { Location, Amenity, FilterCategory } from '../models';

export const MAIN_LOCATION: Location = {
  id: 'main',
  name: 'DRA Homes - Velachery',
  address: 'No. 254, Velachery Main Road, Thanthai Periyar Nagar, Pallikaranai, Kaivelli',
  latitude: 12.96326,
  longitude: 80.21574,
  totalUnits: 271,
  description: 'Old Mamallapuram Rd, opp. Sipcot II Park, Sriuseri, Chennai, Tamil Nadu 603 103'
};

export const NEARBY_LOCATIONS: Location[] = [
  // Health
  {
    id: 'health-1',
    name: 'Kamachi Hospital',
    category: 'Health',
    latitude: 12.94963,
    longitude: 80.20917,
    icon: '🏥',
    address: 'Nearby Hospital'
  },
  {
    id: 'health-2',
    name: 'Sarawathi Hospital',
    category: 'Health',
    latitude: 12.96590,
    longitude: 80.20668,
    icon: '🏥',
    address: 'Nearby Hospital'
  },
  // Education
  {
    id: 'edu-1',
    name: 'Sri Ramakrishna School',
    category: 'Education',
    latitude: 13.04349,
    longitude: 80.26464,
    icon: '🎓',
    address: 'Educational Institution'
  },
  {
    id: 'edu-2',
    name: 'Anna University',
    category: 'Education',
    latitude: 13.01243,
    longitude: 80.23677,
    icon: '🎓',
    address: 'Educational Institution'
  },
  // Entertainment
  {
    id: 'ent-1',
    name: 'Viraa Mall',
    category: 'Entertainment',
    latitude: 12.85051,
    longitude: 80.22620,
    icon: '🎬',
    address: 'Shopping Mall'
  },
  {
    id: 'ent-2',
    name: 'Marina Mall',
    category: 'Entertainment',
    latitude: 12.83590,
    longitude: 80.22886,
    icon: '🎬',
    address: 'Shopping Mall'
  },
  // Landmarks
  {
    id: 'land-1',
    name: 'Thalambur Junction',
    category: 'Landmarks',
    latitude: 12.84707,
    longitude: 80.19988,
    icon: '🏛️',
    address: 'Landmark'
  },
  {
    id: 'land-2',
    name: 'SIPCOT ARCH',
    category: 'Landmarks',
    latitude: 12.95443,
    longitude: 80.91504,
    icon: '🏛️',
    address: 'Landmark'
  },
  // Transportation
  {
    id: 'trans-1',
    name: 'ST.Mount Metro Station',
    category: 'Transportation',
    latitude: 13.00195,
    longitude: 80.19893,
    icon: '🚇',
    address: 'Metro Station'
  },
  {
    id: 'trans-2',
    name: 'Velachery Railway Station',
    category: 'Transportation',
    latitude: 12.96731,
    longitude: 80.21930,
    icon: '🚂',
    address: 'Railway Station'
  },
  {
    id: 'trans-3',
    name: 'Airport',
    category: 'Transportation',
    latitude: 12.99509,
    longitude: 80.2460,
    icon: '✈️',
    address: 'Airport'
  },
  {
    id: 'trans-4',
    name: ' ',
    category: 'Transportation',
    latitude: 12.91242,
    longitude: 79.39805,
    icon: '🛣️',
    address: 'Highway'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'amenity-1',
    name: 'Entrance',
    icon: '🏠',
    position: { x: 65, y: 89.5 },
    description: 'Professional basketball court with proper lighting',
    image360: '/assets/images/eno-ent.jpeg'
  },
  {
    id: 'amenity-2',
    name: 'Park',
    icon: '🎾',
    position: { x: 10, y: 60 },
    description: 'Dedicated pickle ball court',
    image360: '/assets/images/eno-park.jpeg'
  },
  // {
  //   id: 'amenity-3',
  //   name: 'Kids Play Area',
  //   icon: '🎪',
  //   position: { x: 36.1, y: 51 },
  //   description: 'Safe and fun play area for children',
  //   image360: '/assets/amenities/kids-play-area-360.jpg'
  // },
  // {
  //   id: 'amenity-4',
  //   name: 'Indoor Game',
  //   icon: '🎮',
  //   position: { x: 62.7, y: 23 },
  //   description: 'Indoor gaming and recreation zone',
  //   image360: '/assets/amenities/indoor-game-360.jpg'
  // },
  // {
  //   id: 'amenity-5',
  //   name: 'Co-Working Zone',
  //   icon: '💼',
  //   position: { x: 69, y: 23 },
  //   description: 'Modern co-working space for professionals',
  //   image360: '/assets/amenities/coworking-zone-360.jpg'
  // },
  // {
  //   id: 'amenity-6',
  //   name: 'Gym',
  //   icon: '💪',
  //   position: { x: 76.2, y: 23.1 },
  //   description: 'Fully equipped fitness center',
  //   image360: '/assets/amenities/gym-360.jpg'
  // },
  // {
  //   id: 'amenity-7',
  //   name: 'Multipurpose Hall',
  //   icon: '🎤',
  //   position: { x: 83.5, y: 33 },
  //   description: 'Versatile hall for events and gatherings',
  //   image360: '/assets/amenities/multipurpose-hall-360.jpg'
  // },
  // {
  //   id: 'amenity-8',
  //   name: 'Swimming Pool',
  //   icon: '🏊',
  //   position: { x: 81.5, y: 24.5 },
  //   description: 'Olympic-size swimming pool',
  //   image360: '/assets/amenities/swimming-pool-360.jpg'
  // },
  // {
  //   id: 'amenity-9',
  //   name: 'Party Deck',
  //   icon: '🎉',
  //   position: { x: 74, y: 39.8 },
  //   description: 'Rooftop party venue with panoramic views',
  //   image360: '/assets/amenities/party-deck-360.jpg'
  // },
  // {
  //   id: 'amenity-10',
  //   name: 'Outdoor Gym',
  //   icon: '🏃',
  //   position: { x: 58.8, y: 28.7 },
  //   description: 'Open-air fitness equipment',
  //   image360: '/assets/amenities/outdoor-gym-360.jpg'
  // },
  // {
  //   id: 'amenity-11',
  //   name: 'BBQ Counter',
  //   icon: '🍖',
  //   position: { x: 68.4, y: 30.7 },
  //   description: 'Outdoor barbecue and dining area',
  //   image360: '/assets/amenities/bbq-counter-360.jpg'
  // },
  // {
  //   id: 'amenity-12',
  //   name: 'Senior Citizen Zone',
  //   icon: '👴',
  //   position: { x: 60.9, y: 31.7 },
  //   description: 'Dedicated area for senior citizens',
  //   image360: '/assets/amenities/senior-citizen-zone-360.jpg'
  // },
  // {
  //   id: 'amenity-13',
  //   name: 'Seating Area',
  //   icon: '🪑',
  //   position: { x: 52.5, y: 29.5 },
  //   description: 'Comfortable seating and relaxation area',
  //   image360: '/assets/amenities/seating-area-360.jpg'
  // }
];

export const MAP_FILTER_CATEGORIES: FilterCategory[] = [
  { id: 'landmarks', name: 'Landmarks', icon: '🏛️' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'health', name: 'Health', icon: '🏥' }
];

export const TRANSPORTATION_CATEGORIES: FilterCategory[] = [
  { id: 'airport', name: 'Airport', icon: '✈️' },
  { id: 'railway', name: 'Railway Station', icon: '🚂' },
  { id: 'metro', name: 'Metro', icon: '🚇' },
  { id: 'highway', name: 'Highway', icon: '🛣️' }
];

export const BUILDING_IMAGE = 'assets/images/eno-enterance.jpeg';

