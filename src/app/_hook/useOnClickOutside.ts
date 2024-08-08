import React, { useEffect, useState } from 'react';

/**
 * ### 외부 영역 클릭 감지 Hook
 * @param {React.RefObject<any>} triggerRef : 트리거 ref
 * @param {React.RefObject<any> | undefined} nodeRef  트리거 후 활성화될 요소 ref(드롭박스, 팝업, 모달 등)
 * @param disabled 함수 사용 여부
 * @returns {isOpen: 띄우는 변수}
 */

function useOnClickOutside(triggerRef: React.RefObject<any>, nodeRef: React.RefObject<any>, disabled?: boolean) {
  const [isOpen, setIsOpen] = useState(false);
  // 외부요소 클릭 감지 후 [모달, 드롭박스 등]을 닫는 함수
  const handleClickOutside = (event: Event) => {
    if (!triggerRef?.current) {
      return;
    }

    if (triggerRef.current.contains(event.target as Node)) {
      setIsOpen(p => !p);
      return;
    }
    if (
      nodeRef.current &&
      nodeRef.current.contains(event.target as Node) // 모달 외부 요소라면
    ) {
      setIsOpen(true);
      return;
    }
    if (isOpen && !triggerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!disabled) {
      document.addEventListener('click', handleClickOutside, true); // 이벤트 캡처링
    }
    return () => {
      if (!disabled) {
        document.removeEventListener('click', handleClickOutside, true);
      }
    };
  }, [isOpen, disabled]);

  return { isOpen };
}

export default useOnClickOutside;
