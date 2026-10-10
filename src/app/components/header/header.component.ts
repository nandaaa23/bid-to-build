import { Component, inject, signal } from '@angular/core';
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
        
        <!-- Brand Wordmark: RAW with subtle subtitle pill -->
        <a href="#hero" class="brand-link" aria-label="RAW Home">
          <span class="raw-brush-logo font-brush">RAW</span>
          <span class="sub-pill">CAMPUS UNFILTERED</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="site-nav" aria-label="Quick Navigation">
          <a href="#events" class="nav-link">EVENTS</a>
          <a href="#my-events" class="nav-link">
            MY PASSES 
            <span class="badge-count">{{ eventService.myEventsCount() }}</span>
          </a>
          <a href="#sponsors" class="nav-link">SPONSORS</a>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <!-- Audio Beat Toggle -->
          <button 
            (click)="audioService.toggleBeat()" 
            class="action-pill audio-pill" 
            [class.playing]="audioService.isPlaying()"
            title="Toggle Web Audio Disco Beat"
          >
            <span class="audio-bars">
              <span class="bar"></span><span class="bar"></span><span class="bar"></span>
            </span>
            <span class="action-text">{{ audioService.isPlaying() ? 'BEAT ON' : 'BEAT' }}</span>
          </button>

          <!-- Theme Toggle Switch -->
          <button 
            (click)="eventService.toggleTheme()" 
            class="action-pill theme-pill"
            [title]="eventService.currentTheme() === 'dark' ? 'Switch to Disco Light' : 'Switch to After Dark'"
          >
            <span class="toggle-icon">{{ eventService.currentTheme() === 'dark' ? '⚡' : '🪩' }}</span>
            <span class="action-text">{{ eventService.currentTheme() === 'dark' ? 'DARK' : 'LIGHT' }}</span>
          </button>

          <!-- Register CTA (Desktop / Tablet) -->
          <a href="#events" class="btn btn-lime header-cta">
            <span>REGISTER</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            (click)="toggleMobileMenu()" 
            class="mobile-menu-toggle"
            [class.open]="mobileMenuOpen()"
            aria-label="Toggle navigation menu"
            [attr.aria-expanded]="mobileMenuOpen()"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>

      <!-- Mobile Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <div class="mobile-nav-drawer come-in">
          <a href="#events" (click)="closeMobileMenu()" class="mob-link">
            <span>⚡ EXPLORE EVENTS</span>
          </a>
          <a href="#my-events" (click)="closeMobileMenu()" class="mob-link">
            <span>🎟️ MY PASSES ({{ eventService.myEventsCount() }})</span>
          </a>
          <a href="#sponsors" (click)="closeMobileMenu()" class="mob-link">
            <span>🤝 SPONSORS & PARTNERS</span>
          </a>
          <a href="#about" (click)="closeMobileMenu()" class="mob-link">
            <span>🐾 MEET MISO & ABOUT</span>
          </a>
          <a href="#contact" (click)="closeMobileMenu()" class="mob-link">
            <span>📍 VENUE MAP & HELPLINE</span>
          </a>
          <a href="#events" (click)="closeMobileMenu()" class="btn btn-lime w-100 mob-cta">
            <span>REGISTER FOR A CLASH NOW</span>
          </a>
        </div>
      }
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background-color: var(--header-bg);
      border-bottom: 2px solid var(--border-color);
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .header-container {
      max-width: var(--max-w);
      margin: 0 auto;
      padding: 10px 24px;
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
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      background: var(--purple-midnight);
      border: 1px solid var(--purple-neon);
      color: var(--accent-lime);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
      white-space: nowrap;
    }

    .site-nav {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .nav-link {
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: var(--text-secondary);
      position: relative;
      text-decoration: none;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
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
      font-size: 0.65rem;
      font-weight: 900;
      background: var(--accent-lime);
      color: #000;
      border-radius: var(--radius-pill);
      padding: 0 4px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .action-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--purple-midnight);
      border: 1.5px solid var(--border-color);
      padding: 7px 12px;
      border-radius: var(--radius-pill);
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--text-main);
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .action-pill:hover {
      border-color: var(--accent-lime);
      transform: translateY(-2px);
    }

    .action-text {
      font-size: 0.72rem;
      letter-spacing: 0.05em;
    }

    .audio-bars {
      display: inline-flex;
      align-items: flex-end;
      gap: 2px;
      height: 11px;
    }

    .audio-bars .bar {
      width: 2.5px;
      height: 4px;
      background: var(--text-muted);
      border-radius: 1px;
    }

    .audio-pill.playing .audio-bars .bar {
      background: var(--accent-lime);
      animation: soundBounce 0.5s infinite alternate;
    }

    .audio-pill.playing .audio-bars .bar:nth-child(2) { animation-delay: 0.15s; }
    .audio-pill.playing .audio-bars .bar:nth-child(3) { animation-delay: 0.3s; }

    @keyframes soundBounce {
      0% { height: 3px; }
      100% { height: 11px; }
    }

    .header-cta {
      padding: 8px 18px;
      font-size: 0.8rem;
      letter-spacing: 0.05em;
    }

    /* Mobile Hamburger Button */
    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-around;
      width: 32px;
      height: 32px;
      background: transparent;
      border: none;
      padding: 4px;
      cursor: pointer;
    }

    .mobile-menu-toggle span {
      width: 100%;
      height: 2.5px;
      background: var(--accent-lime);
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .mobile-menu-toggle.open span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .mobile-menu-toggle.open span:nth-child(2) {
      opacity: 0;
    }
    .mobile-menu-toggle.open span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }

    /* Mobile Drawer */
    .mobile-nav-drawer {
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: var(--purple-midnight);
      border-bottom: 2px solid var(--purple-neon);
      padding: 20px 24px;
    }

    .mob-link {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-main);
      text-decoration: none;
      padding: 8px 0;
      border-bottom: 1px solid var(--border-subtle);
    }

    .mob-link:hover {
      color: var(--accent-lime);
    }

    .mob-cta {
      margin-top: 10px;
      padding: 12px;
      font-size: 0.95rem;
    }

    /* Tablet & Mobile Media Queries */
    @media (max-width: 900px) {
      .site-nav { display: none; }
      .mobile-menu-toggle { display: flex; }
      .sub-pill { display: none; }
    }

    @media (max-width: 540px) {
      .header-container { padding: 8px 14px; gap: 8px; }
      .raw-brush-logo { font-size: 2.2rem; }
      .header-cta { display: none; }
      .action-pill { padding: 5px 8px; font-size: 0.7rem; }
      .action-text { display: none; } /* keep icons on very small screens */
    }
  `]
})
export class HeaderComponent {
  readonly eventService = inject(EventService);
  readonly audioService = inject(AudioService);

  readonly mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
