import { useCallback } from 'react';

interface Props {
  data: any;
  key: any;
}

/**
 * ### Object 타입을 원하는 key값으로 데이터를 sort 하는 hook
 * - null/undefined는 항상 뒤로 정렬
 * - 문자열은 localeCompare (ko) 기준 정렬
 */
export default function useObjectSort() {
  const sortWithLocale = useCallback((a: any, b: any, key: any, order: 'asc' | 'desc') => {
    const aValue = a[key];
    const bValue = b[key];

    const isANull = aValue === null;
    const isAUndefined = aValue === undefined;
    const isBNull = bValue === null;
    const isBUndefined = bValue === undefined;

    // 🔽 null/undefined 우선순위: 유효 > null > undefined
    if ((isANull || isAUndefined) && (isBNull || isBUndefined)) {
      if (isANull && isBUndefined) return -1;
      if (isAUndefined && isBNull) return 1;
      return 0;
    }

    if (isANull || isAUndefined) return 1;
    if (isBNull || isBUndefined) return -1;

    // 문자열 정렬
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const result = aValue.localeCompare(bValue, 'ko');
      return order === 'asc' ? result : -result;
    }

    // 숫자 등 기본 비교
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;

    return 0;
  }, []);

  const onUpSort = useCallback(
    ({ data, key }: Props) => {
      const tempList = JSON.parse(JSON.stringify(data));
      tempList.sort((a: any, b: any) => sortWithLocale(a, b, key, 'asc'));
      return tempList;
    },
    [sortWithLocale],
  );

  const onDownSort = useCallback(
    ({ data, key }: Props) => {
      const tempList = JSON.parse(JSON.stringify(data));
      tempList.sort((a: any, b: any) => sortWithLocale(a, b, key, 'desc'));
      return tempList;
    },
    [sortWithLocale],
  );

  return { onUpSort, onDownSort };
}
