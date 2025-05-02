import React, { ButtonHTMLAttributes, ForwardedRef } from 'react';
import classNames from 'classnames/bind';
import SVGIcon from '@_component/common/SVGIcon';

import styles from './Button.module.css';

const cx = classNames.bind(styles);

type BtnSize = 'h-24' | 'h-32' | 'h-38' | 'h-40' | 'h-46' | 'none' | 'full';

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
  const getSize = () => {
    // 버튼 크기에 따라 loading 이미지 size 수정
    if (size === 'h-24') {
      return 20;
    }
    return 24;
  };

  return <SVGIcon className="" size={getSize()} />;
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
