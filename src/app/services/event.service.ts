import { Injectable, signal, computed } from '@angular/core';
import { FestEvent, Registration } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly STORAGE_SEATS = 'raw_fest_seats_v2';
  private readonly STORAGE_REGS = 'raw_fest_regs_v2';
  private readonly STORAGE_THEME = 'raw_fest_theme_v2';

  // The 7 Official Fest Events
  readonly events = signal<FestEvent[]>([
    {
      id: 'codestorm',
      num: '01',
      name: 'CodeStorm',
      category: 'TECH',
      badgeClass: 'cat-tech',
      dateTime: '15 Mar 2026 • 9:00 AM',
      venue: 'Computer Lab Block (Labs 4 & 5)',
      description: 'A 6-hour coding showdown. Logic. Speed. Glory. Algorithms, debugging, and competitive hack sprint.',
      totalSeats: 60,
      initialSeats: 32,
      artThumb: 'assets/thumb_codestorm.png',
      mascotSticker: 'assets/miso_code_trans.png'
    },
    {
      id: 'carpe-dictum',
      num: '02',
      name: 'Carpe Dictum',
      category: 'LITERARY',
      badgeClass: 'cat-literary',
      dateTime: '15 Mar 2026 • 11:00 AM',
      venue: 'Seminar Hall (Admin Block)',
      description: 'Words have power. Use yours. Elite parliamentary debate, slam poetry, and creative storytelling arena.',
      totalSeats: 50,
      initialSeats: 28,
      artThumb: 'assets/event_carpe_card.png',
      mascotSticker: 'assets/miso_vibing_trans.png'
    },
    {
      id: 'dionysia',
      num: '03',
      name: 'Dionysia',
      category: 'CULTURAL',
      badgeClass: 'cat-cultural',
      dateTime: '16 Mar 2026 • 4:00 PM',
      venue: 'Main Stage (Open Amphitheatre)',
      description: 'The grand cultural showcase. Dance, drama, fashion runway & theatrical magic under the spotlights.',
      totalSeats: 200,
      initialSeats: 120,
      artThumb: 'assets/event_dionysia_card.png',
      mascotSticker: 'assets/miso_chill_trans.png'
    },
    {
      id: 'neon-rave',
      num: '04',
      name: 'Neon Rave',
      category: 'MUSIC',
      badgeClass: 'cat-music',
      dateTime: '16 Mar 2026 • 8:00 PM',
      venue: 'Open Arena & DJ Dome',
      description: 'Lights. Beats. Lose yourself. Underground synthwave, live student bands, electronic drops & neon chaos.',
      totalSeats: 250,
      initialSeats: 150,
      artThumb: 'assets/event_neonrave_card.png',
      mascotSticker: 'assets/miso_music_trans.png'
    },
    {
      id: 'robowar',
      num: '05',
      name: 'RoboWar',
      category: 'TECH',
      badgeClass: 'cat-tech',
      dateTime: '17 Mar 2026 • 10:00 AM',
      venue: 'Workshop Area (Mechanical Bay)',
      description: 'Build. Battle. Dominate. Heavyweight combat bots clash in a 360-degree steel and polycarbonate arena!',
      totalSeats: 40,
      initialSeats: 18,
      artThumb: 'assets/thumb_robowar.png',
      mascotSticker: 'assets/sticker_chaos_trans.png'
    },
    {
      id: 'canvasclash',
      num: '06',
      name: 'CanvasClash',
      category: 'ART & DESIGN',
      badgeClass: 'cat-art',
      dateTime: '17 Mar 2026 • 1:00 PM',
      venue: 'Design Studio & Courtyard',
      description: 'Create in chaos. Art is the weapon. Speed spray graffiti, digital illustration, and live neo-mural duel.',
      totalSeats: 45,
      initialSeats: 24,
      artThumb: 'assets/thumb_canvasclash.png',
      mascotSticker: 'assets/miso_camera_trans.png'
    },
    {
      id: 'syncra',
      num: '07',
      name: 'Syncra',
      category: 'DANCE',
      badgeClass: 'cat-dance',
      dateTime: '17 Mar 2026 • 5:00 PM',
      venue: 'Auditorium Main Stage',
      description: 'Sync your moves. Feel the beat. Western, hip-hop, contemporary and street-style crew battles.',
      totalSeats: 80,
      initialSeats: 42,
      artThumb: 'assets/event_syncra_card.png',
      mascotSticker: 'assets/miso_dance_trans.png'
    }
  ]);

  // Reactive State
  readonly seats = signal<{ [key: string]: number }>({});
  readonly registrations = signal<Registration[]>([]);
  readonly activeCategory = signal<string>('ALL');
  readonly searchQuery = signal<string>('');
  readonly currentTheme = signal<'dark' | 'light'>('dark');

  // Modal State Signals
  readonly selectedEventForReg = signal<FestEvent | null>(null);
  readonly lastRegisteredPass = signal<Registration | null>(null);
  readonly pendingCancelPass = signal<Registration | null>(null);
  readonly showTrailer = signal<boolean>(false);

  // Computed state
  readonly filteredEvents = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();
    return this.events().filter(ev => {
      const matchCat = cat === 'ALL' || ev.category === cat;
      const matchSearch = !query ||
        ev.name.toLowerCase().includes(query) ||
        ev.venue.toLowerCase().includes(query) ||
        ev.category.toLowerCase().includes(query) ||
        ev.description.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  });

  readonly myEventsCount = computed(() => this.registrations().length);

  constructor() {
    this.initFromLocalStorage();
  }

  private initFromLocalStorage(): void {
    // 1. Theme
    const savedTheme = localStorage.getItem(this.STORAGE_THEME) as 'dark' | 'light' | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('dark');
    }

    // 2. Seats
    try {
      const savedSeats = localStorage.getItem(this.STORAGE_SEATS);
      if (savedSeats) {
        this.seats.set(JSON.parse(savedSeats));
      } else {
        const initial: { [key: string]: number } = {};
        this.events().forEach(ev => initial[ev.id] = ev.initialSeats);
        this.seats.set(initial);
        localStorage.setItem(this.STORAGE_SEATS, JSON.stringify(initial));
      }
    } catch {
      const initial: { [key: string]: number } = {};
      this.events().forEach(ev => initial[ev.id] = ev.initialSeats);
      this.seats.set(initial);
    }

    // 3. Registrations
    try {
      const savedRegs = localStorage.getItem(this.STORAGE_REGS);
      if (savedRegs) {
        this.registrations.set(JSON.parse(savedRegs));
      } else {
        const initialReg: Registration = {
          id: 'reg-sample-1',
          eventId: 'codestorm',
          eventName: 'CodeStorm',
          category: 'TECH',
          dateTime: '15 Mar 2026 • 9:00 AM',
          venue: 'Computer Lab Block (Labs 4 & 5)',
          studentName: 'Riya Nair',
          email: 'riya.nair@example.com',
          phone: '9876543210',
          ticketId: 'RAW-2026-CS-4921',
          timestamp: new Date().toISOString()
        };
        this.registrations.set([initialReg]);
        localStorage.setItem(this.STORAGE_REGS, JSON.stringify([initialReg]));
      }
    } catch {
      this.registrations.set([]);
    }
  }

  setTheme(theme: 'dark' | 'light'): void {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_THEME, theme);
  }

  toggleTheme(): void {
    const next = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  getSeatsLeft(eventId: string): number {
    const current = this.seats()[eventId];
    if (current !== undefined) return current;
    const ev = this.events().find(e => e.id === eventId);
    return ev ? ev.initialSeats : 0;
  }

  isRegistered(eventId: string): boolean {
    return this.registrations().some(r => r.eventId === eventId);
  }

  registerStudent(event: FestEvent, name: string, email: string, phone: string): { success: boolean; error?: string; registration?: Registration } {
    // 1. Capacity check
    const currentSeats = this.getSeatsLeft(event.id);
    if (currentSeats <= 0) {
      return { success: false, error: 'Sorry! This event has reached full capacity.' };
    }

    // 2. Duplicate check
    const duplicate = this.registrations().some(
      r => r.eventId === event.id && (r.email.toLowerCase() === email.toLowerCase() || r.phone === phone)
    );
    if (duplicate) {
      return { success: false, error: 'A registration for this event already exists with this email or phone.' };
    }

    // 3. Create Ticket ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const prefix = event.name.substring(0, 2).toUpperCase();
    const ticketId = `RAW-2026-${prefix}-${randomCode}`;

    const newReg: Registration = {
      id: 'reg-' + Date.now(),
      eventId: event.id,
      eventName: event.name,
      category: event.category,
      dateTime: event.dateTime,
      venue: event.venue,
      studentName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      ticketId,
      timestamp: new Date().toISOString()
    };

    // Update seats
    const updatedSeats = { ...this.seats(), [event.id]: Math.max(0, currentSeats - 1) };
    this.seats.set(updatedSeats);
    localStorage.setItem(this.STORAGE_SEATS, JSON.stringify(updatedSeats));

    // Update registrations
    const updatedRegs = [newReg, ...this.registrations()];
    this.registrations.set(updatedRegs);
    localStorage.setItem(this.STORAGE_REGS, JSON.stringify(updatedRegs));

    this.lastRegisteredPass.set(newReg);
    return { success: true, registration: newReg };
  }

  cancelRegistration(regId: string): void {
    const reg = this.registrations().find(r => r.id === regId);
    if (!reg) return;

    // Restore 1 seat
    const ev = this.events().find(e => e.id === reg.eventId);
    const maxCapacity = ev ? ev.totalSeats : 100;
    const currentSeats = this.getSeatsLeft(reg.eventId);
    const updatedSeats = { ...this.seats(), [reg.eventId]: Math.min(maxCapacity, currentSeats + 1) };
    this.seats.set(updatedSeats);
    localStorage.setItem(this.STORAGE_SEATS, JSON.stringify(updatedSeats));

    // Remove registration
    const updatedRegs = this.registrations().filter(r => r.id !== regId);
    this.registrations.set(updatedRegs);
    localStorage.setItem(this.STORAGE_REGS, JSON.stringify(updatedRegs));
  }
}
