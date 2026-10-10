import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FestEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article 
      class="event-card bento-card come-in" 
      [class.event-full]="isFull"
      [class.cat-tech]="event.category === 'TECH'"
      [class.cat-literary]="event.category === 'LITERARY'"
      [class.cat-cultural]="event.category === 'CULTURAL'"
      [class.cat-music]="event.category === 'MUSIC'"
      [class.cat-art]="event.category === 'ART & DESIGN'"
      [class.cat-dance]="event.category === 'DANCE'"
    >
      
      <!-- Top Strip: Number & Category Badge & Mascot Sticker -->
      <div class="card-top-row">
        <div class="card-badges">
          <span class="num-badge font-brush">{{ event.num }}</span>
          <span class="cat-badge">{{ event.category }}</span>
        </div>

        <img 
          [src]="event.mascotSticker" 
          [alt]="event.name + ' mascot'" 
          class="card-miso-sticker sway-item"
        />
      </div>

      <!-- Title & Description -->
      <div class="card-main-info">
        <h3 class="event-name font-brush">{{ event.name }}</h3>
        <p class="event-desc">{{ event.description }}</p>
      </div>

      <!-- Details: Date, Time, Venue -->
      <div class="card-meta-box">
        <div class="meta-row">
          <span class="ico">🗓️</span>
          <span>{{ event.dateTime }}</span>
        </div>
        <div class="meta-row">
          <span class="ico">📍</span>
          <span>{{ event.venue }}</span>
        </div>
      </div>

      <!-- Seats Left Bar -->
      <div class="seats-section">
        <div class="seats-labels">
          <span class="lbl">AVAILABILITY:</span>
          <span class="seats-left-val">{{ seatsLeft }} / {{ event.totalSeats }} seats left</span>
        </div>
        <div class="seats-track">
          <div class="seats-fill" [style.width.%]="capacityPercent"></div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="card-action">
        @if (isRegistered) {
          <div class="badge-registered">
            <span>✓ REGISTERED PASS</span>
          </div>
        } @else if (isFull) {
          <div class="badge-full">
            <span>EVENT FULL</span>
          </div>
        } @else {
          <button (click)="onRegister.emit(event)" class="btn btn-lime btn-card-register">
            <span>REGISTER NOW</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        }
      </div>

    </article>
  `,
  styles: [`
    .event-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 22px;
      position: relative;
      background: var(--bg-card);
      border: 2px solid var(--border-color);
      transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .event-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--card-shadow-hover);
      border-color: var(--accent-lime);
    }

    /* Category Top Line */
    .event-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--purple-neon);
    }

    .cat-tech::before { background: #8B4EFE; }
    .cat-literary::before { background: #3A86FF; }
    .cat-cultural::before { background: #FF006E; }
    .cat-music::before { background: #D7FF64; }
    .cat-art::before { background: #FB5607; }
    .cat-dance::before { background: #FFBE0B; }

    .card-top-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    .card-badges {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .num-badge {
      font-size: 1.2rem;
      background: var(--accent-lime);
      color: #000;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      line-height: 1;
    }

    .cat-badge {
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      background: var(--purple-midnight);
      border: 1px solid var(--purple-electric);
      color: var(--text-main);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
    }

    .card-miso-sticker {
      width: 52px;
      height: 52px;
      object-fit: contain;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
    }

    .card-main-info {
      margin-bottom: 14px;
    }

    .event-name {
      font-size: 1.95rem;
      color: var(--text-main);
      line-height: 1.05;
      margin-bottom: 6px;
    }

    .event-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.5;
      min-height: 42px;
    }

    .card-meta-box {
      background: var(--purple-midnight);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 10px 14px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 0.8rem;
      color: var(--text-secondary);
      font-weight: 600;
    }

    .meta-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .seats-section {
      margin-bottom: 16px;
    }

    .seats-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.78rem;
      font-weight: 800;
      margin-bottom: 6px;
    }

    .seats-left-val {
      color: var(--accent-lime);
    }

    .seats-track {
      width: 100%;
      height: 6px;
      background: var(--purple-abyss);
      border-radius: var(--radius-pill);
      overflow: hidden;
      border: 1px solid var(--border-subtle);
    }

    .seats-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--purple-neon) 0%, var(--accent-lime) 100%);
      border-radius: var(--radius-pill);
      transition: width 0.4s ease;
    }

    .card-action {
      padding-top: 12px;
      border-top: 1px dashed var(--border-subtle);
    }

    .btn-card-register {
      width: 100%;
      padding: 10px 16px;
      font-size: 0.88rem;
    }

    .badge-full {
      width: 100%;
      padding: 10px;
      text-align: center;
      background: #251e33;
      color: #888;
      border-radius: var(--radius-pill);
      font-weight: 900;
      font-size: 0.82rem;
      border: 1px solid #444;
      cursor: not-allowed;
    }

    .badge-registered {
      width: 100%;
      padding: 10px;
      text-align: center;
      background: rgba(0, 245, 212, 0.15);
      color: var(--raw-success);
      border: 1.5px solid var(--raw-success);
      border-radius: var(--radius-pill);
      font-weight: 900;
      font-size: 0.82rem;
    }

    .event-full {
      opacity: 0.75;
    }
  `]
})
export class EventCardComponent {
  @Input({ required: true }) event!: FestEvent;
  @Output() onRegister = new EventEmitter<FestEvent>();

  readonly eventService = inject(EventService);

  get seatsLeft(): number {
    return this.eventService.getSeatsLeft(this.event.id);
  }

  get isFull(): boolean {
    return this.seatsLeft <= 0;
  }

  get isRegistered(): boolean {
    return this.eventService.isRegistered(this.event.id);
  }

  get capacityPercent(): number {
    return Math.min(100, Math.max(0, ((this.event.totalSeats - this.seatsLeft) / this.event.totalSeats) * 100));
  }
}
