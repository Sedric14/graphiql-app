import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('App <nav> exists', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
