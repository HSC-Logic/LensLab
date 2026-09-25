import type { SavedSetup } from '../types';

const KEY = 'lenslab:saved:v1';
export const loadSaved = (): SavedSetup[] => {
  try { const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]'); return Array.isArray(parsed) ? parsed.filter(item => item && typeof item === 'object' && 'setup' in item && 'name' in item) as SavedSetup[] : []; } catch { return []; }
};
export const storeSaved = (setups: SavedSetup[]) => { try { localStorage.setItem(KEY, JSON.stringify(setups)); return true; } catch { return false; } };
