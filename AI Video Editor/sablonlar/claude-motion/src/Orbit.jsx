import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {FONT, MONO, KIRMIZI, AltYazi, clamp} from './ortak';

// 3/5 — Yörünge: merkezdeki kürenin etrafında 3B dönen kartlar
const yildizlar = Array.from({length: 120}).map((_, i) => ({
  x: (i * 7919) % 1080, y: (i * 104729) % 1920, r: 1 + (i % 3), o: 0.2 + ((i * 31) % 60) / 100,
}));

export const Orbit = ({baslik, kartlar, altYazi}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ac = spring({frame: f - 5, fps, config: {damping: 16}});
  const yaricap = 120 + ac * 300;
  const egim = interpolate(f, [0, 120], [-6, -18], clamp);
  const baslikS = spring({frame: f, fps, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 60%, #2A2160 0%, #120E2E 70%)', overflow: 'hidden'}}>
      {yildizlar.map((y, i) => (
        <div key={i} style={{position: 'absolute', left: y.x, top: y.y, width: y.r, height: y.r, borderRadius: '50%', background: 'white', opacity: y.o * (0.6 + 0.4 * Math.sin(f / 8 + i))}} />
      ))}
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 170, color: KIRMIZI, letterSpacing: -5, transform: `scale(${baslikS})`}}>
        {baslik}
      </div>
      <div style={{position: 'absolute', left: 540, top: 1150, perspective: 1600, perspectiveOrigin: '50% 50%'}}>
        <div style={{transformStyle: 'preserve-3d', transform: `rotateX(${egim}deg)`}}>
          {/* Küre */}
          <div
            style={{
              position: 'absolute', width: 300, height: 300, left: -150, top: -150, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #FF9A8A 0%, #FF5A48 45%, #B8301F 100%)',
              boxShadow: '0 0 120px rgba(255,107,91,0.45)', transform: `scale(${0.4 + 0.6 * ac})`,
            }}
          />
          {kartlar.map((k, i) => {
            const aci = (i / kartlar.length) * 360 + f * 1.4;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute', width: 130, height: 170, left: -65, top: -85, borderRadius: 18,
                  background: k.renk, boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
                  transform: `rotateY(${aci}deg) translateZ(${yaricap}px) rotateX(10deg)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT, fontWeight: 800, fontSize: 44, color: 'white', opacity: ac,
                }}
              >
                <span style={{position: 'absolute', top: 10, left: 12, fontFamily: MONO, fontSize: 18, opacity: 0.8}}>{String(i + 1).padStart(2, '0')}</span>
                {k.metin}
              </div>
            );
          })}
        </div>
      </div>
      <AltYazi metin={altYazi} gecikme={25} alt={200} />
    </AbsoluteFill>
  );
};

const T = 'linear-gradient(160deg, #FF8A6B, #FF5A48)';
const M = 'linear-gradient(160deg, #6FC3FF, #3A8BFF)';
const P = 'linear-gradient(160deg, #9C8BFF, #6A5BFF)';
export const orbitVarsayilan = {
  baslik: 'ORBIT',
  altYazi: '3D DÖNÜŞ · DİNAMİK KAMERA AÇISI',
  kartlar: [
    {metin: '90°', renk: M}, {metin: '↻', renk: T}, {metin: '3D', renk: P}, {metin: 'X', renk: T},
    {metin: 'Y', renk: M}, {metin: 'Z', renk: P}, {metin: '360', renk: T}, {metin: '↺', renk: M},
  ],
};
