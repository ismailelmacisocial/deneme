import React, {useLayoutEffect, useRef} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {gsap} from 'gsap';

// GSAP zaman çizelgesi Remotion karesine bağlanır: her kare için tl.seek(saniye).
export const GsapTest = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const box = useRef(null);
  const tl = useRef(null);
  useLayoutEffect(() => {
    tl.current = gsap.timeline({paused: true})
      .fromTo(box.current, {y: 300, opacity: 0, rotate: -8}, {y: 0, opacity: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.7)'})
      .to(box.current, {scale: 1.15, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut'}, 1);
    return () => tl.current.kill();
  }, []);
  useLayoutEffect(() => { tl.current?.seek(frame / fps); }, [frame, fps]);
  return (
    <AbsoluteFill style={{background: '#F5F3EE', justifyContent: 'center', alignItems: 'center'}}>
      <div ref={box} style={{fontSize: 110, fontWeight: 800, fontFamily: 'sans-serif', background: '#FFE01B', padding: '10px 30px', border: '5px solid #111'}}>
        GSAP
      </div>
    </AbsoluteFill>
  );
};
