import { useEffect, useRef, useState } from 'react';

function useOnClickOutside<T extends HTMLElement, D extends HTMLElement>(disabled?: boolean) {
  const triggerRef = useRef<T>(null);
  const nodeRef = useRef<D>(null);

  const [isOpen, setIsOpen] = useState(false);
  // 외부요소 클릭 감지 후 [모달, 드롭박스 등]을 닫는 함수
  const handleClickOutside = (event: Event) => {
    if (!triggerRef?.current) {
      return;
    }

    if (
      nodeRef.current &&
      nodeRef.current.contains(event.target as Node) // 모달 외부 요소라면
    ) {
      setIsOpen(true);
      return;
    }
    if (triggerRef.current.contains(event.target as Node)) {
      setIsOpen(p => !p);
      return;
    }

    if (isOpen && !triggerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!disabled) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      if (!disabled) {
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [isOpen, disabled]);

  return { isOpen, triggerRef, nodeRef, setIsOpen };
}

export default useOnClickOutside;
