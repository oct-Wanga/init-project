import { useCallback } from 'react';

interface Props {
  data: any;
  key: any;
}

/**
 * ### Object 타입을 원하는 key값으로 데이터를 sotr 하는 hook
 */
export default function useObjectSort() {
  const onUpSort = useCallback(({ data, key }: Props) => {
    const tempUserList = JSON.parse(JSON.stringify(data));
    tempUserList.sort((a: any, b: any) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });

    return tempUserList;
  }, []);

  const onDownSort = useCallback(({ data, key }: Props) => {
    const tempUserList = JSON.parse(JSON.stringify(data));
    tempUserList.sort((a: any, b: any) => {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    });

    return tempUserList;
  }, []);

  return { onUpSort, onDownSort };
}
