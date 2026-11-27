import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';

export const FONT = 'Montserrat, sans-serif';
export const MONO = 'ui-monospace, "DejaVu Sans Mono", monospace';
export const KIRMIZI = '#FF6B5B';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};

// Alt satırdaki küçük, harf aralıklı açıklama (ör. "CAM EFEKTİ · ŞEFFAF KATMANLAR")
export const AltYazi = ({metin, renk = 'rgba(255,255,255,0.75)', alt = 230, gecikme = 20}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [gecikme, gecikme + 15], [0, 1], clamp);
  const y = interpolate(f, [gecikme, gecikme + 15], [20, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute', bottom: alt, width: '100%', textAlign: 'center',
        fontFamily: MONO, fontSize: 34, letterSpacing: 8, color: renk,
        opacity: o, transform: `translateY(${y}px)`,
      }}
    >
      {metin}
    </div>
  );
};

// Kademeli giriş: i. öğe için 0→1 ilerleme
export const kademe = (f, i, aralik = 6, sure = 18, bas = 0) =>
  interpolate(f, [bas + i * aralik, bas + i * aralik + sure], [0, 1], clamp);
