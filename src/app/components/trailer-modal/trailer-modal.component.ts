import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-trailer-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (eventService.showTrailer()) {
      <div class="modal-backdrop" (click)="close()">
        <div class="modal-card bento-card come-in" (click)="$event.stopPropagation()">
          
          <div class="trailer-header">
            <div>
              <span class="teaser-tag font-brush">RAW '26 TEASER EXPERIENCE</span>
              <h3 class="font-brush">UNFILTERED CAMPUS TEASER</h3>
            </div>
            <button (click)="close()" class="btn-close">✕</button>
          </div>

          <!-- Video Simulation Player -->
          <div class="sim-player">
            <div class="player-stage">
              <div class="glitch-title font-brush">RAW '26</div>
              <div class="glitch-sub font-mono">BASS • DISCO • REBELLION</div>
              <img src="assets/miso_music_trans.png" alt="DJ Miso" class="teaser-miso sway-item" />
              
              <div class="wave-bars">
                <span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>

            <div class="player-controls">
              <button (click)="togglePlay()" class="btn-play-pause font-brush">
                {{ isPlaying ? '⏸ PAUSE' : '▶ PLAY' }}
              </button>
              <div class="timeline">
                <div class="progress-bar" [class.paused]="!isPlaying"></div>
              </div>
              <span class="timestamp font-mono">0:24 / 0:45</span>
            </div>
          </div>

          <p class="teaser-caption">
            <strong>3 DAYS. 7 TITAN CLASHES. UNLIMITED BASS.</strong>
            Get ready for LBSITW's biggest student-driven cultural & technical festival. March 15-17, 2026.
          </p>

          <a href="#events" (click)="close()" class="btn btn-lime w-100">
            <span>CLAIM YOUR EVENT PASSES NOW</span>
          </a>

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
      backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-card {
      width: 100%;
      max-width: 600px;
      background: var(--bg-card);
      border: 2px solid var(--purple-neon);
      padding: 30px;
    }

    .trailer-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .teaser-tag {
      font-size: 0.8rem;
      color: var(--accent-lime);
      display: block;
    }

    .trailer-header h3 {
      font-size: 2rem;
      color: var(--text-main);
    }

    .btn-close {
      background: var(--purple-midnight);
      border: 1px solid var(--border-subtle);
      color: #fff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
    }

    .sim-player {
      background: #000;
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 2px solid var(--purple-electric);
      margin-bottom: 16px;
    }

    .player-stage {
      height: 240px;
      background: radial-gradient(circle, var(--purple-deep) 0%, #000 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .glitch-title {
      font-size: 3.8rem;
      color: var(--accent-lime);
      text-shadow: 4px 4px 0px var(--purple-neon);
      line-height: 1;
    }

    .glitch-sub {
      font-size: 0.8rem;
      color: #fff;
      letter-spacing: 0.2em;
    }

    .teaser-miso {
      width: 80px;
      height: auto;
      margin-top: 10px;
    }

    .wave-bars {
      position: absolute;
      bottom: 10px;
      display: flex;
      gap: 4px;
    }

    .wave-bars span {
      width: 4px;
      height: 16px;
      background: var(--accent-lime);
      border-radius: 2px;
      animation: soundBounce 0.5s infinite alternate;
    }

    .wave-bars span:nth-child(2) { animation-delay: 0.1s; }
    .wave-bars span:nth-child(3) { animation-delay: 0.2s; }
    .wave-bars span:nth-child(4) { animation-delay: 0.15s; }
    .wave-bars span:nth-child(5) { animation-delay: 0.25s; }
    .wave-bars span:nth-child(6) { animation-delay: 0.05s; }

    @keyframes soundBounce {
      0% { height: 4px; }
      100% { height: 18px; }
    }

    .player-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      background: var(--purple-midnight);
    }

    .btn-play-pause {
      background: none;
      border: none;
      color: var(--accent-lime);
      font-size: 0.85rem;
      cursor: pointer;
    }

    .timeline {
      flex: 1;
      height: 5px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-bar {
      width: 50%;
      height: 100%;
      background: var(--accent-lime);
      animation: prog 8s linear infinite;
    }

    .progress-bar.paused {
      animation-play-state: paused;
    }

    @keyframes prog {
      0% { width: 0%; }
      100% { width: 100%; }
    }

    .timestamp {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .teaser-caption {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .teaser-caption strong {
      display: block;
      color: var(--text-main);
      font-size: 0.95rem;
      margin-bottom: 2px;
    }
  `]
})
export class TrailerModalComponent {
  readonly eventService = inject(EventService);
  isPlaying = true;

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  close(): void {
    this.eventService.showTrailer.set(false);
  }
}
