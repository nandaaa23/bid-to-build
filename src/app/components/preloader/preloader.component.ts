import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!isDone()) {
      <div class="preloader-overlay" [class.fade-out]="isFading()">
        <div class="preloader-content">
          
          <!-- Miso DJ Animated Mascot -->
          <div class="preloader-mascot-box">
            <img src="assets/miso_music_trans.png" alt="Miso loading" class="preloader-miso-img" />
            <div class="discoball-spinner">🪩</div>
          </div>

          <!-- RAW Brush Title -->
          <h1 class="preloader-title font-brush">
            RAW<span class="period">.</span>
          </h1>

          <span class="preloader-sub font-mono">CAMPUS UNFILTERED // 2026</span>

          <!-- Neon Progress Bar -->
          <div class="progress-track">
            <div class="progress-fill" [style.width.%]="progress()"></div>
          </div>

          <!-- Status Message -->
          <div class="status-row font-mono">
            <span>{{ statusText() }}</span>
            <span class="percentage">{{ progress() }}%</span>
          </div>

        </div>
      </div>
    }
  `,
  styles: [`
    .preloader-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: radial-gradient(circle at center, #250E46 0%, #0B0414 85%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .preloader-overlay.fade-out {
      opacity: 0;
      transform: translateY(-40px) scale(1.02);
      pointer-events: none;
    }

    .preloader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 360px;
      width: 90%;
    }

    .preloader-mascot-box {
      position: relative;
      margin-bottom: 12px;
    }

    .preloader-miso-img {
      width: 95px;
      height: auto;
      filter: drop-shadow(0 10px 20px rgba(104, 38, 212, 0.6));
      animation: mascotBounce 0.5s infinite alternate ease-in-out;
    }

    .discoball-spinner {
      position: absolute;
      top: -16px;
      right: -10px;
      font-size: 1.8rem;
      animation: spinBall 2s linear infinite;
    }

    @keyframes mascotBounce {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }

    @keyframes spinBall {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .preloader-title {
      font-size: clamp(3.8rem, 8vw, 5.5rem);
      color: var(--accent-lime);
      text-shadow: 4px 4px 0px #140726, 0 0 30px rgba(215, 255, 100, 0.5);
      line-height: 0.9;
      margin-bottom: 6px;
      transform: rotate(-1.5deg);
    }

    .period {
      color: var(--purple-neon);
    }

    .preloader-sub {
      font-size: 0.78rem;
      letter-spacing: 0.2em;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    .progress-track {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid var(--purple-electric);
      margin-bottom: 12px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--purple-neon) 0%, var(--accent-lime) 100%);
      border-radius: 999px;
      box-shadow: 0 0 12px var(--accent-lime);
      transition: width 0.15s ease-out;
    }

    .status-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .percentage {
      color: var(--accent-lime);
      font-weight: 800;
    }
  `]
})
export class PreloaderComponent implements OnInit {
  readonly progress = signal<number>(0);
  readonly statusText = signal<string>('CHARGING CAMPUS VIBES...');
  readonly isFading = signal<boolean>(false);
  readonly isDone = signal<boolean>(false);

  ngOnInit(): void {
    const steps = [
      { at: 25, text: 'SYNCHING DISCO LIGHTS...' },
      { at: 55, text: 'TUNING 7 TITAN BATTLES...' },
      { at: 85, text: 'MISO IS HYPED...' },
      { at: 100, text: 'UNFILTERED ENERGY READY! ⚡' }
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 6;
      if (current >= 100) {
        current = 100;
        this.progress.set(100);
        this.statusText.set('WELCOME TO RAW \'26 🪩');
        clearInterval(interval);

        setTimeout(() => {
          this.isFading.set(true);
          setTimeout(() => {
            this.isDone.set(true);
          }, 600);
        }, 400);
      } else {
        this.progress.set(current);
        const matched = steps.find(s => current <= s.at);
        if (matched) this.statusText.set(matched.text);
      }
    }, 70);
  }
}
