import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  readonly isPlaying = signal<boolean>(false);

  private audioCtx: AudioContext | null = null;
  private timer: any = null;
  private step: number = 0;

  toggleBeat(): void {
    if (this.isPlaying()) {
      this.stop();
    } else {
      this.start();
    }
  }

  private start(): void {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.step = 0;
    const tempo = 124;
    const stepMs = (60 / tempo / 4) * 1000;

    const bassNotes = [
      87.31, 0, 87.31, 0,
      103.83, 0, 116.54, 0,
      87.31, 0, 87.31, 130.81,
      116.54, 0, 103.83, 0
    ];

    this.timer = setInterval(() => {
      if (!this.audioCtx) return;
      const t = this.audioCtx.currentTime;

      // Kick drum on 1, 5, 9, 13
      if (this.step % 4 === 0) {
        this.playKick(t);
      }

      // Hi-hat on 3, 7, 11, 15
      if (this.step % 2 === 0) {
        this.playHiHat(t, this.step % 4 !== 0);
      }

      // Disco bassline
      const freq = bassNotes[this.step % 16];
      if (freq > 0) {
        this.playBass(t, freq);
      }

      this.step = (this.step + 1) % 16;
    }, stepMs);

    this.isPlaying.set(true);
  }

  private stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isPlaying.set(false);
  }

  private playKick(t: number): void {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 0.12);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.14);
  }

  private playHiHat(t: number, isOpen: boolean): void {
    if (!this.audioCtx) return;
    const len = this.audioCtx.sampleRate * (isOpen ? 0.08 : 0.03);
    const buf = this.audioCtx.createBuffer(1, len, this.audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buf;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7500;

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(isOpen ? 0.35 : 0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isOpen ? 0.08 : 0.03));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    noise.start(t);
  }

  private playBass(t: number, freq: number): void {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t);

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.exponentialRampToValueAtTime(120, t + 0.16);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }
}
