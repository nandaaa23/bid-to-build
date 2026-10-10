import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-miso',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!hidden()) {
      <aside class="floating-miso-widget">
        
        <!-- Speech Bubble -->
        @if (showBubble()) {
          <div class="miso-bubble come-in">
            <span>{{ currentQuote() }}</span>
            <button (click)="hideBubble($event)" class="btn-dismiss-bubble">✕</button>
          </div>
        }

        <!-- Mascot Avatar with Click to Spin -->
        <div (click)="onMisoClick()" class="miso-avatar-box sway-item" title="Click MISO for festival tips!">
          <img src="assets/miso_peek_trans.png" alt="Miso Companion" class="miso-avatar-img" />
          <span class="click-chip font-brush">CLICK!</span>
        </div>

        <button (click)="dismissMascot()" class="btn-hide-mascot">
          <span>Hide Miso</span>
        </button>

      </aside>
    }
  `,
  styles: [`
    .floating-miso-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 90;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .miso-bubble {
      max-width: 240px;
      background: var(--accent-lime);
      color: #000;
      font-size: 0.8rem;
      font-weight: 800;
      line-height: 1.4;
      padding: 10px 14px;
      border-radius: 18px 18px 4px 18px;
      border: 2px solid #000;
      box-shadow: 3px 3px 0px #000;
      margin-bottom: 8px;
      position: relative;
    }

    .btn-dismiss-bubble {
      position: absolute;
      top: -8px;
      left: -8px;
      width: 20px;
      height: 20px;
      background: #000;
      color: #fff;
      border-radius: 50%;
      border: 1px solid #fff;
      font-size: 0.65rem;
      cursor: pointer;
    }

    .miso-avatar-box {
      cursor: pointer;
      position: relative;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .miso-avatar-box:hover {
      transform: scale(1.15) rotate(5deg);
    }

    .miso-avatar-img {
      width: 72px;
      height: auto;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
    }

    .click-chip {
      position: absolute;
      bottom: 0;
      right: 0;
      background: var(--purple-electric);
      color: #FFFFFF;
      font-size: 0.65rem;
      padding: 2px 5px;
      border-radius: var(--radius-sm);
      border: 1px solid #000;
    }

    .btn-hide-mascot {
      margin-top: 4px;
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 0.65rem;
      text-decoration: underline;
      cursor: pointer;
    }

    .btn-hide-mascot:hover {
      color: var(--text-main);
    }

    @media (max-width: 768px) {
      .floating-miso-widget { bottom: 16px; right: 16px; }
      .miso-avatar-img { width: 56px; }
      .miso-bubble { max-width: 190px; font-size: 0.75rem; }
    }
  `]
})
export class FloatingMisoComponent {
  readonly hidden = signal<boolean>(false);
  readonly showBubble = signal<boolean>(true);

  private readonly quotes = [
    'Psst! March 15 is approaching fast. Have you secured your pass? 🐾',
    'Did you know? LBSITW is the first women\'s engineering college in Kerala! 🎓',
    'CodeStorm seats are filling fast! Don\'t sleep on it! ⚡',
    'Hit the BEAT button in the header for some live disco energy! 🪩',
    'Check out the SPONSORS section! Big brands powering RAW \'26! 🤝',
    'Click me for another campus secret! ✨'
  ];

  private quoteIndex = 0;
  readonly currentQuote = signal<string>(this.quotes[0]);

  onMisoClick(): void {
    this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
    this.currentQuote.set(this.quotes[this.quoteIndex]);
    this.showBubble.set(true);
  }

  hideBubble(e: Event): void {
    e.stopPropagation();
    this.showBubble.set(false);
  }

  dismissMascot(): void {
    this.hidden.set(true);
  }
}
