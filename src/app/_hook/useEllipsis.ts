import { useEffect, useRef, useState } from 'react';

export function useEllipsis<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  useEffect(() => {
    const { current } = elementRef;
    if (!current) return () => {};

    const observer = new ResizeObserver(() => {
      if (!current) return;
      setIsEllipsisActive(current.scrollWidth > current.clientWidth);
    });

    observer.observe(current);
    // 최초 체크
    setIsEllipsisActive(current.scrollWidth > current.clientWidth);

    return () => observer.disconnect();
  }, []);

  return { elementRef, isEllipsisActive };
}

export function useEllipsisHeight<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  useEffect(() => {
    const { current } = elementRef;
    if (!current) return () => {};

    const observer = new ResizeObserver(() => {
      if (!current) return;
      setIsEllipsisActive(current.scrollHeight > current.clientHeight);
    });

    observer.observe(current);
    // 최초 체크
    setIsEllipsisActive(current.scrollHeight > current.clientHeight);

    return () => observer.disconnect();
  }, []);

  return { elementRef, isEllipsisActive };
}
