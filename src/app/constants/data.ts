import { Location, Amenity, FilterCategory } from '../models';

export const MAIN_LOCATION: Location = {
  id: 'main',
  name: 'Elephantine Enormous',
  address: 'Kannapuram, Kolathur, Mambakkam, Tamil Nadu 600127',
  latitude: 12.81396,
  longitude: 80.16782,
  totalUnits: 271,
  description: 'Old Mamallapuram Rd, opp. Sipcot II Park, Sriuseri, Chennai, Tamil Nadu 603 103',
  icon:'/assets/images/elephantelogo.jpeg'
};


export const NEARBY_LOCATIONS: Location[] = [
  // Health
  {
    id: 'health-1',
    name: 'VITC Health Centre',
    category: 'Health',
    latitude: 12.84174,
    longitude: 80.15657,
    icon: '/assets/images/health.jpeg',
    address: 'Nearby Hospital'
  },
  {
    id: 'health-2',
    name: 'Chettinad Hospital And Research Institute',
    category: 'Health',
    latitude: 12.79873,
    longitude: 80.21960,
    icon: '/assets/images/health.jpeg',
    address: 'Nearby Hospital'
  },
  {
    id: 'health-3',
    name: 'Global Hospitals & Health City',
    category: 'Health',
    latitude: 12.89808,
    longitude: 80.20569,
    icon: '/assets/images/health.jpeg',
    address: 'Nearby Hospital'
  },
  // Education
  {
    id: 'edu-1',
    name: 'Velammal Global School Polachery Velammal Vidhyashram Mambakkam',
    category: 'Education',
    latitude: 13.82826,
    longitude: 80.16625,
    icon: '/assets/images/education.jpeg',
    address: 'Educational Institution'
  },
  {
    id: 'edu-2',
    name: 'SBIOA International School',
    category: 'Education',
    latitude: 13.83753,
    longitude: 80.17525,
    icon: '/assets/images/education.jpeg',
    address: 'Educational Institution'
  },
   {
    id: 'edu-2',
    name: 'TATVA School',
    category: 'Education',
    latitude: 13.84289,
    longitude: 80.17838,
    icon: '/assets/images/education.jpeg',
    address: 'Educational Institution'
  },
  // Entertainment
  {
    id: 'ent-1',
    name: 'VANDALUR zoo',
    category: 'Entertainment',
    latitude: 12.87954,
    longitude: 80.08191,
    icon: '/assets/images/entertainment.jpeg',
    address: 'Shopping Mall'
  },
  {
    id: 'ent-2',
    name: 'MGM Dizzee World',
    category: 'Entertainment',
    latitude: 12.82932,
    longitude: 80.23991,
    icon: '/assets/images/entertainment.jpeg',
    address: 'Shopping Mall'
  },
   {
    id: 'ent-2',
    name: 'Thaiyur mini waterfall',
    category: 'Entertainment',
    latitude: 12.78099,
    longitude: 80.18887,
    icon: '/assets/images/entertainment.jpeg',
    address: 'Shopping Mall'
  },
  // Landmarks
  {
    id: 'land-1',
    name: 'Sipcot siruseri',
    category: 'Landmarks',
    latitude: 12.83399,
    longitude: 80.22861,
    icon: '/assets/images/workspace.jpeg',
    address: 'Landmark'
  },
  {
    id: 'land-2',
    name: 'ETA TECHNO PARK',
    category: 'Landmarks',
    latitude: 12.85158,
    longitude: 80.22257,
    icon: '/assets/images/workspace.jpeg',
    address: 'Landmark'
  },
  {
    id: 'land-2',
    name: '  Elcot Sez',
    category: 'Landmarks',
    latitude: 12.90678,
    longitude: 80.22388,
    icon: '/assets/images/workspace.jpeg',
    address: 'Landmark'
  },

  // Transportation
  // {
  //   id: 'trans-1',
  //   name: 'ST.Mount Metro Station',
  //   category: 'Transportation',
  //   latitude: 13.00195,
  //   longitude: 80.19893,
  //   icon: '🚇',
  //   address: 'Metro Station'
  // },
  // {
  //   id: 'trans-2',
  //   name: 'Velachery Railway Station',
  //   category: 'Transportation',
  //   latitude: 12.96731,
  //   longitude: 80.21930,
  //   icon: '🚂',
  //   address: 'Railway Station'
  // },
  // {
  //   id: 'trans-3',
  //   name: 'Airport',
  //   category: 'Transportation',
  //   latitude: 12.99509,
  //   longitude: 80.2460,
  //   icon: '✈️',
  //   address: 'Airport'
  // },
  // {
  //   id: 'trans-4',
  //   name: ' ',
  //   category: 'Transportation',
  //   latitude: 12.91242,
  //   longitude: 79.39805,
  //   icon: '🛣️',
  //   address: 'Highway'
  // }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'amenity-1',
    name: 'Entrance',
    icon: '🏠',
    position: { x: 50, y: 60 },
     description: 'A beautiful entrance to the property. This is the grand entrance with well-lit gates, welcoming visitors with a lush garden on both sides.',
    image360: '/assets/images/eno-ent.jpeg'
  },
  {
    id: 'amenity-2',
    name: 'Park',
    icon: '🎾',
    position: { x: 13, y: 22},
    description: 'The park entrance features a wide pathway lined with flowering plants, a decorative arch, and benches for visitors to relax before entering',
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

export const BUILDING_IMAGE = 'assets/images/main.jpeg';



