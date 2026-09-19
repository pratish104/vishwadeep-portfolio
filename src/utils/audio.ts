// Global Audio Controller — Real Background Music Playlist & UI SFX
// Sourced from local assets in /audio/ with six full-length WAV background tracks.

export interface Track {
  id: string;
  name: string;
  artist: string;
  url: string;
}

export const GLOBAL_PLAYLIST: Track[] = [
  { id: "track-1", name: "Soft Dreams", artist: "Chill Ambient", url: "/audio/track-01.wav" },
  { id: "track-2", name: "A New Day", artist: "Morning Reflection", url: "/audio/track-02.wav" },
  { id: "track-3", name: "Ambient Waves", artist: "Deep Focus", url: "/audio/track-03.wav" },
  { id: "track-4", name: "Tokyo Rain", artist: "Midnight Code", url: "/audio/track-04.wav" },
  { id: "track-5", name: "Zen Garden", artist: "Koto & Solitude", url: "/audio/track-05.wav" },
  { id: "track-6", name: "Cosmic Horizon", artist: "Space Lofi", url: "/audio/track-06.wav" },
];

class AudioController {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private volume: number = 0.25; // 25% default background music volume
  private onTrackChangeCallbacks: Set<(track: Track, isPlaying: boolean) => void> = new Set();
  private onProgressCallbacks: Set<(currentTime: number, duration: number) => void> = new Set();
  private progressInterval: ReturnType<typeof setInterval> | null = null;

