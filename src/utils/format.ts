import type { UnitSystem } from '../types';
import { mmToFeet } from '../engine/optics/conversions';

const clean = (value: number, digits = 1) => new Intl.NumberFormat(undefined, { maximumFractionDigits: digits }).format(value);
export const formatDistance = (mm: number, units: UnitSystem) => {
  if (mm === Infinity) return '∞';
  if (!Number.isFinite(mm) || mm < 0) return '—';
  if (units === 'imperial') {
    const feet = mmToFeet(mm);
    return feet < 1 ? `${clean(feet * 12)} in` : `${clean(feet, feet < 10 ? 2 : 1)} ft`;
  }
  if (mm < 10) return `${clean(mm, 2)} mm`;
  if (mm < 1000) return `${clean(mm / 10, 1)} cm`;
  return `${clean(mm / 1000, mm < 10_000 ? 2 : 1)} m`;
};
export const formatNumber = (value: number, digits = 1) => clean(value, digits);
