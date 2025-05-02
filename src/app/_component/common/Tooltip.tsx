import React from 'react';
import classNames from 'classnames/bind';
import { Placement } from 'tippy.js';
import Tippy from '@tippyjs/react';

import styles from './Tooltip.module.css';

const cx = classNames.bind(styles);

interface TooltipProps {
  label: string | React.ReactNode;
  theme?: string;
  placement?: Placement;
  arrow?: boolean;
  rootClassName?: string;
  childClassName?: string;
  children: React.ReactNode;
  disabled?: boolean;
  visible?: boolean;
  offset?: [number, number];
  onClick?: () => void;
}

export default function Tooltip({
  label,
  placement = 'top',
  theme,
  arrow = false,
  rootClassName,
  childClassName,
  children,
  disabled = false,
  visible,
  offset,
  onClick,
}: TooltipProps) {
  const setTippy = () => {
    if (React.isValidElement(label)) return label;
    switch (theme) {
      default:
        return 'err';
    }
  };

  const tippyClassName = cx('shadow', rootClassName);
  const childWrapperClassName = cx('content', childClassName);

  return (
    <Tippy
      content={setTippy()}
      arrow={arrow}
      placement={placement}
      theme={theme}
      offset={offset ?? [0, 8]}
      className={tippyClassName}
      disabled={disabled}
      visible={visible}
      interactive
      appendTo={() => document.body}
    >
      <div className={childWrapperClassName}>{children}</div>
    </Tippy>
  );
}
