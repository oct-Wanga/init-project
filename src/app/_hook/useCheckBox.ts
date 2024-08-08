import { useCallback, useState } from 'react';

/**
 * ### 배열 안에 CheckBox 데이터 관리 hook
 */
export default function useCheckBox() {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const onAllCheckedList = useCallback(
    (checked: boolean, allList: any) => {
      if (checked) {
        setCheckedList(allList);
      } else {
        setCheckedList([]);
      }
    },
    [checkedList],
  );

  const onCheckedList = useCallback(
    (checked: boolean, item: string) => {
      if (checked) {
        setCheckedList(prev => [...prev, item]);
      } else {
        setCheckedList(checkedList.filter(el => el !== item));
      }
    },
    [checkedList],
  );

  return { checkedList, setCheckedList, onCheckedList, onAllCheckedList };
}
