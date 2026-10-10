import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-registration-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (eventService.selectedEventForReg(); as event) {
      <div class="modal-backdrop" (click)="closeOnBackdrop($event)">
        <div class="modal-card bento-card come-in" (click)="$event.stopPropagation()">
          
          <!-- Header -->
          <div class="modal-header">
            <div>
              <span class="reg-eyebrow font-brush">REGISTER FOR CLASH</span>
              <h2 class="modal-title font-brush">{{ event.name }}</h2>
              <span class="modal-cat-tag">{{ event.category }}</span>
            </div>
            <button (click)="close()" class="btn-close-modal">✕</button>
          </div>

          <!-- Summary Strip -->
          <div class="event-summary-strip">
            <div>🗓️ {{ event.dateTime }}</div>
            <div>📍 {{ event.venue }}</div>
            <div class="seats-highlight">🎟️ {{ eventService.getSeatsLeft(event.id) }} seats remaining</div>
          </div>

          <!-- Mascot Encouragement -->
          <div class="modal-miso-sticker sway-item">
            <img src="assets/miso_peek_trans.png" alt="Miso" class="modal-miso-img" />
            <span>"LET'S DO THIS! Grab your slot!" 🐾</span>
          </div>

          <!-- Form -->
          <form (submit)="handleSubmit($event)" class="reg-form">
            
            <div class="form-group">
              <label class="form-label">Full Name <span class="req">*</span></label>
              <input 
                type="text" 
                [(ngModel)]="fullName" 
                name="name" 
                placeholder="e.g. Riya Nair"
                class="form-input"
                [class.has-error]="nameError"
                (input)="nameError = ''"
              />
              @if (nameError) {
                <span class="err-text">{{ nameError }}</span>
              }
            </div>

            <div class="form-group">
              <label class="form-label">Email Address <span class="req">*</span></label>
              <input 
                type="email" 
                [(ngModel)]="email" 
                name="email" 
                placeholder="e.g. riya.nair@example.com"
                class="form-input"
                [class.has-error]="emailError"
                (input)="emailError = ''"
              />
              @if (emailError) {
                <span class="err-text">{{ emailError }}</span>
              }
            </div>

            <div class="form-group">
              <label class="form-label">Phone Number <span class="req">*</span></label>
              <input 
                type="tel" 
                [(ngModel)]="phone" 
                name="phone" 
                placeholder="e.g. 9876543210 (10 digits)"
                class="form-input"
                [class.has-error]="phoneError"
                (input)="phoneError = ''"
                maxlength="14"
              />
              @if (phoneError) {
                <span class="err-text">{{ phoneError }}</span>
              }
            </div>

            @if (generalError) {
              <div class="general-alert">
                <span>⚠️ {{ generalError }}</span>
              </div>
            }

            <button type="submit" class="btn btn-lime btn-lg w-100">
              <span>CONFIRM & REGISTER</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            <p class="form-disclaimer">Free entry for college students. Valid student ID required at entry.</p>

          </form>

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
      max-width: 500px;
      background: var(--bg-card);
      border: 2px solid var(--purple-neon);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(104, 38, 212, 0.4);
      padding: 32px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 18px;
    }

    .reg-eyebrow {
      font-size: 0.8rem;
      color: var(--accent-lime);
      display: block;
    }

    .modal-title {
      font-size: 2.3rem;
      color: var(--text-main);
      line-height: 1;
      margin: 4px 0 6px;
    }

    .modal-cat-tag {
      font-size: 0.7rem;
      font-weight: 800;
      background: var(--purple-midnight);
      border: 1px solid var(--purple-electric);
      color: var(--purple-neon);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }

    .btn-close-modal {
      background: var(--purple-midnight);
      border: 1px solid var(--border-subtle);
      color: #FFFFFF;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-size: 1rem;
      cursor: pointer;
    }

    .event-summary-strip {
      background: var(--purple-midnight);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 10px 14px;
      margin-bottom: 16px;
      font-size: 0.82rem;
      color: var(--text-secondary);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .seats-highlight {
      color: var(--accent-lime);
      font-weight: 800;
    }

    .modal-miso-sticker {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(104, 38, 212, 0.2);
      border: 1px solid var(--purple-electric);
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--accent-lime);
      margin-bottom: 20px;
    }

    .modal-miso-img {
      width: 38px;
      height: auto;
    }

    .reg-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .req { color: var(--raw-danger); }

    .form-input {
      width: 100%;
      padding: 12px 16px;
      background: var(--purple-midnight);
      border: 1.5px solid var(--border-subtle);
      border-radius: var(--radius-md);
      color: #FFFFFF;
      font-family: var(--font-body);
      font-size: 0.95rem;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--accent-lime);
    }

    .form-input.has-error {
      border-color: var(--raw-danger);
    }

    .err-text {
      font-size: 0.75rem;
      color: var(--raw-danger);
      font-weight: 700;
    }

    .general-alert {
      background: rgba(255, 59, 92, 0.15);
      border: 1px solid var(--raw-danger);
      color: var(--raw-danger);
      padding: 10px 14px;
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      font-weight: 800;
    }

    .form-disclaimer {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-align: center;
      margin-top: 10px;
    }
  `]
})
export class RegistrationModalComponent {
  readonly eventService = inject(EventService);

  fullName = '';
  email = '';
  phone = '';

  nameError = '';
  emailError = '';
  phoneError = '';
  generalError = '';

  close(): void {
    this.eventService.selectedEventForReg.set(null);
    this.clearErrors();
  }

  closeOnBackdrop(e: MouseEvent): void {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    this.clearErrors();

    const ev = this.eventService.selectedEventForReg();
    if (!ev) return;

    let valid = true;
    if (!this.fullName.trim() || this.fullName.trim().length < 2) {
      this.nameError = 'Please enter at least 2 characters.';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(this.email.trim())) {
      this.emailError = 'Please enter a valid email address.';
      valid = false;
    }

    const cleanPhone = this.phone.replace(/[\s\-\+]/g, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      this.phoneError = 'Please enter a 10-digit mobile number.';
      valid = false;
    }

    if (!valid) return;

    const res = this.eventService.registerStudent(ev, this.fullName, this.email, cleanPhone);
    if (!res.success) {
      this.generalError = res.error || 'Registration failed.';
      return;
    }

    // Success!
    this.close();
    this.fullName = '';
    this.email = '';
    this.phone = '';
  }

  private clearErrors(): void {
    this.nameError = '';
    this.emailError = '';
    this.phoneError = '';
    this.generalError = '';
  }
}
