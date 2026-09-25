import { describe, expect, it } from 'vitest';
import { formatDistance } from '../utils/format';
import { readSetupFromUrl, setupToQuery } from '../utils/urlState';
import type { Setup } from '../types';

const fallback: Setup = { sensorId: 'full-frame', customSensor: { id: 'custom', name: 'Custom', widthMm: 36, heightMm: 24 }, focalLengthMm: 85, aperture: 1.8, distanceMm: 3000, subjectType: 'person' };
describe('presentation utilities', () => {
  it('formats units and infinity', () => { expect(formatDistance(Infinity, 'metric')).toBe('∞'); expect(formatDistance(3000, 'metric')).toBe('3 m'); expect(formatDistance(304.8, 'imperial')).toBe('1 ft'); });
  it('round-trips compact URL state', () => { const source = { ...fallback, focalLengthMm: 35, aperture: 4, distanceMm: 9000 }; const result = readSetupFromUrl(fallback, `?${setupToQuery(source)}`); expect(result).toMatchObject(source); });
  it('falls back safely for invalid query values', () => { const result = readSetupFromUrl(fallback, '?focal=oops&aperture=-2&distance=0&sensor=nope'); expect(result).toEqual(fallback); });
});
