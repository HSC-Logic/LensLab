export type UnitSystem = 'metric' | 'imperial';
export type Theme = 'light' | 'dark' | 'system';
export type ExperienceMode = 'beginner' | 'advanced';
export type SubjectType = 'person' | 'couple' | 'group' | 'product' | 'flower';

export interface Sensor { id: string; name: string; widthMm: number; heightMm: number; }
export interface Setup { sensorId: string; customSensor: Sensor; focalLengthMm: number; aperture: number; distanceMm: number; subjectType: SubjectType; }
export interface SavedSetup { id: string; name: string; setup: Setup; createdAt: string; }
export interface OpticsResult { sensorDiagonalMm: number; cropFactor: number; circleOfConfusionMm: number; equivalentFocalLengthMm: number; hyperfocalMm: number; nearMm: number; farMm: number; totalDofMm: number; frontDofMm: number; rearDofMm: number; horizontalFovDeg: number; verticalFovDeg: number; diagonalFovDeg: number; diffraction: string; }
