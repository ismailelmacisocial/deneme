import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {FONT, MONO, clamp} from './ortak';

// 5/5 — Kağıt kesme: renkli kağıt parçalarına yazılmış harfler bantla yapışır, yırtık şeritler kayar
const RENK = ['#FF6B5B', '#F7C873', '#8CCBE8', '#6A5BFF', '#FF9E8F', '#111111'];

// Yırtık kenar için tırtıklı clip-path (her zaman aynı sonucu verir)
const yirtik = (tohum, dis = 3) => {
  const n = 18;
  const ust = Array.from({length: n + 1}).map((_, i) => `${(i / n) * 100}% ${((i * 37 + tohum * 11) % 7) * (dis / 7)}%`);
  const alt = Array.from({length: n + 1}).map((_, i) => `${100 - (i / n) * 100}% ${100 - ((i * 53 + tohum * 7) % 7) * (dis / 7)}%`);
  return `polygon(${[...ust, ...alt].join(',')})`;
};

const Harf = ({h, i, renk, aci}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - i * 4, fps, config: {damping: 9, stiffness: 140}});
  const koyu = renk === '#111111';
  return (
    <div
      style={{
        position: 'relative', width: 170, height: 180, margin: 6, background: renk, clipPath: yirtik(i, 6),
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 130,
        color: koyu ? 'white' : '#111', transform: `translateY(${(1 - s) * -700}px) rotate(${aci * s + (1 - s) * 40}deg) scale(${0.6 + 0.4 * s})`,
        boxShadow: '0 8px 0 rgba(0,0,0,0.08)',
      }}
    >
      {h}
      <div style={{position: 'absolute', top: 4, left: 50, width: 70, height: 24, background: 'rgba(255,255,255,0.55)', transform: 'rotate(-4deg)'}} />
    </div>
  );
};

const Serit = ({metin, renk, yaziRenk, gecikme, hizala, tohum}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [gecikme, gecikme + 16], [0, 1], clamp);
  return (
    <div
      style={{
        width: 900, height: 110, background: renk, clipPath: yirtik(tohum, 10), marginTop: 18,
        display: 'flex', alignItems: 'center', justifyContent: hizala, padding: '0 40px', boxSizing: 'border-box',
        fontFamily: MONO, fontSize: 40, letterSpacing: 8, color: yaziRenk,
        transform: `translateX(${(1 - p) * (hizala === 'flex-start' ? -1100 : 1100)}px)`,
      }}
    >
      {metin}
    </div>
  );
};

export const PaperCut = ({satir1, satir2, serit1, serit2}) => {
  let n = 0;
  const satir = (kelime, kaydir) => (
    <div style={{display: 'flex', justifyContent: 'center', marginLeft: kaydir}}>
      {kelime.split('').map((h) => {
        const i = n++;
        return <Harf key={i} h={h} i={i} renk={RENK[i % RENK.length]} aci={((i * 47) % 13) - 6} />;
      })}
    </div>
  );
  return (
    <AbsoluteFill style={{background: '#EFE6D8', alignItems: 'center', paddingTop: 380}}>
      {satir(satir1, 0)}
      {satir(satir2, -60)}
      <div style={{marginTop: 60}}>
        <Serit metin={serit1} renk="#6A5BFF" yaziRenk="white" gecikme={40} hizala="flex-start" tohum={3} />
        <Serit metin={serit2} renk="#B9AEFF" yaziRenk="#2B2260" gecikme={52} hizala="flex-end" tohum={8} />
      </div>
    </AbsoluteFill>
  );
};

export const paperVarsayilan = {satir1: 'PAPER', satir2: 'CUT', serit1: 'KAĞIT KESME', serit2: 'ANİMASYONU'};
