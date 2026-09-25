import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  beforeEach(() => { localStorage.clear(); history.replaceState(null, '', '/'); });
  it('updates optical results from a camera control', () => { render(<App />); const input = screen.getByLabelText('Focal length slider'); fireEvent.change(input, { target: { value: '35' } }); expect(screen.getAllByText('35 mm')[0]).toBeInTheDocument(); });
  it('opens comparison mode', () => { render(<App />); fireEvent.click(screen.getAllByText('Compare')[0]); expect(screen.getByText('Setup A versus Setup B')).toBeInTheDocument(); });
  it('switches to advanced technical results', () => { render(<App />); fireEvent.click(screen.getByText('Advanced')); expect(screen.getByText('Circle of confusion')).toBeInTheDocument(); });
  it('keeps scene drag and distance control synchronized', () => { render(<App />); fireEvent.change(screen.getByLabelText('Subject distance slider'), { target: { value: '6' } }); expect(screen.getByLabelText('Subject distance numeric value')).toHaveValue(6); expect(screen.getByRole('img', { name: /focused at 6 m/i })).toBeInTheDocument(); });
});
