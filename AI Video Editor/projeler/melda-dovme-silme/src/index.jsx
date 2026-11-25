import React from 'react';
import {
  registerRoot, Composition, AbsoluteFill, Sequence, OffthreadVideo, staticFile,
  useCurrentFrame, useVideoConfig, interpolate, spring, Easing,
} from 'remotion';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';

// Dr. Melda Özekinci — Dövme silme Reels'i (Candela PicoWay)
const GOLD = '#D9B76E';
const GOLD_LIGHT = '#F6E3B0';
const FPS = 30;

// Zaman çizelgesi (kare)
const S1 = {from: 0, dur: 498, src: 's1.mp4'};          // 16.6 sn
const S2 = {from: 498, dur: 258, src: 's2.mp4'};        // 8.6 sn
const S3 = {from: 756, dur: 246, src: 's3.mp4'};        // 8.2 sn
const XF = 12;                                           // outro geçişi
const OUTRO = {from: 1002 - XF, dur: 155, src: 'outro.mp4'};
export const TOTAL = OUTRO.from + OUTRO.dur;             // 1145 kare ≈ 38.2 sn

// Hafif yaklaşma (Ken Burns) + kesimlerde küçük "punch-in"
const Clip = ({src, dur, punch = false, fadeOut = 0}) => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, dur], [1.0, 1.05]);
  const p = punch ? interpolate(f, [0, 6], [1.06, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}) : 1;
  const vol = fadeOut ? interpolate(f, [dur - fadeOut, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
      <OffthreadVideo src={staticFile(src)} volume={vol}
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom * p})`}} />
    </AbsoluteFill>
  );
};

const Flash = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 2, 7], [0, 0.85, 0], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#fff', opacity: o}} />;
};

const Outro = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, XF], [0, 1], {extrapolateRight: 'clamp'});
  const vol = interpolate(f, [0, XF], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: o}}>
      <OffthreadVideo src={staticFile(OUTRO.src)} volume={vol} style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
  );
};

// Üst başlık: TATTOO REMOVAL / Dövme Silme
const Title = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const end = OUTRO.from;
  const out = interpolate(f, [end - 10, end], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const letters = 'TATTOO REMOVAL'.split('');
  const s = spring({frame: f - 6, fps, config: {damping: 18, stiffness: 90}});
  const lineW = interpolate(f, [14, 34], [0, 260], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  // Altın parıltı: başlık üzerinde periyodik ışık süpürmesi
  const sweep = ((f % 150) / 150) * 260 - 80;

  return (
    <AbsoluteFill style={{opacity: out}}>
      {/* Okunabilirlik için üst karartma */}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.35) 22%, rgba(0,0,0,0) 38%)'}} />
      <div style={{position: 'absolute', top: 250, width: '100%', textAlign: 'center'}}>
        <div style={{fontFamily: 'Montserrat', fontWeight: 600, fontSize: 40, letterSpacing: '0.42em', paddingLeft: '0.42em',
          backgroundImage: `linear-gradient(100deg, ${GOLD} ${sweep - 30}%, ${GOLD_LIGHT} ${sweep}%, ${GOLD} ${sweep + 30}%)`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
          {letters.map((l, i) => {
            const o = interpolate(f, [i * 1.5, i * 1.5 + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return <span key={i} style={{opacity: o}}>{l}</span>;
          })}
        </div>
        <div style={{fontFamily: 'Cormorant Garamond', fontWeight: 500, fontSize: 150, lineHeight: 1, color: '#fff', marginTop: 18,
          opacity: s, transform: `translateY(${(1 - s) * 40}px)`, textShadow: '0 4px 30px rgba(0,0,0,.45)'}}>
          Dövme <span style={{fontStyle: 'italic'}}>Silme</span>
        </div>
        <div style={{height: 2, width: lineW, margin: '26px auto 0', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`}} />
      </div>
    </AbsoluteFill>
  );
};

// Alt rozet: cihaz adı
const DeviceBadge = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - 30, fps, config: {damping: 16}});
  const out = interpolate(f, [OUTRO.from - 10, OUTRO.from], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top: 1400, width: '100%', display: 'flex', justifyContent: 'center', opacity: s * out}}>
      <div style={{transform: `translateY(${(1 - s) * 30}px)`, padding: '22px 46px', borderRadius: 999,
        background: 'rgba(10,10,10,.58)', border: `1.5px solid ${GOLD}`, backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{width: 14, height: 14, borderRadius: 7, background: GOLD, boxShadow: `0 0 14px ${GOLD}`}} />
        <span style={{fontFamily: 'Montserrat', fontWeight: 500, fontSize: 42, color: '#fff', letterSpacing: '0.04em'}}>
          Candela <span style={{color: GOLD_LIGHT, fontWeight: 600}}>PicoWay®</span> Laser
        </span>
      </div>
    </div>
  );
};

const Reel = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Sequence from={S1.from} durationInFrames={S1.dur}><Clip src={S1.src} dur={S1.dur} /></Sequence>
    <Sequence from={S2.from} durationInFrames={S2.dur}><Clip src={S2.src} dur={S2.dur} /></Sequence>
    <Sequence from={S3.from} durationInFrames={S3.dur}><Clip src={S3.src} dur={S3.dur} punch fadeOut={XF} /></Sequence>
    <Sequence from={S2.from} durationInFrames={8}><Flash /></Sequence>
    <Sequence from={OUTRO.from} durationInFrames={OUTRO.dur}><Outro /></Sequence>
    <Title />
    <DeviceBadge />
  </AbsoluteFill>
);

// Kapak görseli: aynı tasarım, ilk sahneden bir kare
const Kapak = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <OffthreadVideo src={staticFile('s1.mp4')} startFrom={210} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    <Sequence from={-120}><Title /></Sequence>
    <Sequence from={-120}><DeviceBadge /></Sequence>
  </AbsoluteFill>
);

const Root = () => (
  <>
    <Composition id="Reel" component={Reel} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
    <Composition id="Kapak" component={Kapak} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  </>
);
registerRoot(Root);
