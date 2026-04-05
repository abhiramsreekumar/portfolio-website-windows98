// Web Audio API Retro Sound Generator

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = false;

  public init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    this.isEnabled = true;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public toggleSound() {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled && this.audioCtx?.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.isEnabled;
  }

  public getStatus() {
    return this.isEnabled;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
    if (!this.isEnabled || !this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    gainNode.gain.setValueAtTime(vol, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }

  public jump() {
    if (!this.isEnabled || !this.audioCtx) return;
    
    // Quick ascending square wave
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.1);
  }

  public pickup() {
    if (!this.isEnabled || !this.audioCtx) return;
    
    // Classic coin/pickup sound (two short high notes)
    this.playTone(987.77, 'square', 0.1, 0.1); // B5
    setTimeout(() => {
      this.playTone(1318.51, 'square', 0.15, 0.1); // E6
    }, 100);
  }

  public levelClear() {
    if (!this.isEnabled || !this.audioCtx) return;
    
    // Short victory arpeggio
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'square', 0.15, 0.1);
      }, i * 150);
    });
  }
}

export const sound = new SoundEngine();
