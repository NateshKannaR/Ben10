/**
 * Omnitrix Web Audio Synthesizer
 * Real-time procedural audio effects for bezel clicks, pop-up, dial turning,
 * transformation charging, impact, and planetary ambient drones.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.droneGain = null;
    this.droneFilter = null;
    this.whooshGain = null;
    this.whooshFilter = null;
    this.holdOsc = null;
    this.holdGain = null;
    this.noise = null;
    this.lastTime = 0;
    this.muted = true;
  }

  start() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    this.ctx = ctx;

    // Dynamics compressor for clean output
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -10;
    compressor.ratio.value = 12;
    compressor.connect(ctx.destination);

    // Master volume gain
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.85;
    this.master.connect(compressor);

    // Procedural white noise buffer (2 seconds loop)
    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const noiseData = this.noise.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    // Ambient Omnitrix low-frequency drone
    this.droneFilter = ctx.createBiquadFilter();
    this.droneFilter.type = "lowpass";
    this.droneFilter.frequency.value = 90;
    this.droneFilter.Q.value = 4;

    this.droneGain = ctx.createGain();
    this.droneGain.gain.value = 0;
    this.droneFilter.connect(this.droneGain).connect(this.master);

    const droneHarmonics = [
      [41.2, -6],
      [61.7, 7],
      [82.4, 3]
    ];
    for (const [freq, detune] of droneHarmonics) {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      osc.detune.value = detune;
      osc.connect(this.droneFilter);
      osc.start();
    }

    // Dial rotation air whoosh
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.noise;
    noiseSource.loop = true;

    this.whooshFilter = ctx.createBiquadFilter();
    this.whooshFilter.type = "bandpass";
    this.whooshFilter.frequency.value = 400;
    this.whooshFilter.Q.value = 0.8;

    this.whooshGain = ctx.createGain();
    this.whooshGain.gain.value = 0;

    noiseSource.connect(this.whooshFilter).connect(this.whooshGain).connect(this.master);
    noiseSource.start();

    // Holding charge oscillator
    this.holdOsc = ctx.createOscillator();
    this.holdOsc.type = "triangle";
    this.holdOsc.frequency.value = 110;

    this.holdGain = ctx.createGain();
    this.holdGain.gain.value = 0;
    this.holdOsc.connect(this.holdGain).connect(this.master);
    this.holdOsc.start();
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // Dial rotation mechanical click
  click() {
    if (!this.ctx) this.start();
    this.lockClick();
  }

  lockClick() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = this.noise;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1500 + Math.random() * 900;
    filter.Q.value = 5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    noiseSrc.connect(filter).connect(gain).connect(this.master);
    noiseSrc.start(now, Math.random());
    noiseSrc.stop(now + 0.08);

    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(380 + Math.random() * 120, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.06);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.35, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(oscGain).connect(this.master);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Core pop-up rise sound
  rise() {
    if (!this.ctx) this.start();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.6);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.11, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(gain).connect(this.master);
    osc.start(now);
    osc.stop(now + 0.72);
  }

  // Slam down the core to transform
  slam() {
    if (!this.ctx) this.start();
    this.lockClick();
    this.impact();
  }

  // Core press heavy impact
  impact() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(96, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.9);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.9, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

    osc.connect(gain).connect(this.master);
    osc.start(now);
    osc.stop(now + 1.35);

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = this.noise;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 900;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.42, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noiseSrc.connect(filter).connect(noiseGain).connect(this.master);
    noiseSrc.start(now);
    noiseSrc.stop(now + 0.55);
  }

  // Green DNA energy shimmer
  shimmer() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const frequencies = [440, 659.3, 880, 1318.5];
    for (const freq of frequencies) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq * (1 + (Math.random() - 0.5) * 0.004);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      osc.connect(gain).connect(this.master);
      osc.start(now);
      osc.stop(now + 2.9);
    }
  }

  // Omnitrix Transformation charge sequence
  transform(duration = 2.08) {
    if (!this.ctx) this.start();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 7;
    filter.frequency.setValueAtTime(180, now);
    filter.frequency.exponentialRampToValueAtTime(5200, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + duration - 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.12);

    filter.connect(gain).connect(this.master);

    const risingOscs = [
      [55, 440],
      [82.5, 660],
      [110.6, 884]
    ];
    for (const [startFreq, endFreq] of risingOscs) {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + duration + 0.15);
    }

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = this.noise;
    noiseSrc.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(400, now + duration - 1.4);
    noiseFilter.frequency.exponentialRampToValueAtTime(6000, now + duration);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now + duration - 1.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.42, now + duration);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.3);

    noiseSrc.connect(noiseFilter).connect(noiseGain).connect(this.master);
    noiseSrc.start(now + duration - 1.4);
    noiseSrc.stop(now + duration + 1.35);

    window.setTimeout(() => {
      if (this.ctx) {
        this.impact();
        this.shimmer();
      }
    }, duration * 1000);
  }

  // Red timeout / recharge beep sequence
  timeout() {
    if (!this.ctx) this.start();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    [0, 0.17, 0.34, 0.51].forEach((delay, index) => {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = index % 2 ? 620 : 830;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.14);

      osc.connect(gain).connect(this.master);
      osc.start(now + delay);
      osc.stop(now + delay + 0.15);
    });

    const dropOsc = ctx.createOscillator();
    dropOsc.type = "sawtooth";
    dropOsc.frequency.setValueAtTime(320, now + 0.5);
    dropOsc.frequency.exponentialRampToValueAtTime(42, now + 1.5);

    const dropGain = ctx.createGain();
    dropGain.gain.setValueAtTime(0.0001, now + 0.5);
    dropGain.gain.exponentialRampToValueAtTime(0.12, now + 0.65);
    dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.55);

    dropOsc.connect(dropGain).connect(this.master);
    dropOsc.start(now + 0.5);
    dropOsc.stop(now + 1.6);
  }
}

export const sound = new SoundEngine();
export default sound;
