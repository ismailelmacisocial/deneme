import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {FONT, AltYazi, clamp} from './ortak';

// 2/5 — Dolly zoom: arka plan tünel gibi büyürken yazı yerinde kalır, kromatik sapmalı başlık
const RENKLER = ['#FF6B5B', '#7B6BFF', '#FFFFFF'];

export const Vertigo = ({baslik, altYazi}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(f, [0, durationInFrames], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const kare = 16;
  const yaziS = interpolate(f, [0, 12], [1.6, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  const sapma = 6 + Math.abs(Math.sin(f / 5)) * 10;
  return (
    <AbsoluteFill style={{background: '#0A0A1A', overflow: 'hidden'}}>
      {/* Hız çizgileri */}
      <svg width="1080" height="1920" style={{position: 'absolute'}}>
        {Array.from({length: 28}).map((_, i) => {
          const a = (i / 28) * Math.PI * 2 + f * 0.004;
          const r1 = 300 + ((f * 18 + i * 97) % 900);
          return (
            <line key={i} x1={540 + Math.cos(a) * r1} y1={960 + Math.sin(a) * r1} x2={540 + Math.cos(a) * (r1 + 700)} y2={960 + Math.sin(a) * (r1 + 700)}
              stroke={RENKLER[i % 3]} strokeOpacity={0.35} strokeWidth={2} />
          );
        })}
      </svg>
      {/* Tünel: iç içe dönen yuvarlak kareler */}
      {Array.from({length: kare}).map((_, i) => {
        const derinlik = (i + t * 6) % kare;
        const olcek = Math.pow(1.22, derinlik) * 0.12;
        return (
          <div
            key={i}
            style={{
              position: 'absolute', left: 540, top: 960, width: 900, height: 900, marginLeft: -450, marginTop: -450,
              borderRadius: 60, border: `3px solid ${RENKLER[i % 3]}`, opacity: interpolate(derinlik, [0, 2, kare - 3, kare], [0, 0.9, 0.9, 0]),
              transform: `scale(${olcek}) rotate(${derinlik * 7 + f * 0.6}deg)`,
            }}
          />
        );
      })}
      {/* Kromatik sapmalı başlık */}
      <div style={{position: 'absolute', top: 860, width: '100%', textAlign: 'center', transform: `scale(${yaziS})`}}>
        <div
          style={{
            fontFamily: FONT, fontWeight: 900, fontSize: 190, color: 'white', letterSpacing: -4,
            textShadow: `${-sapma}px 0 0 rgba(0,210,255,0.9), ${sapma}px 0 0 rgba(255,60,90,0.9)`,
          }}
        >
          {baslik}
        </div>
      </div>
      <AltYazi metin={altYazi} gecikme={15} alt={160} />
    </AbsoluteFill>
  );
};

export const vertigoVarsayilan = {baslik: 'VERTIGO', altYazi: 'DOLLY ZOOM · SİNEMATİK DERİNLİK'};
