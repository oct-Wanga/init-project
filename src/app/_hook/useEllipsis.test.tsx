import React from 'react';
import { act, render, screen } from '@testing-library/react';

import { useEllipsis, useEllipsisHeight } from './useEllipsis';

let resizeCallback: ResizeObserverCallback;

beforeAll(() => {
  global.ResizeObserver = class {
    observe = jest.fn();

    disconnect = jest.fn();

    constructor(cb: ResizeObserverCallback) {
      resizeCallback = cb;
    }
  } as any;
});

describe('useEllipsis', () => {
  function TestEllipsisComponent() {
    const { elementRef, isEllipsisActive } = useEllipsis<HTMLDivElement>();
    return (
      <>
        <div ref={elementRef} data-testid="horizontal">
          Horizontal
        </div>
        <div data-testid="h-result">{String(isEllipsisActive)}</div>
      </>
    );
  }

  it('horizontal ellipsis', () => {
    render(<TestEllipsisComponent />);
    const div = screen.getByTestId('horizontal') as HTMLDivElement;

    Object.defineProperties(div, {
      scrollWidth: { value: 200, configurable: true },
      clientWidth: { value: 100, configurable: true },
    });

    act(() => {
      resizeCallback([{ target: div } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    });

    expect(screen.getByTestId('h-result').textContent).toBe('true');
  });

  it('no horizontal ellipsis', () => {
    render(<TestEllipsisComponent />);
    const div = screen.getByTestId('horizontal') as HTMLDivElement;

    Object.defineProperties(div, {
      scrollWidth: { value: 100, configurable: true },
      clientWidth: { value: 200, configurable: true },
    });

    act(() => {
      resizeCallback([{ target: div } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    });

    expect(screen.getByTestId('h-result').textContent).toBe('false');
  });
});

describe('useEllipsisHeight', () => {
  function TestEllipsisHeightComponent() {
    const { elementRef, isEllipsisActive } = useEllipsisHeight<HTMLDivElement>();
    return (
      <>
        <div ref={elementRef} data-testid="vertical">
          Vertical
        </div>
        <div data-testid="v-result">{String(isEllipsisActive)}</div>
      </>
    );
  }

  it('vertical ellipsis', () => {
    render(<TestEllipsisHeightComponent />);
    const div = screen.getByTestId('vertical') as HTMLDivElement;

    Object.defineProperties(div, {
      scrollHeight: { value: 300, configurable: true },
      clientHeight: { value: 100, configurable: true },
    });

    act(() => {
      resizeCallback([{ target: div } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    });

    expect(screen.getByTestId('v-result').textContent).toBe('true');
  });

  it('no vertical ellipsis', () => {
    render(<TestEllipsisHeightComponent />);
    const div = screen.getByTestId('vertical') as HTMLDivElement;

    Object.defineProperties(div, {
      scrollHeight: { value: 100, configurable: true },
      clientHeight: { value: 300, configurable: true },
    });

    act(() => {
      resizeCallback([{ target: div } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    });

    expect(screen.getByTestId('v-result').textContent).toBe('false');
  });
});
