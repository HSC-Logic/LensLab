import type { OpticsResult, Setup, UnitSystem } from '../types';
import { formatDistance } from '../utils/format';

const scaleDistance = (mm: number) => Math.log10(Math.max(300, mm) / 300) / Math.log10(1_000_000 / 300) * 100;

export function Scene({ setup, result, units, onDistance }: { setup: Setup; result: OpticsResult; units: UnitSystem; onDistance: (mm: number) => void }) {
  const subject = scaleDistance(setup.distanceMm);
  const near = scaleDistance(result.nearMm);
  const far = result.farMm === Infinity ? 100 : scaleDistance(result.farMm);
  const subjectX = 155 + subject * 6.7;
  const nearX = 155 + near * 6.7;
  const farX = 155 + far * 6.7;
  const drag = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.buttons !== 1) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(.98, Math.max(.03, (event.clientX - rect.left) / rect.width));
    onDistance(300 * (1_000_000 / 300) ** ratio);
  };

  return <section className="scene-card">
    <div className="scene-toolbar"><strong>{setup.focalLengthMm} mm <span>· f/{setup.aperture}</span></strong><span>Drag the subject marker</span></div>
    <svg className="scene" viewBox="0 0 1000 400" role="img" aria-label={`Camera focused at ${formatDistance(setup.distanceMm, units)}. Sharp region from ${formatDistance(result.nearMm, units)} to ${formatDistance(result.farMm, units)}.`} onPointerMove={drag} onPointerDown={drag}>
      <defs><linearGradient id="sharp" x1="0" x2="1"><stop stopColor="#e87928" stopOpacity=".09"/><stop offset=".5" stopColor="#e87928" stopOpacity=".3"/><stop offset="1" stopColor="#e87928" stopOpacity=".09"/></linearGradient></defs>
      <path className="fov" d={`M172 155 L945 ${155 - result.horizontalFovDeg * 2} L945 ${155 + result.horizontalFovDeg * 2} Z`} />
      <rect className="sharp-zone" x={nearX} y="54" width={Math.max(4, farX - nearX)} height="276" rx="3" fill="url(#sharp)" />
      <line className="ground" x1="32" y1="330" x2="968" y2="330" />
      <line className="boundary" x1={nearX} y1="48" x2={nearX} y2="330" />
      <line className="boundary" x1={farX} y1="48" x2={farX} y2="330" />
      <line className="focus-line" x1={subjectX} y1="42" x2={subjectX} y2="330" />

      <g className="camera-rig" transform="translate(54 130)">
        <rect x="0" y="0" width="76" height="50" rx="8"/><rect x="74" y="12" width="44" height="26" rx="4"/><circle cx="35" cy="25" r="14"/><path d="M27 50L4 196M48 50l25 146M37 50v146"/>
      </g>

      <SubjectGraphic type={setup.subjectType ?? 'person'} x={subjectX} />

      <g className="background-marker" transform="translate(910 188)"><path d="M0 112V44M0 65l-35-28M0 80l37-32M-35 37l18-29 17 27M37 48l-18-31-19 30"/></g>
      <text className="distance-label" x={subjectX} y="378" textAnchor="middle">{formatDistance(setup.distanceMm, units)}</text>
      <text x={nearX} y="350" textAnchor="middle">NEAR</text><text x={farX} y="350" textAnchor="middle">{result.farMm === Infinity ? '∞ FAR' : 'FAR'}</text>
    </svg>
    <div className="scene-legend"><span><i className="legend-sharp"/>Depth of field</span><span><i className="legend-focus"/>Focus plane</span><span>Near {formatDistance(result.nearMm, units)}</span><span>Far {formatDistance(result.farMm, units)}</span></div>
  </section>;
}

function SubjectGraphic({ type, x }: { type: Setup['subjectType']; x: number }) {
  if (type === 'couple') return <g className="draggable subject-marker" transform={`translate(${x} 104)`}><g transform="translate(-27 10) scale(.88)"><Person /></g><g transform="translate(27 0)"><Person /></g><circle className="drag-handle" cx="0" cy="83" r="72"/></g>;
  if (type === 'group') return <g className="draggable subject-marker" transform={`translate(${x} 104)`}><g transform="translate(-48 22) scale(.78)"><Person /></g><Person/><g transform="translate(48 22) scale(.78)"><Person /></g><circle className="drag-handle" cx="0" cy="83" r="94"/></g>;
  if (type === 'product') return <g className="draggable subject-marker subject-product" transform={`translate(${x} 178)`}><rect x="-58" y="0" width="116" height="104" rx="8"/><path d="M-34 0l17-35h34L34 0M-75 106h150M-62 106l-13 44M62 106l13 44"/><circle className="drag-handle" cx="0" cy="45" r="76"/></g>;
  if (type === 'flower') return <g className="draggable subject-marker subject-flower" transform={`translate(${x} 130)`}><circle cx="0" cy="0" r="25"/><circle cx="0" cy="-35" r="23"/><circle cx="34" cy="-10" r="23"/><circle cx="21" cy="29" r="23"/><circle cx="-21" cy="29" r="23"/><circle cx="-34" cy="-10" r="23"/><path d="M0 30v170M0 110c-45-8-55-38-55-38 42-5 58 18 55 38M0 142c42-8 55-38 55-38-43-5-58 18-55 38"/><circle className="drag-handle" cx="0" cy="70" r="78"/></g>;
  return <g className="draggable subject-marker" transform={`translate(${x} 104)`}><Person/><circle className="drag-handle" cx="0" cy="83" r="58"/></g>;
}

function Person() {
  return <><circle cx="0" cy="0" r="31"/><path d="M-40 65c0-30 18-49 40-49s40 19 40 49v91h-80z"/><path d="M-22 156l-10 70M22 156l10 70"/></>;
}
