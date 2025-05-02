import { useState } from 'react';

// @flow

export default function useToolTipClick(init: boolean) {
  const [visible, setVisible] = useState(init);
  const [isClickMode, setIsClickMode] = useState(init);

  const handlerMouseEnter = () => {
    if (!isClickMode) {
      setVisible(true);
    }
  };

  const handlerMouseLeave = () => {
    if (!isClickMode) {
      setVisible(false);
    }
  };

  const handlerClick = () => {
    if (isClickMode) {
      // 클릭 모드 종료 → 툴팁 닫힘
      setVisible(false);
      setIsClickMode(false);
    } else {
      // 🛠 마우스 호버 중 상태라도 강제로 클릭 모드 진입
      setVisible(true);
      setIsClickMode(true);
    }
  };

  return {
    visible,
    isClickMode,
    handlerMouseEnter,
    handlerMouseLeave,
    handlerClick,
    setVisible,
  };
}
