import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';
import {FONT, MONO, KIRMIZI, AltYazi, clamp} from './ortak';

// 4/5 — Hedefe kilit: nişangâh ekranda arar, hedefi bulur, kilitlenir ve yakınlaşır
const kutular = Array.from({length: 22}).map((_, i) => ({
  x: (i * 389) % 1000, y: 200 + ((i * 677) % 1500), w: 60 + ((i * 37) % 120), h: 40 + ((i * 53) % 60),
}));

const Hedef = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    {[54, 42, 30, 18].map((r, i) => (
      <circle key={r} cx="60" cy="60" r={r} fill={i % 2 ? 'white' : '#E8343A'} />
    ))}
    <circle cx="60" cy="60" r="7" fill="#E8343A" />
    <line x1="60" y1="60" x2="104" y2="16" stroke="#3FC1D9" strokeWidth="7" strokeLinecap="round" />
    <path d="M98 10 L112 8 L110 22 Z" fill="#3FC1D9" />
  </svg>
);

const Kilit = () => (
  <svg width="90" height="100" viewBox="0 0 90 100" style={{marginLeft: 18, verticalAlign: 'middle'}}>
    <path d="M22 44 V30 a23 23 0 0 1 46 0 V44" fill="none" stroke="#C9A646" strokeWidth="10" />
    <rect x="8" y="42" width="74" height="54" rx="10" fill="#E0B84F" />
  </svg>
);

export const Lockdown = ({aramaBaslik, kilitBaslik, altYazi}) => {
  const f = useCurrentFrame();
  const kilitAni = 50;
  const kilitli = f >= kilitAni;
  // Hedef simgesi ekranın altından merkeze gelir
  const hx = interpolate(f, [0, kilitAni], [380, 540], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const hy = interpolate(f, [0, kilitAni], [1140, 1000], {...clamp, easing: Easing.inOut(Easing.cubic)});
  // Nişangâh arama yolu
  const nx = interpolate(f, [0, 20, 38, kilitAni], [420, 700, 300, 540], {...clamp, easing: Easing.inOut(Easing.quad)});
  const ny = interpolate(f, [0, 20, 38, kilitAni], [540, 760, 900, 1000], {...clamp, easing: Easing.inOut(Easing.quad)});
  const zoom = interpolate(f, [kilitAni + 6, kilitAni + 30], [1, 2.7], {...clamp, easing: Easing.out(Easing.back(1.4))});
  const koseAc = interpolate(f, [kilitAni - 8, kilitAni], [140, 0], clamp);
  const sarsinti = kilitli && f < kilitAni + 6 ? Math.sin(f * 3) * 8 : 0;
  const gx = kilitli ? hx : nx;
  const gy = kilitli ? hy : ny;
  return (
    <AbsoluteFill style={{background: '#0B0B0F', overflow: 'hidden', transform: `translateX(${sarsinti}px)`}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)', backgroundSize: '90px 90px'}} />
      {kutular.map((k, i) => (
        <div key={i} style={{position: 'absolute', left: k.x, top: k.y + Math.sin((f + i * 10) / 15) * 12, width: k.w, height: k.h, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', filter: kilitli ? 'blur(6px)' : 'none'}} />
      ))}
      <div style={{position: 'absolute', top: 210, width: '100%', textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 120, letterSpacing: -3, color: kilitli ? KIRMIZI : '#E6E6E6'}}>
        {kilitli ? (<>{kilitBaslik}<Kilit /></>) : aramaBaslik}
      </div>
      {/* Hedef simgesi */}
      <div
        style={{
          position: 'absolute', left: hx - 90, top: hy - 90, width: 180, height: 180, borderRadius: 40,
          background: 'linear-gradient(160deg, #3A2F7A, #1E1A45)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${zoom})`, border: kilitli ? `3px solid ${KIRMIZI}` : '2px solid rgba(255,255,255,0.15)',
          boxShadow: kilitli ? `0 0 ${60 * zoom}px rgba(255,107,91,0.55)` : 'none',
        }}
      >
        <Hedef />
      </div>
      {/* Nişangâh ve köşe çerçevesi */}
      <div style={{position: 'absolute', left: gx, top: gy}}>
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => {
          const d = (kilitli ? 150 * zoom : 130) + koseAc;
          return (
            <div key={i} style={{
              position: 'absolute', left: sx * d - (sx > 0 ? 50 : 0), top: sy * d - (sy > 0 ? 50 : 0), width: 50, height: 50,
              borderColor: kilitli ? KIRMIZI : 'white', borderStyle: 'solid', borderWidth: 0,
              [sy < 0 ? 'borderTopWidth' : 'borderBottomWidth']: 6, [sx < 0 ? 'borderLeftWidth' : 'borderRightWidth']: 6,
            }} />
          );
        })}
        {!kilitli && (
          <div style={{position: 'absolute', left: -45, top: -45, width: 90, height: 90, borderRadius: '50%', border: '3px dashed rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 70, fontWeight: 200}}>+</div>
        )}
        <div style={{position: 'absolute', left: kilitli ? 150 * zoom - 200 : 160, top: kilitli ? 150 * zoom + 30 : -130, fontFamily: MONO, fontSize: 28, color: kilitli ? KIRMIZI : 'rgba(255,255,255,0.8)', lineHeight: 1.3, whiteSpace: 'pre'}}>
          {`X ${String(Math.round(gx)).padStart(4, '0')}\nY ${String(Math.round(gy)).padStart(4, '0')}\n${kilitli ? `ZOOM ${zoom.toFixed(1)}×` : 'SCAN…'}`}
        </div>
      </div>
      <AltYazi metin={altYazi} gecikme={kilitAni} alt={260} renk="rgba(255,255,255,0.7)" />
    </AbsoluteFill>
  );
};

export const lockdownVarsayilan = {aramaBaslik: 'LOCKDOWN', kilitBaslik: 'LOCKED', altYazi: 'HEDEFE KİLİT · DİNAMİK ZOOM'};