  // Web Audio Context for UI SFX (Hover, Click, Keypress)
  private sfxCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const savedTrackIdx = localStorage.getItem("portfolio_track_index");
        if (savedTrackIdx !== null) {
          const idx = parseInt(savedTrackIdx, 10);
          if (!isNaN(idx) && idx >= 0 && idx < GLOBAL_PLAYLIST.length) {
            this.currentTrackIndex = idx;
          }
        }
        const savedVol = localStorage.getItem("portfolio_audio_volume");
        if (savedVol !== null) {
          const v = parseFloat(savedVol);
          if (!isNaN(v) && v >= 0 && v <= 1) {
            this.volume = v;
          }
        }
      } catch {}

      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audioElement || typeof window === "undefined") return;

    const track = GLOBAL_PLAYLIST[this.currentTrackIndex];
    // Keep one real, attached media element for the lifetime of the app.  An
    // attached element is easier for browsers to route to the active audio
    // device and gives DevTools a concrete element to inspect.
    this.audioElement = document.createElement("audio");
    this.audioElement.id = "portfolio-background-audio";
    this.audioElement.preload = "auto";
    this.audioElement.muted = false;
    this.audioElement.defaultMuted = false;
    this.audioElement.volume = this.volume;
    this.audioElement.src = track.url;
    this.audioElement.setAttribute("aria-hidden", "true");
    this.audioElement.style.display = "none";
    document.body.appendChild(this.audioElement);
    this.audioElement.load();

    this.audioElement.addEventListener("playing", () => {
      this.isPlaying = true;
      this.notifyStateChange();
    });

    this.audioElement.addEventListener("pause", () => {
      if (!this.audioElement?.ended) {
        this.isPlaying = false;
        this.notifyStateChange();
      }
    });

    // Auto-advance track on end
    this.audioElement.addEventListener("ended", () => {
      void this.nextTrack();
    });

    this.audioElement.addEventListener("error", () => {
      const mediaError = this.audioElement?.error;
      console.error("Background audio failed to load", {
        src: this.audioElement?.currentSrc || this.audioElement?.src,
        code: mediaError?.code,
        message: mediaError?.message,
      });
      this.isPlaying = false;
      this.notifyStateChange();
    });
  }

  private initSfxCtx() {
    if (!this.sfxCtx && typeof window !== "undefined") {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) this.sfxCtx = new AC();
    }
    if (this.sfxCtx?.state === "suspended") {
      this.sfxCtx.resume().catch(() => {});
    }
  }

  private startProgressTracking() {
    if (this.progressInterval) clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      if (this.audioElement && this.isPlaying) {
        const cur = this.audioElement.currentTime || 0;
        const dur = this.audioElement.duration || 1;
        this.onProgressCallbacks.forEach((cb) => cb(cur, dur));
      }
    }, 400);
  }

  private notifyStateChange() {
    const track = this.getCurrentTrack();
    this.onTrackChangeCallbacks.forEach((cb) => cb(track, this.isPlaying));
  }

  // ── Public Player Methods ────────────────────────────────────────────────────

  public async play(trackIndex?: number): Promise<boolean> {
    this.initAudioElement();
    if (!this.audioElement) return false;

    if (trackIndex !== undefined && trackIndex >= 0 && trackIndex < GLOBAL_PLAYLIST.length) {
      if (trackIndex !== this.currentTrackIndex || this.audioElement.src === "") {
        this.currentTrackIndex = trackIndex;
        const track = GLOBAL_PLAYLIST[this.currentTrackIndex];
        this.audioElement.pause();
        this.audioElement.src = track.url;
        this.audioElement.load();
      }
    }

    try {
      this.audioElement.muted = false;
      this.audioElement.defaultMuted = false;
      this.audioElement.volume = this.volume;
      await this.audioElement.play();
      this.isPlaying = true;
      try {
        localStorage.setItem("portfolio_track_index", String(this.currentTrackIndex));
      } catch {}
      this.startProgressTracking();
      this.notifyStateChange();
      return true;
    } catch (err) {
      console.warn("Audio playback failed (browser autoplay restriction or load error):", err);
      this.isPlaying = false;
      this.notifyStateChange();
      return false;
    }
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.isPlaying = false;
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.notifyStateChange();
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return Promise.resolve(false);
    } else {
      return this.play();
    }
  }

  public nextTrack(): Promise<boolean> {
    const nextIdx = (this.currentTrackIndex + 1) % GLOBAL_PLAYLIST.length;
    return this.play(nextIdx);
  }

  public prevTrack(): Promise<boolean> {
    const prevIdx = (this.currentTrackIndex - 1 + GLOBAL_PLAYLIST.length) % GLOBAL_PLAYLIST.length;
    return this.play(prevIdx);
  }

  public selectTrack(index: number): Promise<boolean> {
    if (index >= 0 && index < GLOBAL_PLAYLIST.length) {
      return this.play(index);
    }
    return Promise.resolve(this.isPlaying);
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    if (this.audioElement) {
      this.audioElement.volume = clamped;
      this.audioElement.muted = false;
      this.audioElement.defaultMuted = false;
    }
    try {
      localStorage.setItem("portfolio_audio_volume", String(clamped));
    } catch {}
  }

  public subscribeTrackChange(cb: (track: Track, isPlaying: boolean) => void) {
    this.onTrackChangeCallbacks.add(cb);
    cb(this.getCurrentTrack(), this.isPlaying);
    return () => this.onTrackChangeCallbacks.delete(cb);
  }

  public subscribeProgress(cb: (currentTime: number, duration: number) => void) {
    this.onProgressCallbacks.add(cb);
    return () => this.onProgressCallbacks.delete(cb);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.volume === 0;
  }

  public toggleMute(): boolean {
    if (this.volume > 0) {
      this.setVolume(0);
      return true;
    } else {
      this.setVolume(0.25);
      return false;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentTrack(): Track {
    return GLOBAL_PLAYLIST[this.currentTrackIndex] || GLOBAL_PLAYLIST[0];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getPlaylist(): Track[] {
    return GLOBAL_PLAYLIST;
  }

  // ── UI SFX ──────────────────────────────────────────────────────────────────

  public playHover() {
    this.initSfxCtx();
    if (!this.sfxCtx) return;
    try {
      const osc = this.sfxCtx.createOscillator();
      const gain = this.sfxCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(700, this.sfxCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, this.sfxCtx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.012, this.sfxCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.sfxCtx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.sfxCtx.destination);
      osc.start();
      osc.stop(this.sfxCtx.currentTime + 0.03);
    } catch {}
  }

  public playClick() {
    this.initSfxCtx();
    if (!this.sfxCtx) return;
    try {
      const osc = this.sfxCtx.createOscillator();
      const gain = this.sfxCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(900, this.sfxCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.sfxCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.025, this.sfxCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.sfxCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.sfxCtx.destination);
      osc.start();
      osc.stop(this.sfxCtx.currentTime + 0.04);
    } catch {}
  }

  public playTerminalKey() {
    this.initSfxCtx();
    if (!this.sfxCtx) return;
    try {
      const osc = this.sfxCtx.createOscillator();
      const gain = this.sfxCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1100 + Math.random() * 200, this.sfxCtx.currentTime);
      gain.gain.setValueAtTime(0.015, this.sfxCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.sfxCtx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(this.sfxCtx.destination);
      osc.start();
      osc.stop(this.sfxCtx.currentTime + 0.025);
    } catch {}
  }

  public playSuccess() {
    this.initSfxCtx();
    if (!this.sfxCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99];
      const now = this.sfxCtx.currentTime;
      notes.forEach((freq, i) => {
        if (!this.sfxCtx) return;
        const osc = this.sfxCtx.createOscillator();
        const g = this.sfxCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        g.gain.setValueAtTime(0.02, now + i * 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.08);
        osc.connect(g);
        g.connect(this.sfxCtx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.08);
      });
    } catch {}
  }

  public playError() {
    this.initSfxCtx();
    if (!this.sfxCtx) return;
    try {
      const osc = this.sfxCtx.createOscillator();
      const gain = this.sfxCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, this.sfxCtx.currentTime);
      osc.frequency.setValueAtTime(140, this.sfxCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.02, this.sfxCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.sfxCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.sfxCtx.destination);
      osc.start();
      osc.stop(this.sfxCtx.currentTime + 0.1);
    } catch {}
  }
}

export const soundManager = new AudioController();
