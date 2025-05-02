import React, { ButtonHTMLAttributes, ForwardedRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Button.module.css';

const cx = classNames.bind(styles);

type BtnSize = 'modal' | 'large' | 'medium' | 'xSmall' | 'full' | 'none';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: BtnSize;
  variant: 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'annotation';
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  active?: boolean;
}

function Loading({ size }: { size: BtnSize }) {
  const getSize = (btnSize: BtnSize) => {
    if (btnSize === 'modal' || size === 'medium') {
      return 'w-20';
    }
    if (btnSize === 'full') {
      return 'w-40';
    }
    if (size === 'large') {
      return 'w-24';
    }
    if (size === 'xSmall') {
      return 'w-14';
    }
    return 'w-20';
  };
  return <Icon.Loading size={getSize(size)} />;
}

function Button(
  { variant, size, children, startIcon, endIcon, loading, active, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const classname = cx('btn', props.className, variant, size, {
    loading,
    active,
  });

  return (
    <button ref={ref} {...props} className={classname}>
      {loading ? <Loading size={size} /> : startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  );
}

export default React.forwardRef(Button);
