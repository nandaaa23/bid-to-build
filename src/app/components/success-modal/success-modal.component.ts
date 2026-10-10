import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (eventService.lastRegisteredPass(); as pass) {
      <div class="modal-backdrop" (click)="close()">
        <div class="modal-card bento-card come-in" (click)="$event.stopPropagation()">
          
          <button (click)="close()" class="btn-close">✕</button>

          <!-- Checkmark Icon -->
          <div class="check-circle-wrap">
            <div class="check-circle">✓</div>
          </div>

          <!-- Miso Mascot Jumping -->
          <div class="miso-jump-wrap sway-item">
            <img src="assets/miso_success_trans.png" alt="Miso celebrating" class="miso-success-img" />
          </div>

          <h2 class="success-title font-brush">YOU'RE ON THE LIST!</h2>
          
          <p class="success-msg">
            Hey <strong class="highlight-lime">{{ pass.studentName }}</strong>! You've successfully secured your pass for 
            <strong class="highlight-lime">{{ pass.eventName }}</strong>.
          </p>

          <!-- Ticket Summary Card -->
          <div class="ticket-box">
            <div class="ticket-line">
              <span>EVENT:</span>
              <strong>{{ pass.eventName }}</strong>
            </div>
            <div class="ticket-line">
              <span>TICKET ID:</span>
              <span class="ticket-code font-mono">{{ pass.ticketId }}</span>
            </div>
            <div class="ticket-line">
              <span>STATUS:</span>
              <span class="status-ok font-brush">CONFIRMED PASS ✓</span>
            </div>
          </div>

          <div class="modal-actions-col">
            <button (click)="viewMyEvents()" class="btn btn-lime btn-lg w-100">
              <span>VIEW MY PASSES</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button (click)="close()" class="btn btn-outline w-100">
              <span>EXPLORE MORE CLASHES</span>
            </button>
          </div>

        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: var(--modal-bg);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-card {
      width: 100%;
      max-width: 480px;
      text-align: center;
      background: var(--bg-card);
      border: 2px solid var(--accent-lime);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(215, 255, 100, 0.35);
      padding: 36px 30px;
      position: relative;
    }

    .btn-close {
      position: absolute;
      top: 14px;
      right: 14px;
      background: var(--purple-midnight);
      border: 1px solid var(--border-subtle);
      color: #FFFFFF;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
    }

    .check-circle-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .check-circle {
      width: 60px;
      height: 60px;
      background: var(--accent-lime);
      color: #000;
      font-size: 2rem;
      font-weight: 900;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(215, 255, 100, 0.6);
    }

    .miso-jump-wrap {
      margin: 10px auto;
    }

    .miso-success-img {
      width: 80px;
      height: auto;
    }

    .success-title {
      font-size: 2.8rem;
      color: var(--text-main);
      margin-bottom: 8px;
    }

    .success-msg {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .highlight-lime {
      color: var(--accent-lime);
    }

    .ticket-box {
      background: var(--purple-midnight);
      border: 2px dashed var(--purple-neon);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      margin-bottom: 24px;
      text-align: left;
    }

    .ticket-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 0.85rem;
    }

    .ticket-line:last-child {
      margin-bottom: 0;
      padding-top: 8px;
      border-top: 1px dashed var(--border-subtle);
    }

    .ticket-code {
      color: var(--accent-lime);
      font-weight: 800;
    }

    .status-ok {
      color: var(--raw-success);
    }

    .modal-actions-col {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `]
})
export class SuccessModalComponent {
  readonly eventService = inject(EventService);

  close(): void {
    this.eventService.lastRegisteredPass.set(null);
  }

  viewMyEvents(): void {
    this.close();
    const el = document.getElementById('my-events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
