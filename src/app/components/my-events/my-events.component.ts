import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Registration } from '../../models/event.model';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="my-events-section come-in" id="my-events">
      
      <div class="my-events-header-row">
        <div>
          <div class="pill-tag sway-item">
            <span>🎟️ DIGITAL CAMPUS WRISTBAND</span>
          </div>
          <h2 class="section-title font-brush">
            MY <span class="highlight-lime">EVENTS</span>
          </h2>
          <p class="section-subtitle">
            Saved registrations in this browser. Present your pass at the venue entrance.
          </p>
        </div>

        <div class="confirmed-badge-pill">
          <span>{{ eventService.myEventsCount() }} Passes Confirmed</span>
        </div>
      </div>

      <!-- Passes Grid -->
      @if (eventService.myEventsCount() > 0) {
        <div class="passes-grid">
          @for (reg of eventService.registrations(); track reg.id) {
            <article class="pass-card bento-card come-in">
              
              <div class="pass-top">
                <div>
                  <h3 class="pass-event-name font-brush">{{ reg.eventName }}</h3>
                  <span class="pass-cat-tag">{{ reg.category }}</span>
                </div>
                <div class="ticket-id-badge font-mono">{{ reg.ticketId }}</div>
              </div>

              <div class="pass-schedule">
                <div>🗓️ <strong>{{ reg.dateTime }}</strong></div>
                <div>📍 {{ reg.venue }}</div>
              </div>

              <div class="pass-attendee-box">
                <div class="attendee-name font-brush">{{ reg.studentName }}</div>
                <div class="attendee-contact font-mono">{{ reg.email }} • +91 {{ reg.phone }}</div>
              </div>

              <div class="pass-actions">
                <span class="status-confirmed">
                  <span>✓ Confirmed Ticket</span>
                </span>
                <button (click)="openCancelModal(reg)" class="btn-cancel-ticket">
                  Cancel Pass
                </button>
              </div>

            </article>
          }
        </div>
      } @else {
        <!-- Empty State -->
        <div class="empty-passes-box bento-card">
          <div class="empty-ico sway-item">🎟️</div>
          <h3 class="font-brush">NO REGISTERED PASSES YET</h3>
          <p>Seats are filling up quickly! Explore the 7 official RAW clashes and claim your spot.</p>
          <a href="#events" class="btn btn-lime">
            <span>BROWSE & REGISTER NOW</span>
          </a>
        </div>
      }

    </section>
  `,
  styles: [`
    .my-events-section {
      margin-bottom: 70px;
    }

    .my-events-header-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 20px;
      flex-wrap: wrap;
    }

    .pill-tag {
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

    .section-title {
      font-size: clamp(2.4rem, 4.5vw, 3.8rem);
      color: var(--text-main);
      line-height: 1;
      margin-bottom: 6px;
    }

    .highlight-lime {
      color: var(--accent-lime);
      text-shadow: 2px 2px 0px var(--purple-deep);
    }

    .section-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
    }

    .confirmed-badge-pill {
      background: var(--purple-midnight);
      color: var(--accent-lime);
      border: 1.5px solid var(--accent-lime);
      padding: 8px 16px;
      border-radius: var(--radius-pill);
      font-size: 0.85rem;
      font-weight: 800;
    }

    .passes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 22px;
    }

    .pass-card {
      background: var(--bg-card);
      border: 2px solid var(--purple-electric);
      border-left: 6px solid var(--accent-lime);
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .pass-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    .pass-event-name {
      font-size: 1.8rem;
      color: var(--text-main);
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .pass-cat-tag {
      font-size: 0.7rem;
      font-weight: 800;
      background: var(--purple-midnight);
      color: var(--purple-neon);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
    }

    .ticket-id-badge {
      font-size: 0.75rem;
      font-weight: 700;
      background: var(--purple-midnight);
      border: 1px solid var(--border-subtle);
      color: var(--accent-lime);
      padding: 4px 8px;
      border-radius: var(--radius-sm);
    }

    .pass-schedule {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .pass-attendee-box {
      background: var(--purple-midnight);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 12px 14px;
      margin-bottom: 18px;
    }

    .attendee-name {
      font-size: 1.2rem;
      color: var(--text-main);
    }

    .attendee-contact {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .pass-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;
      border-top: 1px dashed var(--border-subtle);
    }

    .status-confirmed {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--raw-success);
    }

    .btn-cancel-ticket {
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--raw-danger);
      background: transparent;
      border: 1px solid var(--raw-danger);
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel-ticket:hover {
      background: var(--raw-danger);
      color: #FFFFFF;
    }

    .empty-passes-box {
      text-align: center;
      padding: 50px 20px;
      background: var(--purple-midnight);
      border: 2px dashed var(--purple-neon);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .empty-ico {
      font-size: 3rem;
      margin-bottom: 12px;
    }

    .empty-passes-box h3 {
      font-size: 2rem;
      margin-bottom: 8px;
    }

    .empty-passes-box p {
      color: var(--text-secondary);
      max-width: 440px;
      margin-bottom: 20px;
    }
  `]
})
export class MyEventsComponent {
  readonly eventService = inject(EventService);

  openCancelModal(reg: Registration): void {
    this.eventService.pendingCancelPass.set(reg);
  }
}
