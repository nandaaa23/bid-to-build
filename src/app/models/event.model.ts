export interface FestEvent {
  id: string;
  num: string;
  name: string;
  category: 'TECH' | 'LITERARY' | 'CULTURAL' | 'MUSIC' | 'ART & DESIGN' | 'DANCE';
  badgeClass: string;
  dateTime: string;
  venue: string;
  description: string;
  totalSeats: number;
  initialSeats: number;
  artThumb: string;
  mascotSticker: string;
}

export interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  category: string;
  dateTime: string;
  venue: string;
  studentName: string;
  email: string;
  phone: string;
  ticketId: string;
  timestamp: string;
}

export interface Sponsor {
  name: string;
  role: string;
  tier: 'TITLE' | 'POWERED_BY' | 'TECH' | 'MEDIA';
  logoText: string;
  tagline: string;
  accentColor: string;
}

export interface CampusVenue {
  name: string;
  location: string;
  primaryEvent: string;
  icon: string;
}
