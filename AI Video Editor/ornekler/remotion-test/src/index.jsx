import React from 'react';
import {registerRoot, Composition, AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
const Test = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#F5F3EE', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{opacity: o, fontSize: 90, fontWeight: 800, fontFamily: 'sans-serif'}}>
        <span style={{background: '#FFE01B', padding: '0 16px', border: '4px solid #111'}}>Remotion</span> çalışıyor
      </div>
    </AbsoluteFill>
  );
};
const Root = () => <Composition id="Test" component={Test} durationInFrames={60} fps={30} width={1080} height={1920} />;
registerRoot(Root);
