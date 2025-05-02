import React, { ButtonHTMLAttributes, ForwardedRef } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './IconButton.module.css';

const cx = classNames.bind(styles);

export type BtnSize = 'w-48' | 'w-42' | 'w-40' | 'w-32' | 'w-24' | 'w-20';
export type IconVariant = 'secondary' | 'tertiary' | 'transparent';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  btnSize: BtnSize;
  variant: IconVariant;
  tippyPlacement?: 'top' | 'bottom' | 'left' | 'right';
  tippyArrow?: boolean;
  tippyClassName?: string;
  label?: string;
}

function IconButton(
  {
    icon,
    btnSize,
    variant,
    tippyPlacement = 'top',
    tippyArrow = false,
    tippyClassName,
    label,
    ...props
  }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const classname = cx('icon-btn', btnSize, variant, props.className);

  return (
    <Tippy
      content={label}
      disabled={!label}
      arrow={tippyArrow}
      placement={tippyPlacement}
      theme="default"
      className={tippyClassName}
    >
      <button {...props} className={classname} ref={ref}>
        {icon}
      </button>
    </Tippy>
  );
}

export default React.forwardRef(IconButton);
