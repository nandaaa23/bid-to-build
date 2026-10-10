import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section" id="hero">
      <div class="hero-bento-grid">
        
        <!-- Big Bento Card: RAW Giant Brush Headline + Subtitle Pill -->
        <div class="bento-card hero-main-card come-in">
          
          <div class="hero-top-strip">
            <div class="subtitle-badge sway-item">
              <span class="lightning-icon">⚡</span>
              <span>CAMPUS UNFILTERED // 2026</span>
            </div>
            <div class="fest-motto">"THE FEST. THE FREEDOM. THE CHAOS."</div>
          </div>

          <!-- The Fest Name is strictly RAW with brush font! -->
          <div class="headline-container">
            <h1 class="hero-raw-title font-brush">
              RAW<span class="dot-period">.</span>
            </h1>
            <div class="headline-splatter-tag">
              <span class="splatter-bracket">[</span>
              <span class="splatter-text">ANNUAL CULTURAL & TECH CARNIVAL</span>
              <span class="splatter-bracket">]</span>
            </div>
          </div>

          <p class="hero-description come-in-stagger-1">
            This isn't just a fest. It's your stage. Your unfiltered energy. 
            Join 3 electrifying days of coding warfare, underground synth battles, street art clashes, and pure campus adrenaline at LBSITW.
          </p>

          <div class="hero-cta-group come-in-stagger-2">
            <a href="#events" class="btn btn-lime btn-lg sway-item">
              <span>EXPLORE 7 CLASHES</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <button (click)="eventService.showTrailer.set(true)" class="btn btn-purple btn-lg">
              <span class="play-icon">▶</span>
              <span>WATCH TEASER</span>
            </button>
          </div>

          <!-- Marquee Ticker inside hero -->
          <div class="hero-ticker-bar">
            <div class="ticker-roller">
              <span>★ RAW '26</span>
              <span>• LBS INSTITUTE OF TECHNOLOGY FOR WOMEN</span>
              <span>★ POOJAPPURA, THIRUVANANTHAPURAM</span>
              <span>• 7 TITAN EVENTS</span>
              <span>★ DISCO AFTERHOURS</span>
              <span>• VIBIN' WITH MISO</span>
              <span>★ MARCH 15-17, 2026</span>
              <span>★ RAW '26</span>
              <span>• LBS INSTITUTE OF TECHNOLOGY FOR WOMEN</span>
            </div>
          </div>

        </div>

        <!-- Bento Card 2: Interactive Disco Ball & Miso Mascot Card -->
        <div class="bento-card hero-disco-card come-in-stagger-1">
          
          <div class="disco-canvas-wrap">
            <canvas #discoCanvas width="300" height="300" title="Drag to spin the 3D Disco Ball!"></canvas>
            
            <div class="disco-pill-controls">
              <span class="drag-hint">🪩 DRAG TO SPIN</span>
              <button (click)="triggerFlare()" class="btn-flare">✨ FLARE</button>
            </div>
          </div>

          <!-- Miso Hero Mascot with Sway Animation -->
          <div class="miso-hero-wrap sway-reverse">
            <div class="miso-bubble">
              <span>vibin' with you! 🎧</span>
            </div>
            <img 
              src="assets/miso_portrait_trans.png" 
              alt="Miso Mascot" 
              class="miso-hero-img" 
              (click)="spinMiso()"
              #misoImg
            />
            <div class="miso-badge-row">
              <span class="miso-name-tag">MISO</span>
              <span class="miso-role-tag">Chief Vibe Officer</span>
            </div>
          </div>

        </div>

        <!-- Bento Card 3: College Institution Feature -->
        <div class="bento-card college-feature-card come-in-stagger-2">
          <div class="college-top">
            <span class="crest-icon">🏛️</span>
            <span class="host-badge">HOST INSTITUTION</span>
          </div>
          <h2 class="college-title font-brush">LBS INSTITUTE OF TECHNOLOGY FOR WOMEN</h2>
          <p class="college-sub">Poojappura, Thiruvananthapuram, Kerala</p>
          <div class="college-fact">
            <span>First Women's Engineering College in Kerala • Estd 2001</span>
            <span class="arrow-ico">→</span>
          </div>
        </div>

        <!-- Bento Card 4: Quick Highlights -->
        <div class="bento-card stats-feature-card come-in-stagger-3">
          <div class="stat-item">
            <span class="stat-val font-brush">7</span>
            <span class="stat-lbl">TITAN CLASHES</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-val font-brush">₹1.5L+</span>
            <span class="stat-lbl">PRIZE POOL</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-val font-brush">3000+</span>
            <span class="stat-lbl">STUDENTS</span>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      margin-bottom: 50px;
    }

    .hero-bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 20px;
    }

    /* Main Card */
    .hero-main-card {
      grid-column: span 7;
      grid-row: span 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 38px 42px;
      background: linear-gradient(135deg, var(--bg-card) 0%, var(--purple-deep) 100%);
      border: 2px solid var(--purple-electric);
      box-shadow: 0 10px 40px rgba(104, 38, 212, 0.35);
    }

    .hero-top-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }

    .subtitle-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--purple-midnight);
      color: var(--accent-lime);
      border: 1.5px solid var(--accent-lime);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      box-shadow: 0 0 12px rgba(215, 255, 100, 0.25);
    }

    .fest-motto {
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: var(--text-secondary);
    }

    /* RAW Headline */
    .headline-container {
      margin: 10px 0 20px;
    }

    .hero-raw-title {
      font-size: clamp(5.5rem, 12vw, 9.5rem);
      color: var(--accent-lime);
      text-shadow: 6px 6px 0px var(--purple-abyss), 0 0 35px rgba(215, 255, 100, 0.4);
      line-height: 0.85;
      letter-spacing: -0.02em;
      transform: rotate(-1.5deg);
      user-select: none;
    }

    .dot-period {
      color: var(--purple-neon);
      text-shadow: 4px 4px 0px #000;
    }

    .headline-splatter-tag {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: var(--text-secondary);
      margin-top: 8px;
    }

    .splatter-bracket {
      color: var(--accent-lime);
      font-weight: 900;
    }

    .hero-description {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 540px;
      line-height: 1.6;
      margin-bottom: 26px;
    }

    .hero-cta-group {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 26px;
    }

    .play-icon {
      font-size: 0.8rem;
      color: var(--accent-lime);
    }

    .hero-ticker-bar {
      background: var(--purple-abyss);
      color: var(--accent-lime);
      border-radius: var(--radius-sm);
      padding: 8px 0;
      overflow: hidden;
      white-space: nowrap;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      border: 1px solid var(--purple-electric);
    }

    .ticker-roller {
      display: inline-flex;
      gap: 24px;
      animation: tickerRoll 22s linear infinite;
    }

    @keyframes tickerRoll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* Disco & Miso Card */
    .hero-disco-card {
      grid-column: span 5;
      grid-row: span 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      background: radial-gradient(circle at 50% 25%, var(--purple-deep) 0%, var(--bg-card) 75%);
      border: 2px solid var(--purple-electric);
      padding: 24px;
    }

    .disco-canvas-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    canvas {
      max-width: 220px;
      height: auto;
      cursor: grab;
      filter: drop-shadow(0 12px 24px rgba(104, 38, 212, 0.45));
    }

    canvas:active { cursor: grabbing; }

    .disco-pill-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid var(--purple-electric);
      border-radius: var(--radius-pill);
      padding: 4px 10px;
      margin-top: -10px;
    }

    .drag-hint {
      font-size: 0.72rem;
      font-weight: 800;
      color: #FFFFFF;
    }

    .btn-flare {
      background: var(--accent-lime);
      color: #000;
      font-size: 0.68rem;
      font-weight: 900;
      padding: 3px 8px;
      border-radius: var(--radius-pill);
      border: 1px solid #000;
      cursor: pointer;
    }

    /* Mascot Hero */
    .miso-hero-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }

    .miso-bubble {
      position: absolute;
      top: -20px;
      right: -24px;
      background: var(--accent-lime);
      color: #000;
      font-size: 0.78rem;
      font-weight: 900;
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      border: 2px solid #000;
      box-shadow: 2px 2px 0px #000;
      white-space: nowrap;
    }

    .miso-hero-img {
      width: 145px;
      height: auto;
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .miso-badge-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }

    .miso-name-tag {
      font-family: var(--font-brush);
      font-size: 0.95rem;
      background: var(--purple-electric);
      color: #FFFFFF;
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }

    .miso-role-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--text-secondary);
    }

    /* College Tile */
    .college-feature-card {
      grid-column: span 7;
      padding: 24px 30px;
      background: var(--bg-card);
      border: 2px solid var(--border-color);
    }

    .college-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .host-badge {
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      background: rgba(104, 38, 212, 0.2);
      color: var(--purple-neon);
      padding: 3px 8px;
      border-radius: var(--radius-pill);
    }

    .college-title {
      font-size: 1.55rem;
      color: var(--text-main);
      margin-bottom: 4px;
    }

    .college-sub {
      font-size: 0.88rem;
      color: var(--text-secondary);
    }

    .college-fact {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px dashed var(--border-subtle);
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--accent-lime);
    }

    /* Stats Card */
    .stats-feature-card {
      grid-column: span 5;
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: var(--purple-midnight);
      border: 2px solid var(--purple-electric);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .stat-val {
      font-size: 2.3rem;
      color: var(--accent-lime);
      text-shadow: 2px 2px 0px var(--purple-abyss);
      line-height: 1;
    }

    .stat-lbl {
      font-size: 0.7rem;
      font-weight: 800;
      color: var(--text-secondary);
      margin-top: 4px;
    }

    .stat-divider {
      width: 1px;
      height: 38px;
      background: var(--border-subtle);
    }

    @media (max-width: 1024px) {
      .hero-main-card { grid-column: span 12; }
      .hero-disco-card {
        grid-column: span 12;
        flex-direction: row;
        justify-content: space-around;
        padding: 28px 20px;
      }
      .college-feature-card { grid-column: span 7; }
      .stats-feature-card { grid-column: span 5; }
    }

    @media (max-width: 768px) {
      .hero-bento-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .hero-main-card {
        padding: 24px 18px;
      }
      .hero-raw-title {
        font-size: clamp(3.4rem, 16vw, 5.5rem);
      }
      .hero-description {
        font-size: 0.95rem;
        line-height: 1.5;
      }
      .hero-cta-group {
        flex-direction: column;
        width: 100%;
        gap: 12px;
      }
      .hero-cta-group .btn {
        width: 100%;
      }
      .hero-disco-card {
        flex-direction: column;
        gap: 20px;
        padding: 22px 16px;
      }
      .miso-hero-img {
        width: 120px;
      }
      .college-feature-card {
        padding: 20px 16px;
      }
      .college-title {
        font-size: 1.35rem;
      }
      .stats-feature-card {
        padding: 18px 12px;
      }
      .stat-val {
        font-size: 1.7rem;
      }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('discoCanvas') discoCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('misoImg') misoImgRef!: ElementRef<HTMLImageElement>;

  readonly eventService = inject(EventService);

  private animFrameId: number | null = null;
  private rotY = 0;
  private flareVal = 0;
  private isDragging = false;
  private lastX = 0;

  ngAfterViewInit(): void {
    this.initDiscoRenderer();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  triggerFlare(): void {
    this.flareVal = 1.0;
  }

  spinMiso(): void {
    const el = this.misoImgRef.nativeElement;
    el.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => { el.style.transform = ''; }, 600);
  }

  private initDiscoRenderer(): void {
    const canvas = this.discoCanvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2 - 10;
    const r = 75;

    const rings = 12;
    const facets = 24;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      // String
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, cy - r);
      ctx.strokeStyle = '#8B4EFE';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Base sphere glow with dark purple
      const base = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 5, cx, cy, r * 1.2);
      base.addColorStop(0, '#FFFFFF');
      base.addColorStop(0.4, '#6826D4');
      base.addColorStop(1, '#1A0933');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = base;
      ctx.fill();

      // Mirror Facets
      for (let ri = 0; ri < rings; ri++) {
        const phi = (ri / rings) * Math.PI - Math.PI / 2;
        const ringR = r * Math.cos(phi);
        const y = cy + r * Math.sin(phi);

        for (let fi = 0; fi < facets; fi++) {
          const theta = (fi / facets) * Math.PI * 2 + this.rotY;
          const x3d = ringR * Math.sin(theta);
          const z3d = ringR * Math.cos(theta);

          if (z3d > 0) {
            const x = cx + x3d;
            const fw = (Math.PI * 2 * ringR / facets) * 0.9;
            const fh = (r * Math.PI / rings) * 0.9;
            const normZ = z3d / r;
            const specular = Math.pow(Math.max(0, normZ * (0.6 + 0.4 * Math.sin(theta * 2 + this.rotY * 2))), 2);

            ctx.save();
            ctx.translate(x, y);
            ctx.beginPath();
            ctx.rect(-fw / 2, -fh / 2, fw, fh);

            if (specular > 0.75 || Math.random() < (0.02 + this.flareVal * 0.1)) {
              ctx.fillStyle = '#FFFFFF';
            } else if (specular > 0.45) {
              ctx.fillStyle = '#D7FF64'; // Acid lime reflection
            } else {
              const shade = Math.floor(120 + normZ * 80);
              ctx.fillStyle = `rgb(${shade}, ${shade - 20}, ${shade + 40})`;
            }
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Specular Flare
      if (this.flareVal > 0) {
        ctx.save();
        const flare = ctx.createRadialGradient(cx, cy, 5, cx, cy, r * 1.8);
        flare.addColorStop(0, `rgba(255, 255, 255, ${this.flareVal * 0.9})`);
        flare.addColorStop(0.3, `rgba(215, 255, 100, ${this.flareVal * 0.6})`);
        flare.addColorStop(0.7, `rgba(104, 38, 212, ${this.flareVal * 0.4})`);
        flare.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = flare;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        this.flareVal = Math.max(0, this.flareVal - 0.02);
      }

      if (!this.isDragging) {
        this.rotY += 0.015;
      }

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);

    // Drag handlers
    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastX;
      this.rotY += dx * 0.015;
      this.lastX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }
}
