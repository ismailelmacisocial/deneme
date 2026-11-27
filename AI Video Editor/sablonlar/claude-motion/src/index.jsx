import React from 'react';
import {registerRoot, Composition, Series} from 'remotion';
import {GlassRiddles, glassVarsayilan} from './GlassRiddles';
import {Vertigo, vertigoVarsayilan} from './Vertigo';
import {Orbit, orbitVarsayilan} from './Orbit';
import {Lockdown, lockdownVarsayilan} from './Lockdown';
import {PaperCut, paperVarsayilan} from './PaperCut';

// 5 popüler "Claude Motion" efekti. Her biri 1080x1920, 30 fps, 4 saniye.
// Metinleri Remotion Studio'nun sağ panelinden ya da --props ile değiştirebilirsin.
const SURE = 120;
const EFEKTLER = [
  {id: 'GlassRiddles', component: GlassRiddles, defaultProps: glassVarsayilan},
  {id: 'Vertigo', component: Vertigo, defaultProps: vertigoVarsayilan},
  {id: 'Orbit', component: Orbit, defaultProps: orbitVarsayilan},
  {id: 'Lockdown', component: Lockdown, defaultProps: lockdownVarsayilan},
  {id: 'PaperCut', component: PaperCut, defaultProps: paperVarsayilan},
];

const Hepsi = () => (
  <Series>
    {EFEKTLER.map(({id, component: C, defaultProps}) => (
      <Series.Sequence key={id} durationInFrames={SURE}>
        <C {...defaultProps} />
      </Series.Sequence>
    ))}
  </Series>
);

const Root = () => (
  <>
    {EFEKTLER.map((e) => (
      <Composition key={e.id} {...e} durationInFrames={SURE} fps={30} width={1080} height={1920} />
    ))}
    <Composition id="Hepsi" component={Hepsi} durationInFrames={SURE * EFEKTLER.length} fps={30} width={1080} height={1920} />
  </>
);
registerRoot(Root);
