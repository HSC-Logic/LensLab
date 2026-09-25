import type { Setup } from '../types';
import { sensors } from '../data/sensors';
import { sanitizeAperture, sanitizeDistance, sanitizeFocal, validSensorDimension } from '../engine/optics/validation';

export const readSetupFromUrl = (fallback: Setup, search = location.search): Setup => {
  const query = new URLSearchParams(search);
  const sensorId = query.get('sensor') ?? fallback.sensorId;
  const sensorValid = sensorId === 'custom' || sensors.some(sensor => sensor.id === sensorId);
  const width = Number(query.get('sw'));
  const height = Number(query.get('sh'));
  const focal = Number(query.get('focal'));
  const aperture = Number(query.get('aperture'));
  const distanceM = Number(query.get('distance'));
  const subject = query.get('subject');
  const subjectType = ['person', 'couple', 'group', 'product', 'flower'].includes(subject ?? '') ? subject as Setup['subjectType'] : fallback.subjectType;
  return {
    ...fallback,
    sensorId: sensorValid ? sensorId : fallback.sensorId,
    focalLengthMm: Number.isFinite(focal) && focal >= 3 && focal <= 600 ? sanitizeFocal(focal) : fallback.focalLengthMm,
    aperture: Number.isFinite(aperture) && aperture >= .7 && aperture <= 32 ? sanitizeAperture(aperture) : fallback.aperture,
    distanceMm: Number.isFinite(distanceM) && distanceM >= .1 && distanceM <= 1000 ? sanitizeDistance(distanceM * 1000) : fallback.distanceMm,
    subjectType,
    customSensor: validSensorDimension(width) && validSensorDimension(height) ? { ...fallback.customSensor, widthMm: width, heightMm: height } : fallback.customSensor,
  };
};
export const setupToQuery = (setup: Setup) => {
  const query = new URLSearchParams({ sensor: setup.sensorId, focal: String(setup.focalLengthMm), aperture: String(setup.aperture), distance: String(setup.distanceMm / 1000), subject: setup.subjectType });
  if (setup.sensorId === 'custom') { query.set('sw', String(setup.customSensor.widthMm)); query.set('sh', String(setup.customSensor.heightMm)); }
  return query.toString();
};
