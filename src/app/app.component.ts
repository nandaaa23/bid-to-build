import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { DaysTimerComponent } from './components/days-timer/days-timer.component';
import { EventsDiscoveryComponent } from './components/events-discovery/events-discovery.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { TrailerModalComponent } from './components/trailer-modal/trailer-modal.component';
import { FloatingMisoComponent } from './components/floating-miso/floating-miso.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PreloaderComponent,
    HeaderComponent,
    HeroComponent,
    DaysTimerComponent,
    EventsDiscoveryComponent,
    MyEventsComponent,
    SponsorsComponent,
    AboutComponent,
    FooterComponent,
    RegistrationModalComponent,
    SuccessModalComponent,
    TrailerModalComponent,
    FloatingMisoComponent
  ],
  template: `
    <!-- Preloader Animation -->
    <app-preloader />

    <!-- Ambient Disco Glow Beams -->
    <div class="ambient-beams" aria-hidden="true">
      <div class="beam-ray beam-purple-dark"></div>
      <div class="beam-ray beam-lime-glow"></div>
    </div>

    <!-- Header (Decluttered & Clean) -->
    <app-header />

    <!-- Main Content Container with Scroll-Triggered Slide-Ins -->
    <main class="container">
      <app-hero />
      <app-days-timer class="scroll-reveal" />
      <app-events-discovery class="scroll-reveal" />
      <app-my-events class="scroll-reveal" />
      <app-sponsors class="scroll-reveal" />
      <app-about class="scroll-reveal" />
    </main>

    <!-- Supercharged Footer -->
    <app-footer class="scroll-reveal" />

    <!-- Modals -->
    <app-registration-modal />
    <app-success-modal />
    <app-trailer-modal />

    <!-- Cancel Confirmation Modal -->
    @if (eventService.pendingCancelPass(); as pass) {
      <div class="modal-backdrop" (click)="closeCancelModal()">
        <div class="cancel-modal-card bento-card come-in" (click)="$event.stopPropagation()">
          <h3 class="font-brush cancel-title">CANCEL EVENT PASS?</h3>
          <p class="cancel-desc">
            Are you sure you want to cancel your pass for <strong>{{ pass.eventName }}</strong>? 
            Your seat will be restored to other students.
          </p>
          <div class="cancel-btns-row">
            <button (click)="confirmCancel(pass.id)" class="btn btn-danger">YES, CANCEL PASS</button>
            <button (click)="closeCancelModal()" class="btn btn-outline">KEEP MY PASS</button>
          </div>
        </div>
      </div>
    }

    <!-- Floating Interactive Miso Companion -->
    <app-floating-miso />
  `,
  styles: [`
    main.container {
      position: relative;
      z-index: 2;
      padding-top: 24px;
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: var(--modal-bg);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .cancel-modal-card {
      width: 100%;
      max-width: 440px;
      background: var(--bg-card);
      border: 2px solid var(--purple-neon);
      padding: 32px 28px;
      text-align: center;
    }

    .cancel-title {
      font-size: 2rem;
      color: var(--raw-danger);
      margin-bottom: 10px;
    }

    .cancel-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 24px;
    }

    .cancel-btns-row {
      display: flex;
      gap: 12px;
    }

    .cancel-btns-row button {
      flex: 1;
    }
  `]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  readonly eventService = inject(EventService);

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.initScrollRevealObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  closeCancelModal(): void {
    this.eventService.pendingCancelPass.set(null);
  }

  confirmCancel(regId: string): void {
    this.eventService.cancelRegistration(regId);
    this.closeCancelModal();
  }

  private initScrollRevealObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    // Observe all scroll-reveal elements
    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
      elements.forEach(el => this.observer?.observe(el));
    }, 200);
  }
}
