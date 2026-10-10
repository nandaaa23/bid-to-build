import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sponsor } from '../../models/event.model';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="sponsors-section come-in" id="sponsors">
      
      <div class="section-head">
        <div class="badge-pill sway-item">
          <span>🤝 POWERING RAW '26</span>
        </div>
        <h2 class="section-title font-brush">
          SPONSORS & <span class="highlight-lime">PARTNERS</span>
        </h2>
        <p class="section-subtitle">
          Fueling student innovation, high-octane stage sound, and underground campus culture.
        </p>
      </div>

      <!-- Sponsors Bento Grid -->
      <div class="sponsors-grid">
        
        <!-- Title Sponsor Card (Big Feature) -->
        <div class="sponsor-card sponsor-title-card bento-card sway-slow">
          <div class="tier-tag title-tag font-brush">TITLE PARTNER</div>
          <div class="sponsor-brand font-distressed">RED BULL</div>
          <p class="sponsor-role">Official Energy & Action Sports Partner</p>
          <div class="sponsor-perk">⚡ Fueling 3 Days of Non-stop Coding & Dance Battles</div>
        </div>

        <!-- Powered By Card -->
        <div class="sponsor-card sponsor-power-card bento-card sway-reverse">
          <div class="tier-tag power-tag font-brush">POWERED BY</div>
          <div class="sponsor-brand font-brush">KSUM</div>
          <p class="sponsor-role">Kerala Startup Mission</p>
          <div class="sponsor-perk">🚀 Innovation & Incubation Partner</div>
        </div>

        <!-- Tech Partner 1: GitHub -->
        <div class="sponsor-card sponsor-mini bento-card">
          <div class="tier-tag tech-tag">TECH PARTNER</div>
          <div class="sponsor-brand font-brush">GITHUB</div>
          <p class="sponsor-role">CodeStorm Hack Platform</p>
        </div>

        <!-- Tech Partner 2: Figma -->
        <div class="sponsor-card sponsor-mini bento-card">
          <div class="tier-tag tech-tag">DESIGN PARTNER</div>
          <div class="sponsor-brand font-brush">FIGMA</div>
          <p class="sponsor-role">CanvasClash Arena</p>
        </div>

        <!-- Entertainment Partner: Spotify -->
        <div class="sponsor-card sponsor-mini bento-card">
          <div class="tier-tag tech-tag">AUDIO PARTNER</div>
          <div class="sponsor-brand font-brush">SPOTIFY</div>
          <p class="sponsor-role">Neon Rave Official Beats</p>
        </div>

        <!-- Media Partner: Red FM -->
        <div class="sponsor-card sponsor-mini bento-card">
          <div class="tier-tag tech-tag">RADIO PARTNER</div>
          <div class="sponsor-brand font-brush">RED FM 93.5</div>
          <p class="sponsor-role">Bajaate Raho On Campus</p>
        </div>

      </div>

      <!-- Sponsor CTA Box -->
      <div class="sponsor-cta-banner bento-card">
        <div class="cta-content">
          <h3 class="font-brush">WANT TO BRING YOUR BRAND TO RAW '26?</h3>
          <p>Reach over 3,000+ passionate engineers, designers, and college students across South India.</p>
        </div>
        <a href="mailto:sponsors&#64;lbsitw.ac.in" class="btn btn-lime">
          <span>PARTNER WITH US</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>

    </section>
  `,
  styles: [`
    .sponsors-section {
      margin-bottom: 70px;
    }

    .section-head {
      margin-bottom: 30px;
    }

    .badge-pill {
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
      line-height: 1;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    .highlight-lime {
      color: var(--accent-lime);
      text-shadow: 2px 2px 0px var(--purple-abyss);
    }

    .section-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
    }

    .sponsors-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .sponsor-title-card {
      grid-column: span 7;
      background: linear-gradient(135deg, var(--purple-midnight) 0%, var(--purple-deep) 100%);
      border: 2px solid var(--accent-lime);
      box-shadow: 0 10px 30px rgba(215, 255, 100, 0.25);
      padding: 32px;
    }

    .sponsor-power-card {
      grid-column: span 5;
      background: linear-gradient(135deg, var(--purple-deep) 0%, var(--purple-abyss) 100%);
      border: 2px solid var(--purple-neon);
      padding: 32px;
    }

    .sponsor-mini {
      grid-column: span 3;
      padding: 24px;
      text-align: center;
      background: var(--bg-card);
      border: 1.5px solid var(--border-color);
      transition: all 0.2s ease;
    }

    .sponsor-mini:hover {
      border-color: var(--accent-lime);
      transform: translateY(-4px);
    }

    .tier-tag {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      margin-bottom: 12px;
    }

    .title-tag {
      background: var(--accent-lime);
      color: #000;
    }

    .power-tag {
      background: var(--purple-electric);
      color: #FFFFFF;
    }

    .tech-tag {
      background: var(--purple-midnight);
      border: 1px solid var(--purple-neon);
      color: var(--purple-neon);
      font-size: 0.68rem;
    }

    .sponsor-brand {
      font-size: 2.8rem;
      color: var(--text-main);
      line-height: 1;
      margin-bottom: 6px;
    }

    .sponsor-role {
      font-size: 0.88rem;
      color: var(--text-secondary);
      font-weight: 600;
    }

    .sponsor-perk {
      margin-top: 14px;
      padding-top: 10px;
      border-top: 1px dashed var(--purple-electric);
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--accent-lime);
    }

    .sponsor-cta-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 26px 36px;
      background: var(--purple-midnight);
      border: 2px dashed var(--purple-neon);
      flex-wrap: wrap;
    }

    .cta-content h3 {
      font-size: 1.6rem;
      color: var(--accent-lime);
      margin-bottom: 4px;
    }

    .cta-content p {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    @media (max-width: 992px) {
      .sponsor-title-card, .sponsor-power-card { grid-column: span 12; }
      .sponsor-mini { grid-column: span 6; }
    }

    @media (max-width: 600px) {
      .sponsor-mini { grid-column: span 12; }
    }
  `]
})
export class SponsorsComponent {}
