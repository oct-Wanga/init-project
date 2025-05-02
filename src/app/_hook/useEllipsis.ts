import { useEffect, useRef, useState } from 'react';

export default function useEllipsis<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  useEffect(() => {
    const { current } = elementRef;
    if (!current) {
      return;
    }
    const hasEllipsis = current.scrollWidth > current.clientWidth;

    if (hasEllipsis) {
      setIsEllipsisActive(true);
      return;
    }
    setIsEllipsisActive(false);
  }, []);

  return {
    elementRef,
    isEllipsisActive,
  };
}

export function useEllipsisHeight<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  useEffect(() => {
    const { current } = elementRef;
    if (!current) {
      return;
    }
    const hasEllipsis = current.scrollHeight > current.clientHeight;

    if (hasEllipsis) {
      setIsEllipsisActive(true);
      return;
    }
    setIsEllipsisActive(false);
  }, []);

  return {
    elementRef,
    isEllipsisActive,
  };
}
