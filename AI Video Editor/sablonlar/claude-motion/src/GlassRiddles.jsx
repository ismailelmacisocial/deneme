import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {FONT, MONO, AltYazi, clamp} from './ortak';

// 1/5 — Cam efekti: bulanık renk lekelerinin önünde şeffaf, buzlu cam kartlar
const Leke = ({renk, x, y, r, f, hiz, faz}) => (
  <div
    style={{
      position: 'absolute', width: r, height: r, borderRadius: '50%', background: renk,
      left: x + Math.sin(f * hiz + faz) * 90, top: y + Math.cos(f * hiz * 0.8 + faz) * 110,
      filter: 'blur(90px)', opacity: 0.9,
    }}
  />
);

const Kart = ({etiket, metin, gradyan, x, y, aci, i}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 8 - i * 8, fps, config: {damping: 14, mass: 0.9}});
  const yuzme = Math.sin((f + i * 20) / 22) * 10;
  return (
    <div
      style={{
        position: 'absolute', left: x, top: y + yuzme, width: 560, height: 300, borderRadius: 34,
        background: gradyan, backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: '2px solid rgba(255,255,255,0.45)', boxShadow: '0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)',
        transform: `translateY(${(1 - s) * 500}px) rotate(${aci * s}deg) scale(${0.8 + 0.2 * s})`,
        opacity: s, overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', top: 26, left: 32, fontFamily: MONO, fontSize: 30, color: 'rgba(255,255,255,0.85)'}}>◐ {etiket}</div>
      <div style={{position: 'absolute', top: 22, right: 32, fontSize: 34, color: 'rgba(255,255,255,0.8)', letterSpacing: 4}}>•••</div>
      <div style={{position: 'absolute', bottom: 34, left: 32, fontFamily: FONT, fontWeight: 800, fontSize: 52, color: 'white'}}>{metin}</div>
      {/* Işık yansıması */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(115deg, transparent ${20 + ((f * 2) % 160)}%, rgba(255,255,255,0.35) ${30 + ((f * 2) % 160)}%, transparent ${40 + ((f * 2) % 160)}%)`,
        }}
      />
    </div>
  );
};

export const GlassRiddles = ({baslik, kartlar, altYazi}) => {
  const f = useCurrentFrame();
  const yaziO = interpolate(f, [0, 20], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#0B0B1E', overflow: 'hidden'}}>
      <Leke renk="#FF6B5B" x={520} y={380} r={620} f={f} hiz={0.03} faz={0} />
      <Leke renk="#6A5BFF" x={80} y={900} r={560} f={f} hiz={0.025} faz={2} />
      <Leke renk="#00B4FF" x={-60} y={1250} r={480} f={f} hiz={0.035} faz={4} />
      <Leke renk="#FF3D9A" x={-40} y={420} r={420} f={f} hiz={0.028} faz={1} />
      <div
        style={{
          position: 'absolute', top: 560, width: '100%', textAlign: 'center', fontFamily: FONT, fontWeight: 900,
          fontSize: 260, color: 'white', letterSpacing: -6, opacity: yaziO, lineHeight: 0.9,
        }}
      >
        {baslik}
      </div>
      {kartlar.map((k, i) => (
        <Kart key={i} i={i} {...k} />
      ))}
      <AltYazi metin={altYazi} gecikme={40} />
    </AbsoluteFill>
  );
};

export const glassVarsayilan = {
  baslik: 'GLASS',
  altYazi: 'CAM EFEKTİ · ŞEFFAF KATMANLAR',
  kartlar: [
    {etiket: 'blur 28', metin: 'cam efekti', gradyan: 'linear-gradient(135deg, rgba(255,107,91,0.45), rgba(255,61,154,0.25))', x: 90, y: 520, aci: -5},
    {etiket: 'α 0.12', metin: 'şeffaf', gradyan: 'linear-gradient(135deg, rgba(150,110,255,0.45), rgba(106,91,255,0.25))', x: 420, y: 860, aci: 3},
    {etiket: 'layer 03', metin: 'refraction', gradyan: 'linear-gradient(135deg, rgba(0,180,255,0.45), rgba(106,91,255,0.25))', x: 160, y: 1180, aci: -2},
  ],
};
