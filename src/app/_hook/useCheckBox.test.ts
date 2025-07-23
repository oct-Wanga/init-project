import { act, renderHook } from '@testing-library/react';

import useCheckBox from './useCheckBox';

describe('useCheckBox 테스트', () => {
  const ids = ['A', 'B', 'C'];

  test('초기값 없이 생성할 경우 checkedList는 빈 배열', () => {
    const { result } = renderHook(() => useCheckBox([], true));
    expect(result.current.checkedList).toEqual([]);
  });

  test('defaultCheckedIds 적용 시 초기값 반영', () => {
    const { result } = renderHook(() => useCheckBox(['A']));
    expect(result.current.checkedList).toEqual(['A']);
  });

  test('onCheckedList - 체크 시 id 추가', () => {
    const { result } = renderHook(() => useCheckBox([]));

    act(() => {
      result.current.onCheckedList(true, 'A');
    });

    expect(result.current.checkedList).toEqual(['A']);
  });

  test('onCheckedList - 체크 해제 시 id 제거', () => {
    const { result } = renderHook(() => useCheckBox(['A']));

    act(() => {
      result.current.onCheckedList(false, 'A');
    });

    expect(result.current.checkedList).toEqual([]);
  });

  test('onAllCheckedList - 전체 체크 시 모두 포함', () => {
    const { result } = renderHook(() => useCheckBox([]));

    act(() => {
      result.current.onAllCheckedList(true, ids);
    });

    expect(result.current.checkedList).toEqual(ids);
  });

  test('onAllCheckedList - 전체 해제 시 빈 배열', () => {
    const { result } = renderHook(() => useCheckBox(['A', 'B']));

    act(() => {
      result.current.onAllCheckedList(false, ids);
    });

    expect(result.current.checkedList).toEqual([]);
  });

  test('isChecked - 특정 id가 체크됐는지 확인', () => {
    const { result } = renderHook(() => useCheckBox(['A']));

    expect(result.current.isChecked('A')).toBe(true);
    expect(result.current.isChecked('B')).toBe(false);
  });

  test('isAllChecked - 전체 선택 여부 확인', () => {
    const { result } = renderHook(() => useCheckBox(['A', 'B', 'C']));
    expect(result.current.isAllChecked(ids)).toBe(true);
  });

  test('isIndeterminate - 일부만 선택된 경우 true', () => {
    const { result } = renderHook(() => useCheckBox(['A']));
    expect(result.current.isIndeterminate(ids)).toBe(true);
  });

  test('isIndeterminate - 모두 선택 시 false', () => {
    const { result } = renderHook(() => useCheckBox(ids));
    expect(result.current.isIndeterminate(ids)).toBe(false);
  });

  test('isIndeterminate - 아무 것도 선택 안 됐을 때 false', () => {
    const { result } = renderHook(() => useCheckBox([], true));
    expect(result.current.isIndeterminate(ids)).toBe(false);
  });
});
