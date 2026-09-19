// Procedural Web Audio engine — UI SFX + ambient LoFi synthesizer
// All audio is synthesized — no external files required

type Theme = "dark" | "light" | "anime";

interface Track {
  id: string;
  name: string;
  artist: string;
  theme: Theme;
}

export const TRACKS: Track[] = [
  { id: "lofi-space", name: "Soft Dreams", artist: "LoFi Study", theme: "dark" },
  { id: "lofi-nature", name: "A New Day", artist: "LoFi Morning", theme: "anime" },
  { id: "lofi-minimal", name: "Ambient Waves", artist: "Deep Focus", theme: "light" },
];

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = true;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private currentTheme: Theme = "dark";
  private ambientNodes: AudioNode[] = [];
  private schedulerTimeout: ReturnType<typeof setTimeout> | null = null;
  private onProgressCallback: ((t: number, dur: number) => void) | null = null;
  private progressInterval: ReturnType<typeof setInterval> | null = null;
  private trackStartTime: number = 0;
  private trackDuration: number = 120; // 2 min per track

  constructor() {
    try {
      const savedMuted = localStorage.getItem("portfolio_audio_muted");
      this.isMuted = savedMuted !== "false"; // default: muted
      const savedTheme = localStorage.getItem("portfolio_theme") as Theme | null;
      this.currentTheme = savedTheme || "dark";
      const savedTrack = localStorage.getItem("portfolio_audio_track");
      if (savedTrack) this.currentTrackIndex = parseInt(savedTrack, 10) || 0;
    } catch {}
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.5, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx?.state === "suspended") this.ctx.resume();
  }

  private stopAmbient() {
    for (const node of this.ambientNodes) {
      try { (node as OscillatorNode).stop?.(); } catch {}
      try { node.disconnect?.(); } catch {}
    }
    this.ambientNodes = [];
    if (this.schedulerTimeout) { clearTimeout(this.schedulerTimeout); this.schedulerTimeout = null; }
    if (this.progressInterval) { clearInterval(this.progressInterval); this.progressInterval = null; }
  }

  /** Schedule a reverb-like multi-tap delay on a node */
  private createReverb(ctx: AudioContext): ConvolverNode {
    const conv = ctx.createConvolver();
    const rate = ctx.sampleRate;
    const dur = 1.2;
    const len = rate * dur;
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3) * 0.6;
      }
    }
    conv.buffer = buf;
    return conv;
  }

  /** Synth a warm LoFi chord pad */
  private synthChord(
    ctx: AudioContext,
    dest: AudioNode,
    freqs: number[],
    startAt: number,
    duration: number,
    gainVal: number = 0.06
  ) {
    for (const f of freqs) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, startAt);
      // Slight vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 5;
      lfoGain.gain.value = f * 0.003;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(startAt);
      lfo.stop(startAt + duration);

      g.gain.setValueAtTime(0, startAt);
      g.gain.linearRampToValueAtTime(gainVal, startAt + 0.15);
      g.gain.setValueAtTime(gainVal, startAt + duration - 0.2);
      g.gain.linearRampToValueAtTime(0, startAt + duration);
      osc.connect(g);
      g.connect(dest);
      osc.start(startAt);
      osc.stop(startAt + duration);
      this.ambientNodes.push(osc, lfo, g, lfoGain);
    }
  }

  private playDarkTrack(ctx: AudioContext) {
    const reverb = this.createReverb(ctx);
    reverb.connect(this.masterGain!);
    this.ambientNodes.push(reverb);

    // Deep space chord progression: Dm7 - Gmaj7 - Cmaj7 - Am7
    const progression = [
      [146.83, 220, 261.63, 311.13],  // Dm7
      [196, 246.94, 293.66, 369.99],  // Gmaj7
      [261.63, 329.63, 392, 493.88],  // Cmaj7
      [220, 261.63, 329.63, 440],     // Am7
    ];

    const chordDur = 3.5;
    const now = ctx.currentTime;
    this.trackStartTime = now;

    const scheduleChords = (startTime: number, loop: number) => {
      if (loop > 200) return; // safety
      progression.forEach((chord, i) => {
        this.synthChord(ctx, reverb, chord, startTime + i * chordDur, chordDur + 0.3, 0.055);
      });
      const nextStart = startTime + progression.length * chordDur;
      this.schedulerTimeout = setTimeout(
        () => scheduleChords(nextStart, loop + 1),
        (nextStart - ctx.currentTime - 0.5) * 1000
      );
    };
    scheduleChords(now, 0);

    // Sub bass
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    const bassFilter = ctx.createBiquadFilter();
    bassFilter.type = "lowpass";
    bassFilter.frequency.value = 120;
    bass.type = "sine";
    bass.frequency.value = 55;
    bassGain.gain.value = 0.12;
    bass.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(this.masterGain!);
    bass.start();
    this.ambientNodes.push(bass, bassGain, bassFilter);

    // Subtle vinyl crackle (filtered noise)
    const bufLen = ctx.sampleRate * 2;
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.015;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const crackleFilter = ctx.createBiquadFilter();
    crackleFilter.type = "highpass";
    crackleFilter.frequency.value = 3000;
    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.02;
    noise.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(this.masterGain!);
    noise.start();
    this.ambientNodes.push(noise, crackleFilter, crackleGain);
  }

  private playAnimeTrack(ctx: AudioContext) {
    // Kalimba-inspired arpeggios — warm pentatonic
    const reverb = this.createReverb(ctx);
    reverb.connect(this.masterGain!);
    this.ambientNodes.push(reverb);

    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66];

    const scheduleArp = (startTime: number, loop: number) => {
      if (loop > 400) return;
      const pattern = [0, 2, 4, 3, 1, 4, 2, 0];
      pattern.forEach((noteIdx, step) => {
        const freq = pentatonic[noteIdx % pentatonic.length];
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        const t = startTime + step * 0.28;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.045, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc.connect(g);
        g.connect(reverb);
        osc.start(t);
        osc.stop(t + 0.55);
        this.ambientNodes.push(osc, g);
      });
      const nextStart = startTime + pattern.length * 0.28 + 0.5;
      this.schedulerTimeout = setTimeout(
        () => scheduleArp(nextStart, loop + 1),
        (nextStart - ctx.currentTime - 0.5) * 1000
      );
    };
    scheduleArp(ctx.currentTime, 0);

    // Warm pad chord (Am pentatonic)
    this.synthChord(
      ctx, reverb,
      [220, 261.63, 329.63],
      ctx.currentTime, 9999, 0.04
    );
  }

  private playLightTrack(ctx: AudioContext) {
    // Crystal ambient pads
    const reverb = this.createReverb(ctx);
    reverb.connect(this.masterGain!);
    this.ambientNodes.push(reverb);

    const crystalFreqs = [440, 528, 639, 741, 852];
    for (const f of crystalFreqs) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      // Slow AM modulation for shimmer
      const am = ctx.createOscillator();
      const amGain = ctx.createGain();
      am.frequency.value = 0.15 + Math.random() * 0.2;
      amGain.gain.value = 0.02;
      am.connect(amGain);
      amGain.connect(g.gain);
      g.gain.value = 0.025;
      am.start();
      osc.connect(g);
      g.connect(reverb);
      osc.start();
      this.ambientNodes.push(osc, g, am, amGain);
    }
  }

  private startProgressTracking() {
    if (this.progressInterval) clearInterval(this.progressInterval);
    if (!this.ctx) return;
    const dur = this.trackDuration;
    this.progressInterval = setInterval(() => {
      if (!this.ctx) return;
      const elapsed = (this.ctx.currentTime - this.trackStartTime) % dur;
      this.onProgressCallback?.(elapsed, dur);
    }, 500);
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  public play(theme?: Theme) {
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    if (theme) this.currentTheme = theme;

    this.stopAmbient();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.5, this.ctx.currentTime);

    if (this.currentTheme === "dark") this.playDarkTrack(this.ctx);
    else if (this.currentTheme === "anime") this.playAnimeTrack(this.ctx);
    else this.playLightTrack(this.ctx);

    this.isPlaying = true;
    this.startProgressTracking();
  }

  public pause() {
    this.stopAmbient();
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public setTheme(theme: Theme) {
    this.currentTheme = theme;
    // Switch track if playing
    if (this.isPlaying) {
      this.play(theme);
    }
  }

  public mute() {
    this.isMuted = true;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
    }
    try { localStorage.setItem("portfolio_audio_muted", "true"); } catch {}
  }

  public unmute() {
    this.isMuted = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.3);
    }
    try { localStorage.setItem("portfolio_audio_muted", "false"); } catch {}
  }

  public toggleMute(): boolean {
    if (this.isMuted) {
      this.unmute();
      this.initCtx();
      if (!this.isPlaying) this.play();
    } else {
      this.mute();
    }
    return !this.isMuted;
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.1);
    }
  }

  public setProgressCallback(cb: (t: number, dur: number) => void) {
    this.onProgressCallback = cb;
  }

  public getIsPlaying() { return this.isPlaying; }
  public getIsMuted() { return this.isMuted; }
  public getCurrentTrack(): Track {
    return TRACKS.find((t) => t.theme === this.currentTheme) ?? TRACKS[0];
  }
  public getCurrentTheme() { return this.currentTheme; }

  // ── Legacy UI SFX (retained for existing components) ─────────────────────
  public playHover() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.018, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  public playTerminalKey() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200 + Math.random() * 200, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.022, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch {}
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99];
      const now = this.ctx.currentTime;
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        g.gain.setValueAtTime(0.03, now + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.12);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.12);
      });
    } catch {}
  }

  public playError() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.setValueAtTime(140, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }
}

export const soundManager = new AudioEngine();
