import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="site-header">
      <div class="header-container">
        
        <!-- Brand Wordmark: RAW with subtitle pill -->
        <a href="#hero" class="brand-link">
          <span class="raw-brush-logo font-brush">RAW</span>
          <span class="sub-pill">CAMPUS UNFILTERED</span>
        </a>

        <!-- College Tag -->
        <div class="college-tag" title="LBS Institute of Technology for Women">
          <span class="pulse-dot"></span>
          <span class="college-abbr">LBSITW</span>
          <span class="college-loc">Poojappura, TVM</span>
        </div>

        <!-- Navigation Links -->
        <nav class="site-nav">
          <a href="#hero" class="nav-link">HOME</a>
          <a href="#countdown-section" class="nav-link">COUNTDOWN</a>
          <a href="#events" class="nav-link">EVENTS</a>
          <a href="#my-events" class="nav-link">
            MY EVENTS 
            <span class="badge-count">{{ eventService.myEventsCount() }}</span>
          </a>
          <a href="#sponsors" class="nav-link">SPONSORS</a>
          <a href="#about" class="nav-link">ABOUT</a>
          <a href="#contact" class="nav-link">CONTACT</a>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <!-- Audio Beat Toggle -->
          <button 
            (click)="audioService.toggleBeat()" 
            class="action-btn audio-btn" 
            [class.playing]="audioService.isPlaying()"
            title="Toggle Web Audio Disco Beat"
          >
            <span class="audio-bars">
              <span class="bar"></span><span class="bar"></span><span class="bar"></span>
            </span>
            <span class="audio-text">{{ audioService.isPlaying() ? 'BEAT: ON' : 'BEAT: OFF' }}</span>
          </button>

          <!-- Theme Toggle Switch -->
          <button 
            (click)="eventService.toggleTheme()" 
            class="theme-toggle-btn"
            [title]="eventService.currentTheme() === 'dark' ? 'Switch to Disco Light' : 'Switch to After Dark'"
          >
            <span class="toggle-icon">{{ eventService.currentTheme() === 'dark' ? '⚡' : '🪩' }}</span>
            <span class="theme-text">{{ eventService.currentTheme() === 'dark' ? 'AFTER DARK' : 'DISCO LIGHT' }}</span>
          </button>

          <!-- Register CTA -->
          <a href="#events" class="btn btn-lime header-cta">
            <span>REGISTER NOW</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      background-color: var(--header-bg);
      border-bottom: 2px solid var(--border-color);
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .header-container {
      max-width: var(--max-w);
      margin: 0 auto;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .raw-brush-logo {
      font-size: 2.6rem;
      color: var(--accent-lime);
      text-shadow: 2px 2px 0px #000;
      line-height: 1;
      transform: rotate(-1deg);
      transition: transform 0.2s ease;
    }

    .brand-link:hover .raw-brush-logo {
      transform: scale(1.08) rotate(1deg);
    }

    .sub-pill {
      font-family: var(--font-body);
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      background: var(--purple-midnight);
      border: 1.5px solid var(--purple-neon);
      color: var(--accent-lime);
      padding: 4px 8px;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
    }

    .college-tag {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      color: var(--text-secondary);
      background: var(--bg-card);
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--border-subtle);
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: var(--accent-lime);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-lime);
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .college-abbr {
      font-weight: 800;
      color: var(--text-main);
    }

    .site-nav {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .nav-link {
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
      position: relative;
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .nav-link:hover {
      color: var(--accent-lime);
    }

    .badge-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      font-size: 0.68rem;
      font-weight: 900;
      background: var(--accent-lime);
      color: #000;
      border-radius: var(--radius-pill);
      padding: 0 4px;
      margin-left: 2px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .action-btn, .theme-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-card);
      border: 1.5px solid var(--border-color);
      padding: 8px 12px;
      border-radius: var(--radius-pill);
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--text-main);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .action-btn:hover, .theme-toggle-btn:hover {
      border-color: var(--accent-lime);
      transform: translateY(-1px);
    }

    .audio-bars {
      display: inline-flex;
      align-items: flex-end;
      gap: 2px;
      height: 12px;
    }

    .audio-bars .bar {
      width: 2.5px;
      height: 4px;
      background: var(--text-muted);
      border-radius: 1px;
    }

    .audio-btn.playing .audio-bars .bar {
      background: var(--accent-lime);
      animation: soundBounce 0.6s infinite alternate;
    }

    .audio-btn.playing .audio-bars .bar:nth-child(2) { animation-delay: 0.2s; }
    .audio-btn.playing .audio-bars .bar:nth-child(3) { animation-delay: 0.4s; }

    @keyframes soundBounce {
      0% { height: 3px; }
      100% { height: 12px; }
    }

    .header-cta {
      padding: 10px 18px;
      font-size: 0.82rem;
    }

    @media (max-width: 992px) {
      .college-tag, .site-nav { display: none; }
    }
  `]
})
export class HeaderComponent {
  readonly eventService = inject(EventService);
  readonly audioService = inject(AudioService);
}
