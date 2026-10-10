import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-days-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="days-timer-section come-in" id="countdown-section">
      <div class="timer-card bento-card">
        
        <div class="timer-badge-strip">
          <div class="countdown-tag sway-item">
            <span class="live-dot"></span>
            <span>LIVE FESTIVAL COUNTDOWN</span>
          </div>
          <div class="fest-flag">🚩 MARCH 15, 2026 • 9:00 AM IST</div>
        </div>

        <div class="timer-main-row">
          
          <!-- Giant Days Callout -->
          <div class="giant-days-box sway-slow">
            <div class="days-huge font-brush">{{ days() }}</div>
            <div class="days-title-pill">
              <span class="font-distressed">DAYS</span>
              <span>UNTIL THE CHAOS BEGINS</span>
            </div>
          </div>

          <!-- Time Units Grid -->
          <div class="time-units-grid">
            
            <div class="time-unit-box">
              <span class="unit-val font-mono">{{ hours() }}</span>
              <span class="unit-label">HOURS</span>
            </div>
            
            <span class="unit-sep font-brush">:</span>

            <div class="time-unit-box">
              <span class="unit-val font-mono">{{ minutes() }}</span>
              <span class="unit-label">MINUTES</span>
            </div>

            <span class="unit-sep font-brush">:</span>

            <div class="time-unit-box">
              <span class="unit-val font-mono unit-sec">{{ seconds() }}</span>
              <span class="unit-label">SECONDS</span>
            </div>

          </div>

          <!-- Mascot Sticker in Countdown -->
          <div class="timer-mascot-sticker sway-reverse">
            <img src="assets/sticker_onmyway_trans.png" alt="Miso On My Way" class="sticker-onway-img" />
          </div>

        </div>

        <!-- Venue & Dates Reminder Bar -->
        <div class="timer-footer-bar">
          <div class="footer-bar-item">
            <span class="ico">📍</span>
            <span>LBSITW Campus, Poojappura, Thiruvananthapuram</span>
          </div>
          <div class="footer-bar-item">
            <span class="ico">⚡</span>
            <span>3 Days • 7 Titan Battles • 1 Unfiltered Campus</span>
          </div>
          <a href="#events" class="btn btn-lime btn-sm">
            <span>GET YOUR PASS</span>
          </a>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .days-timer-section {
      margin-bottom: 50px;
    }

    .timer-card {
      background: linear-gradient(135deg, var(--purple-midnight) 0%, var(--purple-abyss) 100%);
      border: 2px solid var(--purple-neon);
      box-shadow: 0 10px 35px rgba(104, 38, 212, 0.45);
      padding: 30px 36px;
      position: relative;
    }

    .timer-badge-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .countdown-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--purple-deep);
      border: 1.5px solid var(--accent-lime);
      color: var(--accent-lime);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.08em;
    }

    .live-dot {
      width: 8px;
      height: 8px;
      background: var(--accent-lime);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--accent-lime);
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.85); }
    }

    .fest-flag {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-secondary);
      letter-spacing: 0.05em;
    }

    .timer-main-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .giant-days-box {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .days-huge {
      font-size: clamp(4.5rem, 8vw, 7rem);
      color: var(--accent-lime);
      text-shadow: 4px 4px 0px var(--purple-deep), 0 0 25px rgba(215, 255, 100, 0.4);
      line-height: 0.9;
    }

    .days-title-pill {
      display: flex;
      flex-direction: column;
      font-size: 1.25rem;
      color: var(--text-main);
      font-weight: 800;
      line-height: 1.1;
    }

    .days-title-pill span:first-child {
      font-size: 1.8rem;
      color: var(--purple-neon);
    }

    .days-title-pill span:last-child {
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: var(--text-secondary);
    }

    .time-units-grid {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .time-unit-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--purple-deep);
      border: 1.5px solid var(--purple-electric);
      padding: 14px 20px;
      border-radius: var(--radius-md);
      min-width: 85px;
    }

    .unit-val {
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1;
    }

    .unit-sec {
      color: var(--accent-lime);
    }

    .unit-label {
      font-size: 0.68rem;
      font-weight: 800;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      margin-top: 4px;
    }

    .unit-sep {
      font-size: 2rem;
      color: var(--purple-neon);
      margin-bottom: 12px;
    }

    .timer-mascot-sticker {
      flex-shrink: 0;
    }

    .sticker-onway-img {
      width: 78px;
      height: auto;
      filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.4));
    }

    .timer-footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 18px;
      border-top: 1px dashed var(--purple-electric);
      font-size: 0.85rem;
      color: var(--text-secondary);
      flex-wrap: wrap;
      gap: 12px;
    }

    .footer-bar-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ico { font-size: 1rem; }

    @media (max-width: 768px) {
      .timer-main-row {
        flex-direction: column;
        align-items: flex-start;
      }
      .time-units-grid {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class DaysTimerComponent implements OnInit, OnDestroy {
  readonly days = signal<string>('23');
  readonly hours = signal<string>('14');
  readonly minutes = signal<string>('36');
  readonly seconds = signal<string>('09');

  private intervalId: any;
  private readonly targetTime = new Date('2026-03-15T09:00:00+05:30').getTime();

  ngOnInit(): void {
    this.calcTime();
    this.intervalId = setInterval(() => this.calcTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private calcTime(): void {
    const diff = this.targetTime - Date.now();
    if (diff <= 0) {
      this.days.set('00');
      this.hours.set('00');
      this.minutes.set('00');
      this.seconds.set('00');
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    this.days.set(String(d).padStart(2, '0'));
    this.hours.set(String(h).padStart(2, '0'));
    this.minutes.set(String(m).padStart(2, '0'));
    this.seconds.set(String(s).padStart(2, '0'));
  }
}
