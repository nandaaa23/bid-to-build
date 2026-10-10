import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { FestEvent } from '../../models/event.model';

@Component({
  selector: 'app-events-discovery',
  standalone: true,
  imports: [CommonModule, FormsModule, EventCardComponent],
  template: `
    <section class="events-discovery-section come-in" id="events">
      
      <!-- Section Title Row -->
      <div class="section-title-strip">
        <div class="title-meta">
          <div class="category-pill-tag sway-item">
            <span>✦ 7 OFFICIAL TITAN BATTLES</span>
          </div>
          <h2 class="section-heading font-brush">
            EVENTS <span class="lime-glow">UNFILTERED</span>
          </h2>
          <p class="section-sub">
            Pick your chaos. Find your vibe. Lock in your registration before seats run out.
          </p>
        </div>

        <div class="section-mascot-sticker sway-reverse">
          <img src="assets/sticker_lets_go_trans.png" alt="Let's Go" class="sticker-letsgo" />
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div class="discovery-filter-box bento-card">
        
        <!-- Search Field -->
        <div class="search-wrap">
          <svg class="search-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="search" 
            [ngModel]="eventService.searchQuery()" 
            (ngModelChange)="onSearchChange($event)"
            placeholder="Search events by name, code, venue..." 
            class="search-input"
          />
          @if (eventService.searchQuery()) {
            <button (click)="clearSearch()" class="btn-clear-search">✕</button>
          }
        </div>

        <!-- Category Filter Pills -->
        <div class="category-pills-row">
          @for (cat of categories; track cat) {
            <button 
              (click)="setCategory(cat)"
              class="cat-filter-btn"
              [class.active]="eventService.activeCategory() === cat"
            >
              <span>{{ cat }}</span>
              <span class="cat-pill-count">{{ getCategoryCount(cat) }}</span>
            </button>
          }
        </div>

      </div>

      <!-- Filter Status & Reset -->
      @if (isFiltered) {
        <div class="filter-status-banner">
          <span>Showing {{ eventService.filteredEvents().length }} of {{ eventService.events().length }} events</span>
          <button (click)="resetAllFilters()" class="btn-reset-filters">Reset All Filters</button>
        </div>
      }

      <!-- Events Bento Cards Grid -->
      @if (eventService.filteredEvents().length > 0) {
        <div class="events-cards-grid">
          @for (ev of eventService.filteredEvents(); track ev.id) {
            <app-event-card 
              [event]="ev" 
              (onRegister)="handleRegisterClick($event)"
            />
          }
        </div>
      } @else {
        <!-- Empty State with MISO -->
        <div class="empty-events-state bento-card">
          <div class="empty-miso-wrap sway-item">
            <img src="assets/miso_empty_trans.png" alt="Miso Empty State" class="empty-miso-img" />
            <div class="empty-speech-bubble">
              <span>"MISO searched everywhere... no events match that!" 🐾</span>
            </div>
          </div>
          <h3 class="empty-title font-brush">NO EVENTS FOUND</h3>
          <p class="empty-sub">Try searching another keyword or reset the category filter.</p>
          <button (click)="resetAllFilters()" class="btn btn-lime">
            <span>SHOW ALL 7 EVENTS</span>
          </button>
        </div>
      }

    </section>
  `,
  styles: [`
    .events-discovery-section {
      margin-bottom: 70px;
    }

    .section-title-strip {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 24px;
    }

    .category-pill-tag {
      display: inline-block;
      background: var(--purple-midnight);
      border: 1.5px solid var(--purple-neon);
      color: var(--accent-lime);
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
    }

    .section-heading {
      font-size: clamp(2.6rem, 5vw, 4rem);
      line-height: 1;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    .lime-glow {
      color: var(--accent-lime);
      text-shadow: 3px 3px 0px var(--purple-deep), 0 0 20px rgba(215, 255, 100, 0.4);
    }

    .section-sub {
      font-size: 1rem;
      color: var(--text-secondary);
      max-width: 520px;
    }

    .sticker-letsgo {
      width: 90px;
      height: auto;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
      transform: rotate(-6deg);
    }

    .discovery-filter-box {
      background: var(--bg-card);
      border: 2px solid var(--border-color);
      padding: 20px 24px;
      margin-bottom: 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .search-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-ico {
      position: absolute;
      left: 16px;
      color: var(--text-muted);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 14px 44px 14px 46px;
      background: var(--purple-midnight);
      border: 1.5px solid var(--border-subtle);
      border-radius: var(--radius-pill);
      color: var(--text-main);
      font-family: var(--font-body);
      font-size: 0.95rem;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent-lime);
      box-shadow: 0 0 15px rgba(215, 255, 100, 0.25);
    }

    .btn-clear-search {
      position: absolute;
      right: 14px;
      background: var(--text-muted);
      color: #000;
      border: none;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      cursor: pointer;
    }

    .category-pills-row {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    .cat-filter-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: var(--purple-midnight);
      color: var(--text-secondary);
      border: 1.5px solid var(--border-subtle);
      border-radius: var(--radius-pill);
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .cat-filter-btn:hover {
      border-color: var(--purple-neon);
      color: var(--text-main);
      transform: translateY(-2px);
    }

    .cat-filter-btn.active {
      background: var(--accent-lime);
      color: #000;
      border-color: #000;
      box-shadow: 0 4px 14px rgba(215, 255, 100, 0.35);
    }

    .cat-pill-count {
      font-size: 0.68rem;
      font-weight: 900;
      background: rgba(0, 0, 0, 0.2);
      padding: 1px 6px;
      border-radius: var(--radius-pill);
    }

    .cat-filter-btn.active .cat-pill-count {
      background: #000;
      color: var(--accent-lime);
    }

    .filter-status-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      background: var(--purple-midnight);
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .btn-reset-filters {
      background: none;
      border: none;
      color: var(--accent-lime);
      font-weight: 800;
      text-decoration: underline;
      cursor: pointer;
    }

    .events-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 22px;
    }

    /* Empty State */
    .empty-events-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 50px 20px;
      background: var(--purple-midnight);
      border: 2px dashed var(--purple-neon);
    }

    .empty-miso-wrap {
      position: relative;
      margin-bottom: 20px;
    }

    .empty-miso-img {
      width: 100px;
      height: auto;
    }

    .empty-speech-bubble {
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent-lime);
      color: #000;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: 0.82rem;
      font-weight: 800;
      border: 2px solid #000;
      white-space: nowrap;
    }

    .empty-title {
      font-size: 2.2rem;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    .empty-sub {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 420px;
      margin-bottom: 20px;
    }
  `]
})
export class EventsDiscoveryComponent {
  readonly eventService = inject(EventService);

  readonly categories = ['ALL', 'TECH', 'LITERARY', 'CULTURAL', 'MUSIC', 'ART & DESIGN', 'DANCE'];

  get isFiltered(): boolean {
    return this.eventService.activeCategory() !== 'ALL' || this.eventService.searchQuery().length > 0;
  }

  getCategoryCount(cat: string): number {
    if (cat === 'ALL') return this.eventService.events().length;
    return this.eventService.events().filter(e => e.category === cat).length;
  }

  setCategory(cat: string): void {
    this.eventService.activeCategory.set(cat);
  }

  onSearchChange(val: string): void {
    this.eventService.searchQuery.set(val || '');
  }

  clearSearch(): void {
    this.eventService.searchQuery.set('');
  }

  resetAllFilters(): void {
    this.eventService.activeCategory.set('ALL');
    this.eventService.searchQuery.set('');
  }

  handleRegisterClick(ev: FestEvent): void {
    this.eventService.selectedEventForReg.set(ev);
  }
}
