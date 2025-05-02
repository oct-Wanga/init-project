import React, { ButtonHTMLAttributes, ForwardedRef } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import Icon from '../Icon/Icon';

import styles from './IconButton.module.css';

const cx = classNames.bind(styles);

export type IconSize = 'w-48' | 'w-42' | 'w-40' | 'w-32' | 'w-24' | 'w-20';
export type IconVariant = 'secondary' | 'tertiary' | 'transparent' | 'ghost';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: IconSize;
  variant: IconVariant;
  tippyPlacement?: 'top' | 'bottom' | 'left' | 'right';
  tippyArrow?: boolean;
  tippyClassName?: string;
  label?: string;
  children?: React.ReactNode;
  loading?: boolean;
  loadingIconSize?: IconSize;
}

function IconButton(
  {
    size,
    variant,
    tippyPlacement = 'top',
    tippyArrow = false,
    tippyClassName,
    label,
    children,
    loading,
    loadingIconSize,
    ...props
  }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const classname = cx('icon-btn', size, variant, { loading }, props.className);

  return (
    <Tippy
      content={label}
      disabled={!label}
      arrow={tippyArrow}
      placement={tippyPlacement}
      theme="lg"
      className={tippyClassName}
    >
      <button {...props} className={classname} ref={ref}>
        {loading ? <Icon.Loading size={loadingIconSize ?? size} /> : children}
      </button>
    </Tippy>
  );
}

export default React.forwardRef(IconButton);
