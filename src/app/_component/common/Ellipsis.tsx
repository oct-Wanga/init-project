import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Placement } from 'tippy.js';
import useEllipsis, { useEllipsisHeight } from '@_hook/useEllipsis';
import Tippy from '@tippyjs/react';

import styles from './Ellipsis.module.css';

const cx = classNames.bind(styles);

interface EllipsisProps {
  contentWidth?: number;
  contentHeight?: number;
  description: string;
  placement: Placement;
  line?: 'two';
  onDetectEllipsis?: (active: boolean) => void; // 외부 감지 콜백
}

export default function Ellipsis(props: Omit<EllipsisProps, 'contentHeight' | 'line'>) {
  const { description, contentWidth, placement = 'top', onDetectEllipsis } = props;
  const { elementRef, isEllipsisActive } = useEllipsis<HTMLSpanElement>();

  useEffect(() => {
    onDetectEllipsis?.(isEllipsisActive);
  }, [isEllipsisActive, onDetectEllipsis]);

  return (
    <Tippy
      zIndex={20000}
      disabled={!isEllipsisActive}
      content={description}
      theme="lg"
      arrow={false}
      placement={placement}
      maxWidth={240}
    >
      <span
        ref={elementRef}
        className={cx('ellipsis', { 'is-ellipsis': isEllipsisActive })}
        style={{
          width: `${contentWidth}px`,
        }}
      >
        {description}
      </span>
    </Tippy>
  );
}

export function EllipsisHeight(props: Omit<EllipsisProps, 'contentWidth' | 'onDetectEllipsis'>) {
  const { description, contentHeight, placement = 'top', line } = props;
  const { elementRef, isEllipsisActive } = useEllipsisHeight<HTMLSpanElement>();

  return (
    <Tippy
      disabled={!isEllipsisActive}
      content={description}
      theme="lg"
      arrow={false}
      placement={placement}
      maxWidth={240}
    >
      <span
        ref={elementRef}
        className={cx('ellipsis-height', line)}
        style={{
          maxHeight: `${contentHeight}px`,
        }}
      >
        {description}
      </span>
    </Tippy>
  );
}
