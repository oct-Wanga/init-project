import React, { ButtonHTMLAttributes, ForwardedRef } from 'react';
import classNames from 'classnames/bind';
import SVGIcon from '@_component/common/SVGIcon';

import styles from './Button.module.css';

const cx = classNames.bind(styles);

type BtnSize = 'h-24' | 'h-28' | 'h-32' | 'h-36' | 'h-38' | 'h-40' | 'h-48' | 'h-56' | 'auto';
export type BtnColor = 'secondary' | 'tertiary' | 'transparent' | 'none';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: BtnSize;
  variant: BtnColor;
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}

function Loading({ size }: { size: BtnSize }) {
  const getSize = () => {
    // 버튼 크기에 따라 loading 이미지 size 수정
    switch (size) {
      case 'h-48':
        return 28;
      case 'h-40':
      case 'h-38':
        return 24;
      case 'h-36':
      case 'h-32':
        return 20;
      case 'h-28':
        return 16;
      case 'h-24':
        return 14;
      default:
        return 24;
    }
  };

  return (
    <div className={cx('loading')}>
      <SVGIcon name="icon-loading" size={getSize()} />
    </div>
  );
}

function Button(
  { variant, size, children, startIcon, endIcon, loading, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const classname = cx('btn', props.className, variant, size, { loading });

  return (
    <button ref={ref} {...props} className={classname}>
      {loading ? <Loading size={size} /> : startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  );
}

export default React.forwardRef(Button);
