import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import classNames from 'classnames/bind';
import { Placement } from 'tippy.js';
import type { Options as PopperOptions } from '@popperjs/core';
import Tippy from '@tippyjs/react';

import styles from './Tooltip.module.css';

const cx = classNames.bind(styles);

interface TooltipProps {
  label: string | React.ReactNode;
  theme?: string;
  placement?: Placement;
  arrow?: boolean;
  tippyClassName?: string;
  childClassName?: string;
  children: React.ReactNode;
  disabled?: boolean;
  visible?: boolean;
  offset?: [number, number];
  trigger?: string;
  onClickOutside?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  popperOptions?: Partial<PopperOptions>;
}

interface TooltipHandle {
  hide: () => void;
}

function Tooltip(props: TooltipProps, ref: ForwardedRef<TooltipHandle>) {
  const {
    label,
    placement = 'top',
    theme,
    arrow = false,
    tippyClassName,
    childClassName,
    children,
    disabled = false,
    visible,
    offset,
    trigger,
    onShow,
    onHide,
    onClickOutside,
    popperOptions,
  } = props;

  const [tippyInstance, setTippyInstance] = useState<any>(null);
  const setTippy = () => {
    if (React.isValidElement(label)) return label;
    switch (theme) {
      default:
        return 'err';
    }
  };

  useImperativeHandle(ref, () => ({
    hide: () => {
      tippyInstance?.hide();
    },
  }));

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
      trigger={trigger}
      onCreate={instance => setTippyInstance(instance)}
      onClickOutside={onClickOutside}
      onShow={onShow}
      onHide={onHide}
      popperOptions={popperOptions}
    >
      <div className={childWrapperClassName}>{children}</div>
    </Tippy>
  );
}

export default forwardRef(Tooltip);
