import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'music');
mkdirSync(dir, { recursive: true });

function encodeWav(samples, sampleRate) {
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(s < 0 ? s * 0x8000 : s * 0x7fff, 44 + i * 2);
  }
  return buffer;
}

function note(freq, duration, sampleRate, gain = 0.18) {
  const n = Math.floor(duration * sampleRate);
  const samples = new Array(n);
  const attack = Math.floor(0.02 * sampleRate);
  const release = Math.floor(0.12 * sampleRate);
  for (let i = 0; i < n; i++) {
    let env = 1;
    if (i < attack) env = i / attack;
    else if (i > n - release) env = Math.max(0, (n - i) / release);
    const t = i / sampleRate;
    const wave =
      Math.sin(2 * Math.PI * freq * t) * 0.7 +
      Math.sin(2 * Math.PI * freq * 2 * t) * 0.2 +
      Math.sin(2 * Math.PI * freq * 3 * t) * 0.1;
    samples[i] = wave * env * gain;
  }
  return samples;
}

function rest(duration, sampleRate) {
  return new Array(Math.floor(duration * sampleRate)).fill(0);
}

function songFromNotes(sequence, sampleRate = 22050) {
  const samples = [];
  for (const [freq, dur] of sequence) {
    samples.push(...(freq === 0 ? rest(dur, sampleRate) : note(freq, dur, sampleRate)));
  }
  return encodeWav(samples, sampleRate);
}

const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0, A4 = 440.0, B4 = 493.88;
const C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99;

const calm = [
  [E4, 0.5], [G4, 0.5], [A4, 0.75], [G4, 0.5], [E4, 0.5], [D4, 0.75],
  [C4, 0.5], [E4, 0.5], [G4, 0.75], [E4, 0.5], [C4, 1], [0, 0.25],
  [A4, 0.5], [G4, 0.5], [E4, 0.5], [G4, 0.75], [A4, 0.5], [C5, 1],
  [G4, 0.5], [E4, 0.5], [D4, 0.5], [C4, 1.25], [0, 0.4],
];

const morning = [
  [C4, 0.35], [E4, 0.35], [G4, 0.35], [C5, 0.55], [G4, 0.35], [E4, 0.55],
  [D4, 0.35], [F4, 0.35], [A4, 0.35], [D5, 0.55], [A4, 0.35], [F4, 0.55],
  [E4, 0.35], [G4, 0.35], [B4, 0.35], [E5, 0.55], [C5, 0.7], [G4, 0.7],
  [C5, 0.9], [0, 0.3],
];

const garden = [
  [G4, 0.45], [B4, 0.45], [D5, 0.7], [B4, 0.45], [G4, 0.7],
  [A4, 0.45], [C5, 0.45], [E5, 0.7], [C5, 0.45], [A4, 0.7],
  [G4, 0.45], [D5, 0.45], [G5, 0.7], [D5, 0.45], [B4, 0.7],
  [G4, 1.1], [0, 0.35],
];

writeFileSync(join(dir, 'calm.wav'), songFromNotes(calm));
writeFileSync(join(dir, 'morning.wav'), songFromNotes(morning));
writeFileSync(join(dir, 'garden.wav'), songFromNotes(garden));
console.log('Wrote music tracks to', dir);
