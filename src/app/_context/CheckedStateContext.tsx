import { createContext, useEffect, useMemo, useState } from 'react';
import useCheckBox from '@_hook/useCheckBox';

export interface ICheckedContext {
  checkedList: string[];
  isChecked: (id: string) => boolean;
  onCheckedList: (checked: boolean, id: string) => void;
  onAllCheckedList: (checked: boolean, allIds: string[]) => void;
  isAllChecked: (allIds: string[]) => boolean;
  isIndeterminate: (allIds: string[]) => boolean;
  isSelectionMode: boolean;
  handlerResetSelectionMode: () => void;
}

export const CheckedContext = createContext<ICheckedContext | null>(null);

export default function CheckedProvider({ children }: { children: React.ReactNode }) {
  const { checkedList, isChecked, onCheckedList, onAllCheckedList, isAllChecked, isIndeterminate, setCheckedList } =
    useCheckBox([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handlerResetSelectionMode = () => {
    setCheckedList([]);
    setIsSelectionMode(false);
  };

  const value = useMemo(
    () => ({
      checkedList,
      isChecked,
      onCheckedList,
      onAllCheckedList,
      isAllChecked,
      isIndeterminate,
      isSelectionMode,
      handlerResetSelectionMode,
    }),
    [checkedList, isSelectionMode],
  );

  useEffect(() => {
    if (checkedList.length > 0) {
      setIsSelectionMode(true);
    }
  }, [checkedList]);

  return <CheckedContext.Provider value={value}>{children}</CheckedContext.Provider>;
}
