export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
export const validSensorDimension = (value: number) => Number.isFinite(value) && value >= 2 && value <= 100;
export const sanitizeFocal = (value: number) => clamp(value, 3, 600);
export const sanitizeAperture = (value: number) => clamp(value, 0.7, 32);
export const sanitizeDistance = (value: number) => clamp(value, 100, 1_000_000);
