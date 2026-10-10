import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about-section come-in" id="about">
      <div class="about-bento-grid">
        
        <!-- Bento 1: About the Festival & LBSITW -->
        <div class="bento-card about-manifesto-card">
          <div class="manifesto-pill sway-item">
            <span>ABOUT RAW '26</span>
          </div>

          <h2 class="about-title font-brush">NOT YOUR AVERAGE COLLEGE FEST.</h2>
          
          <p class="about-text">
            Born out of raw student rebellion, late-night hack marathons, and an unapologetic disco pulse, 
            <strong>RAW</strong> is the annual cultural and technical flagship spectacle of 
            <strong>LBS Institute of Technology for Women</strong>, Poojappura, Thiruvananthapuram.
          </p>
          
          <p class="about-text">
            For three days, we shatter traditional barriers and turn the campus into an electric open arena of 
            code, poetry, heavyweight robotics, street murals, and bass-heavy afterhours.
          </p>

          <div class="quote-callout">
            <span class="quote-symbol font-brush">“</span>
            <span class="quote-text font-brush">NO FILTERS. NO MASKS. JUST PURE UNFILTERED ADRENALINE.</span>
          </div>
        </div>

        <!-- Bento 2: Meet Miso Detailed Bento -->
        <div class="bento-card miso-bio-card">
          <div class="bio-top">
            <span class="mascot-badge font-brush">OFFICIAL MASCOT</span>
            <h3 class="miso-name font-brush">MISO THE CAT</h3>
          </div>

          <div class="miso-features-list">
            <div class="feature-item">
              <span class="feat-ico">⚡</span>
              <div>
                <strong>Lightning Forehead</strong>
                <p>Infinite spark of engineering & artistic creativity</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feat-ico">🎧</span>
              <div>
                <strong>Purple Headphones</strong>
                <p>Locked into underground disco grooves 24/7</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feat-ico">🧥</span>
              <div>
                <strong>Violet Streetwear Hoodie</strong>
                <p>Authentic RAW campus swag & rebellion</p>
              </div>
            </div>
          </div>

          <!-- Poses Row -->
          <div class="poses-row">
            <div class="pose-box sway-item" title="Music Mode">
              <img src="assets/miso_music_trans.png" alt="DJ Miso" />
              <span>MUSIC</span>
            </div>
            <div class="pose-box sway-reverse" title="Code Mode">
              <img src="assets/miso_code_trans.png" alt="Code Miso" />
              <span>CODE</span>
            </div>
            <div class="pose-box sway-item" title="Dance Mode">
              <img src="assets/miso_dance_trans.png" alt="Dance Miso" />
              <span>DANCE</span>
            </div>
            <div class="pose-box sway-reverse" title="Camera Mode">
              <img src="assets/miso_camera_trans.png" alt="Camera Miso" />
              <span>VISUALS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .about-section {
      margin-bottom: 70px;
    }

    .about-bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 20px;
    }

    .about-manifesto-card {
      grid-column: span 6;
      padding: 36px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(135deg, var(--bg-card) 0%, var(--purple-midnight) 100%);
      border: 2px solid var(--purple-electric);
    }

    .manifesto-pill {
      display: inline-block;
      background: var(--purple-deep);
      border: 1.5px solid var(--accent-lime);
      color: var(--accent-lime);
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      margin-bottom: 16px;
      align-self: flex-start;
    }

    .about-title {
      font-size: 2.6rem;
      color: var(--text-main);
      line-height: 1.05;
      margin-bottom: 16px;
    }

    .about-text {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 14px;
    }

    .quote-callout {
      background: var(--purple-midnight);
      border-left: 4px solid var(--accent-lime);
      padding: 14px 20px;
      border-radius: var(--radius-sm);
      margin-top: 14px;
    }

    .quote-symbol {
      color: var(--accent-lime);
      font-size: 1.8rem;
      line-height: 1;
      display: block;
    }

    .quote-text {
      font-size: 1.15rem;
      color: var(--text-main);
      letter-spacing: 0.03em;
    }

    .miso-bio-card {
      grid-column: span 6;
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: radial-gradient(circle at top right, var(--purple-deep) 0%, var(--bg-card) 75%);
      border: 2px solid var(--purple-electric);
    }

    .bio-top {
      margin-bottom: 18px;
    }

    .mascot-badge {
      background: var(--purple-midnight);
      border: 1px solid var(--purple-neon);
      color: var(--purple-neon);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
    }

    .miso-name {
      font-size: 2.4rem;
      color: var(--accent-lime);
      margin-top: 6px;
    }

    .miso-features-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 22px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .feat-ico {
      width: 40px;
      height: 40px;
      background: var(--purple-midnight);
      border: 1px solid var(--purple-electric);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .feature-item strong {
      display: block;
      color: var(--text-main);
      font-size: 0.9rem;
    }

    .feature-item p {
      color: var(--text-secondary);
      font-size: 0.82rem;
    }

    .poses-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: var(--purple-midnight);
      padding: 12px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-subtle);
    }

    .pose-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 0.7rem;
      font-weight: 800;
      color: var(--text-secondary);
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .pose-box:hover {
      transform: translateY(-5px);
      color: var(--accent-lime);
    }

    .pose-box img {
      width: 46px;
      height: 46px;
      object-fit: contain;
    }

    @media (max-width: 1024px) {
      .about-manifesto-card, .miso-bio-card { grid-column: span 12; }
    }
  `]
})
export class AboutComponent {}
