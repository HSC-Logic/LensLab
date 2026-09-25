import type { OpticsResult, Setup, UnitSystem } from '../types';
import { formatDistance, formatNumber } from '../utils/format';

export function Results({ result, setup, units, advanced }: { result: OpticsResult; setup: Setup; units: UnitSystem; advanced: boolean }) {
  const cards = [['Near focus', formatDistance(result.nearMm, units)], ['Far focus', formatDistance(result.farMm, units)], ['Total DoF', formatDistance(result.totalDofMm, units)], ['Hyperfocal', formatDistance(result.hyperfocalMm, units)]];
  return <section className="results" aria-live="polite">
    {cards.map(([label, value]) => <div className="result-card" key={label}><small>{label}</small><strong>{value}</strong></div>)}
    {advanced && <div className="technical">
      <span>Front DoF <b>{formatDistance(result.frontDofMm, units)}</b></span><span>Rear DoF <b>{formatDistance(result.rearDofMm, units)}</b></span>
      <span>Crop factor <b>{formatNumber(result.cropFactor, 2)}×</b></span><span>35mm equivalent <b>{formatNumber(result.equivalentFocalLengthMm)} mm</b></span>
      <span>Circle of confusion <b>{formatNumber(result.circleOfConfusionMm, 3)} mm</b></span><span>Sensor diagonal <b>{formatNumber(result.sensorDiagonalMm, 2)} mm</b></span>
      <span>Horizontal FoV <b>{formatNumber(result.horizontalFovDeg)}°</b></span><span>Vertical FoV <b>{formatNumber(result.verticalFovDeg)}°</b></span><span>Diagonal FoV <b>{formatNumber(result.diagonalFovDeg)}°</b></span>
      <p>{result.diffraction}</p><p>At f/{setup.aperture}, approximately {formatDistance(result.totalDofMm, units)} falls within the selected acceptable-sharpness criterion.</p>
    </div>}
  </section>;
}
