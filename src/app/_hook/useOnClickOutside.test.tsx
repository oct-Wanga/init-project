import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import useOnClickOutside from './useOnClickOutside';

function TestComponent({ disabled = false }: { disabled?: boolean }) {
  const { isOpen, triggerRef, nodeRef } = useOnClickOutside<HTMLButtonElement, HTMLDivElement>(disabled);

  return (
    <div>
      <button ref={triggerRef} data-testid="trigger">
        Toggle
      </button>
      {isOpen && (
        <div ref={nodeRef} data-testid="node">
          Popup
        </div>
      )}
      <div data-testid="outside">Outside</div>
      <div data-testid="state">{String(isOpen)}</div>
    </div>
  );
}

describe('useOnClickOutside', () => {
  it('toggles isOpen when trigger is clicked', () => {
    render(<TestComponent />);
    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);
    expect(screen.getByTestId('state').textContent).toBe('true');

    fireEvent.click(trigger);
    expect(screen.getByTestId('state').textContent).toBe('false');
  });

  it('sets isOpen to true when clicking inside node', () => {
    render(<TestComponent />);
    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger); // open
    const node = screen.getByTestId('node');

    fireEvent.click(node);
    expect(screen.getByTestId('state').textContent).toBe('true');
  });

  it('sets isOpen to false when clicking outside', () => {
    render(<TestComponent />);
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger); // open

    const outside = screen.getByTestId('outside');
    fireEvent.click(outside);

    expect(screen.getByTestId('state').textContent).toBe('false');
  });

  it('does nothing if disabled is true', () => {
    render(<TestComponent disabled />);
    const trigger = screen.getByTestId('trigger');
    fireEvent.click(trigger); // should not open

    expect(screen.getByTestId('state').textContent).toBe('false');
  });
});
