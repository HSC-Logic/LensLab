import { describe, expect, it } from 'vitest';
import { calculateOptics } from '../engine/optics';
import { feetToMm, mmToFeet } from '../engine/optics/conversions';
import { depthOfField } from '../engine/optics/depthOfField';
import { validSensorDimension } from '../engine/optics/validation';
import type { Sensor, Setup } from '../types';

const sensor: Sensor = { id: 'full-frame', name: 'Full Frame', widthMm: 36, heightMm: 24 };
const setup: Setup = { sensorId: sensor.id, customSensor: sensor, focalLengthMm: 50, aperture: 8, distanceMm: 5000, subjectType: 'person' };
describe('optics engine', () => {
  it('calculates known full-frame values', () => { const value = calculateOptics(setup, sensor); expect(value.circleOfConfusionMm).toBeCloseTo(.02884, 4); expect(value.hyperfocalMm).toBeCloseTo(10887, -1); expect(value.nearMm).toBeCloseTo(3437, 0); expect(value.farMm).toBeCloseTo(9171, 0); });
  it('uses infinity at the hyperfocal boundary', () => { const value = depthOfField(24, 11, 50000, .029); expect(value.farMm).toBe(Infinity); expect(value.totalDofMm).toBe(Infinity); });
  it.each([[14, 1.4, 300], [600, 32, 1_000_000], [3, .7, 100]])('stays finite or intentionally infinite at extremes', (focalLengthMm, aperture, distanceMm) => { const value = calculateOptics({ ...setup, focalLengthMm, aperture, distanceMm }, sensor); expect(value.nearMm).toBeGreaterThanOrEqual(0); expect(Number.isNaN(value.totalDofMm)).toBe(false); });
  it('supports custom and smaller sensors', () => { const value = calculateOptics(setup, { id: 'custom', name: 'Custom', widthMm: 17.3, heightMm: 13 }); expect(value.cropFactor).toBeCloseTo(2, 1); expect(value.horizontalFovDeg).toBeLessThan(20); });
  it('validates sensor dimensions', () => { expect(validSensorDimension(0)).toBe(false); expect(validSensorDimension(NaN)).toBe(false); expect(validSensorDimension(101)).toBe(false); expect(validSensorDimension(36)).toBe(true); });
  it('round-trips imperial conversions', () => expect(feetToMm(mmToFeet(12345))).toBeCloseTo(12345));
});
