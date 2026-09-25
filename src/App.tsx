import { useEffect, useMemo, useReducer, useState } from 'react';
import { Aperture, BookOpen, ChevronDown, Copy, Moon, Redo2, RotateCcw, Save, Share2, Sun, Trash2, Undo2 } from 'lucide-react';
import { Control } from './components/Control';
import { Info } from './components/Info';
import { Preview } from './components/Preview';
import { Results } from './components/Results';
import { Scene } from './components/Scene';
import { presets } from './data/presets';
import { getSensor, sensors } from './data/sensors';
import { calculateOptics } from './engine/optics';
import { feetToMm, mmToFeet } from './engine/optics/conversions';
import { sanitizeAperture, sanitizeDistance, sanitizeFocal, validSensorDimension } from './engine/optics/validation';
import type { ExperienceMode, SavedSetup, Setup, SubjectType, Theme, UnitSystem } from './types';
import { loadSaved, storeSaved } from './utils/storage';
import { readSetupFromUrl, setupToQuery } from './utils/urlState';

const DEFAULT: Setup = { sensorId: 'full-frame', customSensor: { id: 'custom', name: 'Custom sensor', widthMm: 36, heightMm: 24 }, focalLengthMm: 85, aperture: 1.8, distanceMm: 3000, subjectType: 'person' };
type History = { past: Setup[]; present: Setup; future: Setup[] };
type Action = { type: 'set'; setup: Setup } | { type: 'undo' | 'redo' };
const reducer = (state: History, action: Action): History => {
  if (action.type === 'undo' && state.past.length) return { past: state.past.slice(0, -1), present: state.past.at(-1)!, future: [state.present, ...state.future] };
  if (action.type === 'redo' && state.future.length) return { past: [...state.past, state.present], present: state.future[0], future: state.future.slice(1) };
  if (action.type === 'set') return { past: [...state.past.slice(-39), state.present], present: action.setup, future: [] };
  return state;
};
const stops = [0.7, 1, 1.2, 1.4, 1.8, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];
const focalShortcuts = [14, 16, 20, 24, 28, 35, 50, 70, 85, 100, 105, 135, 200, 300, 400, 600];

