import { Aperture, Focus, Mountain, UserRound } from 'lucide-react';
import type { OpticsResult, Setup } from '../types';

export function Preview({ setup, result }: { setup: Setup; result: OpticsResult }) {
  const distanceRatio = 3000 / setup.distanceMm;
  const blur = Math.min(16, Math.max(.5, setup.focalLengthMm / setup.aperture / 8 * Math.sqrt(distanceRatio)));
  const subjectScale = Math.min(2.4, Math.max(.18, setup.focalLengthMm / 65 * distanceRatio));
  return <section className="preview" aria-label="Educational camera preview">
    <div className="preview-bg" style={{ filter: `blur(${blur}px)`, transform: `scale(${1 + blur / 100})` }}><Mountain /><Mountain /></div>
    <div className="viewfinder"><span>EV SIMULATION</span><span>{Math.round(result.horizontalFovDeg)}° HFOV</span></div>
    <div className="subject" style={{ transform: `translateX(-50%) scale(${subjectScale})` }}><UserRound /></div>
    <div className="focus-box"><i /><i /><i /><i /></div>
    <div className="preview-data"><span><Aperture size={15} /> f/{setup.aperture}</span><span><Focus size={15} /> {setup.focalLengthMm} mm</span></div>
    <button className="preview-note" type="button" title="Educational approximation, not an exact rendering of a particular lens.">Approximate preview</button>
  </section>;
}
