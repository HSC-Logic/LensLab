import { hyperfocalDistance } from './hyperfocal';

export const depthOfField = (focalMm: number, aperture: number, subjectMm: number, cocMm: number) => {
  const hyperfocalMm = hyperfocalDistance(focalMm, aperture, cocMm);
  // Standard thin-lens near/far limits. Far becomes infinite at or beyond hyperfocal focus.
  const nearMm = hyperfocalMm * subjectMm / (hyperfocalMm + subjectMm - focalMm);
  const farDenominator = hyperfocalMm - subjectMm + focalMm;
  const farMm = farDenominator <= 0 ? Infinity : hyperfocalMm * subjectMm / farDenominator;
  return {
    hyperfocalMm,
    nearMm: Math.max(0, nearMm),
    farMm,
    frontDofMm: Math.max(0, subjectMm - nearMm),
    rearDofMm: farMm === Infinity ? Infinity : Math.max(0, farMm - subjectMm),
    totalDofMm: farMm === Infinity ? Infinity : Math.max(0, farMm - nearMm),
  };
};
