import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <footer class="site-footer" id="contact">
      <div class="footer-container">
        
        <!-- Big Top Banner: Newsletter / Drops Signup -->
        <div class="footer-drops-banner bento-card come-in">
          <div class="drops-text">
            <span class="drops-badge font-brush">STAY UNFILTERED</span>
            <h3 class="drops-title font-brush">GET SECRET LINEUP DROPS & PASS ALERTS</h3>
            <p>Be the first to know about surprise artist entries, hackathon prompts, and midnight stage schedules.</p>
          </div>

          <form (submit)="handleSubscribe($event)" class="drops-form">
            <input 
              type="email" 
              [(ngModel)]="emailInput" 
              name="subscriberEmail" 
              placeholder="Enter your student email..." 
              required
              class="drops-input"
            />
            <button type="submit" class="btn btn-lime">
              <span>{{ subscribed() ? 'SUBSCRIBED ✓' : 'JOIN THE VIBE' }}</span>
            </button>
          </form>
        </div>

        <!-- Main Footer Columns -->
        <div class="footer-cols-grid">
          
          <!-- Column 1: Brand & Institutional Identity -->
          <div class="footer-col brand-col">
            <div class="footer-brand-header">
              <span class="raw-footer-logo font-brush">RAW</span>
              <span class="footer-sub-pill">CAMPUS UNFILTERED</span>
            </div>

            <p class="footer-tagline font-brush">"THIS ISN'T JUST A FEST. IT'S RAW." ⚡</p>
            
            <div class="college-info-block">
              <strong>LBS INSTITUTE OF TECHNOLOGY FOR WOMEN</strong>
              <p>Poojappura, Thiruvananthapuram, Kerala — 695012</p>
              <span class="college-credit">Pioneering First Women's Engineering College in Kerala</span>
            </div>

            <!-- Mascot Footer Chill -->
            <div class="footer-miso-chill sway-item">
              <img src="assets/bottom_miso_trans.png" alt="Miso chilling" class="footer-miso-img" />
              <div class="chill-speech">
                <span>"Catch you at the disco afterhours!" 🐾</span>
              </div>
            </div>
          </div>

          <!-- Column 2: Campus Venues Quick Locator -->
          <div class="footer-col venues-col">
            <h4 class="col-title font-brush">CAMPUS VENUE MAP</h4>
            <ul class="venues-list">
              <li>
                <span class="v-ico">🏢</span>
                <div>
                  <strong>Computer Lab Block</strong>
                  <span>Lab 4 & 5 • CodeStorm Arena</span>
                </div>
              </li>
              <li>
                <span class="v-ico">🎭</span>
                <div>
                  <strong>Main Open Amphitheatre</strong>
                  <span>Open Stage • Dionysia & Neon Rave</span>
                </div>
              </li>
              <li>
                <span class="v-ico">⚙️</span>
                <div>
                  <strong>Workshop Area (Mech Bay)</strong>
                  <span>360° Steel Cage • RoboWar</span>
                </div>
              </li>
              <li>
                <span class="v-ico">🎨</span>
                <div>
                  <strong>Design Studio & Courtyard</strong>
                  <span>Neo-Murals • CanvasClash</span>
                </div>
              </li>
              <li>
                <span class="v-ico">🏛️</span>
                <div>
                  <strong>Auditorium Main Hall</strong>
                  <span>Acoustic Stage • Syncra & Carpe Dictum</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Column 3: Contact & Helplines -->
          <div class="footer-col contact-col">
            <h4 class="col-title font-brush">GET IN TOUCH</h4>
            <div class="contact-links-list">
              <div class="contact-item">
                <span class="c-ico">✉</span>
                <div>
                  <span class="c-lbl">Official Fest Mail:</span>
                  <a href="mailto:raw&#64;lbsitw.ac.in" class="c-link">raw&#64;lbsitw.ac.in</a>
                </div>
              </div>
              <div class="contact-item">
                <span class="c-ico">📞</span>
                <div>
                  <span class="c-lbl">Student Helpline:</span>
                  <a href="tel:+919876543210" class="c-link">+91 98765 43210</a>
                </div>
              </div>
              <div class="contact-item">
                <span class="c-ico">📍</span>
                <div>
                  <span class="c-lbl">Location:</span>
                  <span class="c-text">Poojappura, TVM, Kerala</span>
                </div>
              </div>
            </div>

            <h4 class="col-title font-brush mt-4">JOIN THE COMMUNITY</h4>
            <div class="social-pills-row">
              <a href="#" class="social-pill" title="Instagram">
                <span>📸 &#64;raw_lbsitw</span>
              </a>
              <a href="#" class="social-pill" title="Discord">
                <span>💬 RAW Discord</span>
              </a>
              <a href="#" class="social-pill" title="Spotify">
                <span>🎧 Fest Playlist</span>
              </a>
              <a href="#" class="social-pill" title="YouTube">
                <span>📺 RAW TV</span>
              </a>
            </div>
          </div>

        </div>

        <!-- Bottom Bar: Live Weather/Clock & Copyright -->
        <div class="footer-bottom-bar">
          <div class="live-status-pill">
            <span class="live-radar"></span>
            <span>📍 Thiruvananthapuram, Kerala • 28°C Clear • 23 Days to Fest</span>
          </div>

          <p class="copyright-note">
            &copy; 2026 RAW Festival Committee • LBS Institute of Technology for Women. Built with pure campus energy.
          </p>

          <div class="demo-tag">
            <span>Frontend Angular Prototype</span>
          </div>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: linear-gradient(180deg, var(--bg-main) 0%, var(--purple-abyss) 100%);
      border-top: 2px solid var(--purple-neon);
      padding: 70px 0 30px;
      position: relative;
      z-index: 2;
    }

    .footer-container {
      max-width: var(--max-w);
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Drops Signup Banner */
    .footer-drops-banner {
      background: linear-gradient(135deg, var(--purple-midnight) 0%, var(--purple-deep) 100%);
      border: 2px solid var(--accent-lime);
      box-shadow: 0 10px 30px rgba(215, 255, 100, 0.25);
      padding: 32px 40px;
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      flex-wrap: wrap;
    }

    .drops-badge {
      display: inline-block;
      background: var(--accent-lime);
      color: #000;
      padding: 3px 10px;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      margin-bottom: 6px;
    }

    .drops-title {
      font-size: 1.8rem;
      color: var(--text-main);
      margin-bottom: 4px;
    }

    .drops-text p {
      font-size: 0.9rem;
      color: var(--text-secondary);
      max-width: 500px;
    }

    .drops-form {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .drops-input {
      padding: 12px 18px;
      border-radius: var(--radius-pill);
      background: var(--purple-abyss);
      border: 1.5px solid var(--border-subtle);
      color: #FFFFFF;
      font-family: var(--font-body);
      font-size: 0.95rem;
      min-width: 260px;
    }

    .drops-input:focus {
      outline: none;
      border-color: var(--accent-lime);
    }

    /* Columns Grid */
    .footer-cols-grid {
      display: grid;
      grid-template-columns: 2fr 1.3fr 1.3fr;
      gap: 40px;
      margin-bottom: 50px;
    }

    .raw-footer-logo {
      font-size: 3.4rem;
      color: var(--accent-lime);
      text-shadow: 3px 3px 0px var(--purple-deep);
      line-height: 1;
      margin-right: 12px;
    }

    .footer-sub-pill {
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      background: var(--purple-midnight);
      border: 1px solid var(--purple-neon);
      color: var(--accent-lime);
      padding: 4px 10px;
      border-radius: var(--radius-sm);
    }

    .footer-tagline {
      font-size: 1.4rem;
      color: var(--text-main);
      margin: 12px 0 16px;
    }

    .college-info-block {
      font-size: 0.88rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .college-credit {
      font-size: 0.78rem;
      color: var(--accent-lime);
      font-weight: 700;
      display: block;
      margin-top: 4px;
    }

    .footer-miso-chill {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 14px;
    }

    .footer-miso-img {
      width: 75px;
      height: auto;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
    }

    .chill-speech {
      background: var(--purple-midnight);
      border: 1px solid var(--purple-neon);
      color: var(--accent-lime);
      font-size: 0.8rem;
      font-weight: 800;
      padding: 6px 12px;
      border-radius: var(--radius-pill);
    }

    /* Venues List */
    .col-title {
      font-size: 1.4rem;
      color: var(--text-main);
      margin-bottom: 18px;
    }

    .venues-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .venues-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.85rem;
    }

    .v-ico {
      font-size: 1.1rem;
      margin-top: 2px;
    }

    .venues-list strong {
      display: block;
      color: var(--text-main);
    }

    .venues-list span {
      color: var(--text-secondary);
      font-size: 0.78rem;
    }

    /* Contact Links */
    .contact-links-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 0.85rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .c-ico { font-size: 1.1rem; color: var(--accent-lime); }
    .c-lbl { font-size: 0.75rem; color: var(--text-muted); display: block; }
    .c-link { color: var(--accent-lime); font-weight: 800; text-decoration: none; }
    .c-text { color: var(--text-main); font-weight: 700; }

    .mt-4 { margin-top: 20px; }

    .social-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .social-pill {
      background: var(--purple-midnight);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      font-size: 0.78rem;
      font-weight: 800;
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .social-pill:hover {
      background: var(--accent-lime);
      color: #000;
      border-color: #000;
      transform: translateY(-2px);
    }

    /* Bottom Bar */
    .footer-bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 24px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.8rem;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 14px;
    }

    .live-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--purple-midnight);
      border: 1px solid var(--purple-electric);
      color: var(--text-secondary);
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .live-radar {
      width: 7px;
      height: 7px;
      background: var(--accent-lime);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-lime);
    }

    .demo-tag {
      font-family: var(--font-mono);
      color: var(--purple-neon);
    }

    @media (max-width: 992px) {
      .footer-cols-grid { grid-template-columns: 1fr; }
      .footer-drops-banner { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class FooterComponent {
  emailInput = '';
  readonly subscribed = signal<boolean>(false);

  handleSubscribe(e: Event): void {
    e.preventDefault();
    if (this.emailInput.trim()) {
      this.subscribed.set(true);
      setTimeout(() => {
        this.emailInput = '';
      }, 1000);
    }
  }
}