export default function App() {
  const [history, dispatch] = useReducer(reducer, { past: [], present: readSetupFromUrl(DEFAULT), future: [] });
  const setup = history.present;
  const [units, setUnits] = useState<UnitSystem>('metric');
  const [mode, setMode] = useState<ExperienceMode>('beginner');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('lenslab:theme') as Theme) || 'system');
  const [compare, setCompare] = useState(false);
  const [setupB, setSetupB] = useState<Setup>({ ...DEFAULT, focalLengthMm: 35, aperture: 2.8 });
  const [saved, setSaved] = useState(loadSaved);
  const [storageMessage, setStorageMessage] = useState('');
  const sensor = getSensor(setup.sensorId, setup.customSensor);
  const result = useMemo(() => calculateOptics(setup, sensor), [setup, sensor]);
  const resultB = useMemo(() => calculateOptics(setupB, getSensor(setupB.sensorId, setupB.customSensor)), [setupB]);
  const update = (patch: Partial<Setup>) => dispatch({ type: 'set', setup: { ...setup, ...patch } });
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('lenslab:theme', theme); }, [theme]);

  const saveCurrent = () => {
    const name = window.prompt('Setup name', 'My setup')?.trim(); if (!name) return;
    const next = [...saved, { id: crypto.randomUUID(), name, setup, createdAt: new Date().toISOString() }];
    setSaved(next); setStorageMessage(storeSaved(next) ? 'Setup saved.' : 'Storage unavailable. Setup kept for this session.');
  };
  const replaceSaved = (next: SavedSetup[]) => { setSaved(next); if (!storeSaved(next)) setStorageMessage('Storage unavailable. Changes may not persist.'); };
  const share = async () => {
    const url = `${location.origin}${location.pathname}?${setupToQuery(setup)}`;
    try { await navigator.clipboard.writeText(url); setStorageMessage('Share link copied.'); } catch { window.history.replaceState(null, '', `?${setupToQuery(setup)}`); setStorageMessage('Share URL placed in the address bar.'); }
  };

  return <div className="app-shell">
    <header><a className="brand" href="#top" aria-label="LensLab home"><span><Aperture /></span><b>LensLab</b><small>OPTICAL WORKBENCH</small></a><nav aria-label="Primary"><a href="#simulator">Simulator</a><button onClick={() => setCompare(value => !value)}>Compare</button><a href="#learn">Learn</a></nav><div className="header-actions"><button className="icon-button" aria-label="Undo" disabled={!history.past.length} onClick={() => dispatch({ type: 'undo' })}><Undo2 /></button><button className="icon-button" aria-label="Redo" disabled={!history.future.length} onClick={() => dispatch({ type: 'redo' })}><Redo2 /></button><button className="theme-button" onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')} aria-label={`Theme: ${theme}`}>{theme === 'dark' ? <Moon /> : <Sun />}<span>{theme}</span></button></div></header>
    <main id="top">
      <div className="hero-copy"><div><small>INTERACTIVE DEPTH OF FIELD</small><h1>Frame. Focus. <em>Understand.</em></h1></div><p>Move the subject or adjust the three controls. Results update instantly.</p></div>
      <div id="simulator" className="workspace">
        <Scene setup={setup} result={result} units={units} onDistance={distanceMm => update({ distanceMm: sanitizeDistance(distanceMm) })} />
        <aside className="controls-card">
          <div className="panel-heading"><div><small>CAMERA CONTROLS</small><h2>Build your setup</h2></div><div className="segmented"><button className={mode === 'beginner' ? 'active' : ''} onClick={() => setMode('beginner')}>Simple</button><button className={mode === 'advanced' ? 'active' : ''} onClick={() => setMode('advanced')}>Advanced</button></div></div>
          <label className="select-label">Sensor format <Info text="Sensor dimensions affect field of view, crop factor, and the circle-of-confusion assumption."/><select value={setup.sensorId} onChange={event => update({ sensorId: event.target.value })}>{sensors.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}<option value="custom">Custom sensor</option></select></label>
          {setup.sensorId === 'custom' && <div className="custom-sensor"><label>Width (mm)<input type="number" min="2" max="100" value={setup.customSensor.widthMm} onChange={event => { const widthMm = Number(event.target.value); if (validSensorDimension(widthMm)) update({ customSensor: { ...setup.customSensor, widthMm } }); }} /></label><label>Height (mm)<input type="number" min="2" max="100" value={setup.customSensor.heightMm} onChange={event => { const heightMm = Number(event.target.value); if (validSensorDimension(heightMm)) update({ customSensor: { ...setup.customSensor, heightMm } }); }} /></label></div>}
          <label className="select-label">Subject<select value={setup.subjectType} onChange={event => update({ subjectType: event.target.value as SubjectType })}><option value="person">Person</option><option value="couple">Couple</option><option value="group">Group</option><option value="product">Product</option><option value="flower">Flower</option></select></label>
          <Control ariaLabel="Focal length" label={<>Focal length <Info text="Focal length changes angle of view and framing. Perspective primarily changes when camera position changes."/></>} value={setup.focalLengthMm} min={3} max={600} step={1} onChange={value => update({ focalLengthMm: sanitizeFocal(value) })}><div className="chips">{focalShortcuts.map(value => <button className={setup.focalLengthMm === value ? 'selected' : ''} key={value} onClick={() => update({ focalLengthMm: value })}>{value}</button>)}</div></Control>
          <Control ariaLabel="Aperture" label={<>Aperture <Info text="A smaller f-number admits more light and usually narrows depth of field."/></>} value={setup.aperture} min={0.7} max={32} step={0.1} onChange={value => update({ aperture: sanitizeAperture(value) })}><div className="chips stops">{stops.map(value => <button className={setup.aperture === value ? 'selected' : ''} key={value} onClick={() => update({ aperture: value })}>f/{value}</button>)}</div></Control>
          <Control ariaLabel="Subject distance" label={<>Subject distance ({units === 'metric' ? 'm' : 'ft'}) <Info text="Distance is measured from the camera sensor plane to the focused subject."/></>} value={Number((units === 'metric' ? setup.distanceMm / 1000 : mmToFeet(setup.distanceMm)).toFixed(2))} min={units === 'metric' ? .1 : .33} max={units === 'metric' ? 1000 : 3280} step={units === 'metric' ? .1 : .25} onChange={value => update({ distanceMm: sanitizeDistance(units === 'metric' ? value * 1000 : feetToMm(value)) })} />
          {mode === 'beginner' && <div className="plain-language"><b>{result.totalDofMm < 500 ? 'Very shallow focus' : result.totalDofMm < 3000 ? 'Selective focus' : 'Broad focus range'}</b><p>{result.totalDofMm < 500 ? 'Only a narrow area around your subject meets the selected sharpness criterion.' : 'More of the scene around your subject falls within the selected sharpness criterion.'}</p></div>}
          <div className="control-actions"><button onClick={() => update({ distanceMm: Math.min(result.hyperfocalMm + setup.focalLengthMm, 1_000_000) })}>Focus at hyperfocal</button><button onClick={() => dispatch({ type: 'set', setup: DEFAULT })}><RotateCcw/> Reset</button></div>
          <div className="select-row"><label>Units<select value={units} onChange={event => setUnits(event.target.value as UnitSystem)}><option value="metric">Metric</option><option value="imperial">Imperial</option></select></label><label>Quick preset<select defaultValue="" onChange={event => { const preset = presets.find(item => item.name === event.target.value); if (preset) update(preset.values); }}><option value="" disabled>Choose a starting point</option>{[...new Set(presets.map(item => item.category))].map(category => <optgroup key={category} label={category}>{presets.filter(item => item.category === category).map(item => <option key={item.name}>{item.name}</option>)}</optgroup>)}</select></label></div>
          <div className="save-actions"><button onClick={saveCurrent}><Save/> Save</button><button onClick={share}><Share2/> Share</button><button onClick={() => setCompare(value => !value)}><Copy/> Compare</button></div>{storageMessage && <p className="status" role="status">{storageMessage}</p>}
        </aside>
      </div>
      <Results setup={setup} result={result} units={units} advanced={mode === 'advanced'} />
      <details className="preview-disclosure"><summary>Open educational camera preview <ChevronDown/></summary><Preview setup={setup} result={result} /></details>
      {compare && <section className="compare"><div className="section-title"><div><small>COMPARISON MODE</small><h2>Setup A versus Setup B</h2></div><button onClick={() => setCompare(false)}>Close</button></div><div className="compare-grid"><Comparison name="A" setup={setup} result={result} units={units} /><div className="compare-controls"><label>Setup B sensor<select value={setupB.sensorId} onChange={event => setSetupB({ ...setupB, sensorId: event.target.value })}>{sensors.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Focal length<input type="number" min="3" max="600" value={setupB.focalLengthMm} onChange={event => setSetupB({ ...setupB, focalLengthMm: sanitizeFocal(Number(event.target.value)) })}/></label><label>Aperture<input type="number" min=".7" max="32" step=".1" value={setupB.aperture} onChange={event => setSetupB({ ...setupB, aperture: sanitizeAperture(Number(event.target.value)) })}/></label><label>Distance (m)<input type="number" min=".1" max="1000" step=".1" value={setupB.distanceMm / 1000} onChange={event => setSetupB({ ...setupB, distanceMm: sanitizeDistance(Number(event.target.value) * 1000) })}/></label></div><Comparison name="B" setup={setupB} result={resultB} units={units} /></div></section>}
      <section className="saved"><div className="section-title"><div><small>YOUR KIT BAG</small><h2>Saved setups</h2></div><span>{saved.length} saved</span></div>{saved.length === 0 ? <p className="empty">No saved setups yet. Save a setup to build your personal shot library.</p> : <div className="saved-grid">{saved.map(item => <article key={item.id}><h3>{item.name}</h3><p>{item.setup.focalLengthMm} mm · f/{item.setup.aperture} · {(item.setup.distanceMm / 1000).toFixed(1)} m</p><div><button onClick={() => dispatch({ type: 'set', setup: item.setup })}>Load</button><button aria-label={`Duplicate ${item.name}`} onClick={() => replaceSaved([...saved, { ...item, id: crypto.randomUUID(), name: `${item.name} copy` }])}><Copy/></button><button aria-label={`Rename ${item.name}`} onClick={() => { const name = prompt('Rename setup', item.name)?.trim(); if (name) replaceSaved(saved.map(entry => entry.id === item.id ? { ...entry, name } : entry)); }}>Rename</button><button aria-label={`Delete ${item.name}`} onClick={() => replaceSaved(saved.filter(entry => entry.id !== item.id))}><Trash2/></button></div></article>)}</div>}</section>
      <section id="learn" className="learn"><div><small>FIELD NOTES</small><h2>Learn the essentials</h2></div><details><summary>What changes depth of field?<ChevronDown/></summary><p>A wider aperture, longer focal length, or shorter focus distance generally narrows depth of field. Sensor format affects the circle-of-confusion convention used in the calculation.</p></details><details><summary>What is hyperfocal distance?<ChevronDown/></summary><p>Under the selected circle-of-confusion assumption, focusing approximately at the hyperfocal distance maximizes the range extending toward infinity.</p></details><details><summary>What changes background blur?<ChevronDown/></summary><p>Aperture, focal length, subject distance, background distance, framing, and entrance-pupil size all matter. Blur character—or bokeh—is distinct from blur amount.</p></details><div className="learn-icon"><BookOpen/></div></section>
    </main><footer><span>LensLab · Phase 1</span><span>Thin-lens educational model</span></footer>
  </div>;
}

function Comparison({ name, setup, result, units }: { name: string; setup: Setup; result: ReturnType<typeof calculateOptics>; units: UnitSystem }) {
  return <article className="compare-card"><b>SETUP {name}</b><Preview setup={setup} result={result}/><Results setup={setup} result={result} units={units} advanced={false}/><p>{setup.focalLengthMm} mm · f/{setup.aperture} · {result.horizontalFovDeg.toFixed(1)}° horizontal FoV · {result.equivalentFocalLengthMm.toFixed(0)} mm equivalent</p></article>;
}
