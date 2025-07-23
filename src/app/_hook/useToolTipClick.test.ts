import { act, renderHook } from '@testing-library/react';

import useToolTipClick from './useToolTipClick';

describe('useToolTipClick', () => {
  it('should initialize with given value', () => {
    const { result } = renderHook(() => useToolTipClick(true));
    expect(result.current.visible).toBe(true);
    expect(result.current.isClickMode).toBe(true);
  });

  it('should show tooltip on mouse enter when not in click mode', () => {
    const { result } = renderHook(() => useToolTipClick(false));

    act(() => {
      result.current.handlerMouseEnter();
    });

    expect(result.current.visible).toBe(true);
  });

  it('should hide tooltip on mouse leave when not in click mode', () => {
    const { result } = renderHook(() => useToolTipClick(false));

    act(() => {
      result.current.handlerMouseEnter(); // 먼저 hover
      result.current.handlerMouseLeave(); // 그다음 leave
    });

    expect(result.current.visible).toBe(false);
  });

  it('should toggle click mode on click', () => {
    const { result } = renderHook(() => useToolTipClick(false));

    act(() => {
      result.current.handlerClick(); // 클릭 → 활성화
    });

    expect(result.current.visible).toBe(true);
    expect(result.current.isClickMode).toBe(true);

    act(() => {
      result.current.handlerClick(); // 클릭 → 비활성화
    });

    expect(result.current.visible).toBe(false);
    expect(result.current.isClickMode).toBe(false);
  });

  it('should override hover state if clicked', () => {
    const { result } = renderHook(() => useToolTipClick(false));

    act(() => {
      result.current.handlerMouseEnter();
      result.current.handlerClick(); // 클릭으로 고정
    });

    expect(result.current.visible).toBe(true);
    expect(result.current.isClickMode).toBe(true);

    act(() => {
      result.current.handlerMouseLeave(); // leave 해도 안 꺼져야 함
    });

    expect(result.current.visible).toBe(true);
  });
});
