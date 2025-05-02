import { useCallback, useState } from 'react';

export interface ICheckBox {
  checkedList: string[];
  setCheckedList: (value: string[]) => void;
  onCheckedList: (checked: boolean, id: string) => void;
  onAllCheckedList: (checked: boolean, allIds: string[]) => void;
  isChecked: (id: string) => boolean;
  isAllChecked: (allIds: string[]) => boolean;
  isIndeterminate: (allIds: string[]) => boolean;
}
/**
 * ### 배열 안에 CheckBox 데이터 관리 hook
 */
export default function useCheckBox(defaultCheckedIds: string[], isEmpty?: boolean): ICheckBox {
  const [checkedList, setCheckedList] = useState<string[]>(isEmpty ? [] : defaultCheckedIds);

  const onAllCheckedList = useCallback((checked: boolean, allIds: string[]) => {
    if (checked) {
      setCheckedList(allIds);
    } else {
      setCheckedList([]);
    }
  }, []);

  const onCheckedList = useCallback((checked: boolean, id: string) => {
    setCheckedList(prev => (checked ? [...prev, id] : prev.filter(item => item !== id)));
  }, []);

  const isChecked = useCallback((id: string) => checkedList.includes(id), [checkedList]);

  const isAllChecked = useCallback((allIds: string[]) => allIds.every(id => checkedList.includes(id)), [checkedList]);

  const isIndeterminate = useCallback(
    (allIds: string[]) => {
      const hasChecked = allIds.some(id => checkedList.includes(id));
      const notAllChecked = !allIds.every(id => checkedList.includes(id));
      return hasChecked && notAllChecked;
    },
    [checkedList],
  );

  return {
    checkedList,
    setCheckedList,
    onCheckedList,
    onAllCheckedList,
    isChecked,
    isAllChecked,
    isIndeterminate,
  };
}
