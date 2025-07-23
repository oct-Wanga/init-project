import { renderHook } from '@testing-library/react';

import useObjectSort from './useObjectSort';

describe('useObjectSort', () => {
  const sampleData = [
    { id: 3, name: 'Charlie' },
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  it('should sort by id in ascending order', () => {
    const { result } = renderHook(() => useObjectSort());
    const sorted = result.current.onUpSort({ data: sampleData, key: 'id' });

    expect(sorted).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  it('should sort by id in descending order', () => {
    const { result } = renderHook(() => useObjectSort());
    const sorted = result.current.onDownSort({ data: sampleData, key: 'id' });

    expect(sorted).toEqual([
      { id: 3, name: 'Charlie' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
    ]);
  });

  it('should sort by name in ascending order', () => {
    const { result } = renderHook(() => useObjectSort());
    const sorted = result.current.onUpSort({ data: sampleData, key: 'name' });

    expect(sorted).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  it('should sort by name in descending order', () => {
    const { result } = renderHook(() => useObjectSort());
    const sorted = result.current.onDownSort({ data: sampleData, key: 'name' });

    expect(sorted).toEqual([
      { id: 3, name: 'Charlie' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
    ]);
  });

  it('should not mutate the original data', () => {
    const original = [...sampleData];
    const { result } = renderHook(() => useObjectSort());
    result.current.onUpSort({ data: sampleData, key: 'id' });

    expect(sampleData).toEqual(original);
  });

  it('should return same order if key does not exist in objects', () => {
    const { result } = renderHook(() => useObjectSort());
    const sorted = result.current.onUpSort({ data: sampleData, key: 'nonexistent' });

    expect(sorted).toEqual(sampleData); // 아무 변화 없음
  });

  it('should handle null or undefined key values gracefully', () => {
    const dataWithNull = [
      { id: 1, name: 'Alice' },
      { id: 2 }, // name 없음 → undefined
      { id: 3, name: null },
      { id: 4, name: 'Bob' },
    ];

    const { result } = renderHook(() => useObjectSort());
    const sorted = result.current.onUpSort({ data: dataWithNull, key: 'name' });

    expect(sorted).toEqual([
      { id: 1, name: 'Alice' },
      { id: 4, name: 'Bob' },
      { id: 3, name: null },
      { id: 2 }, // undefined
    ]);
  });

  it('should return original order if all key values are undefined', () => {
    const dataAllUndefined = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const { result } = renderHook(() => useObjectSort());
    const sorted = result.current.onDownSort({ data: dataAllUndefined, key: 'name' });

    expect(sorted).toEqual(dataAllUndefined); // 정렬 효과 없음
  });
});
