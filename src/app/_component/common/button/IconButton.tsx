import React, { ButtonHTMLAttributes, ForwardedRef } from 'react';
import classNames from 'classnames/bind';
import { BtnColor } from '@_component/common/button/Button';
import Tippy from '@tippyjs/react';

import SVGIcon from '../SVGIcon';

import styles from './IconButton.module.css';

const cx = classNames.bind(styles);

export type BtnSize = 'w-24' | 'w-40' | 'w-42' | 'auto';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  btnSize: BtnSize;
  variant: BtnColor;
  tippyPlacement?: 'top' | 'bottom' | 'left' | 'right';
  tippyArrow?: boolean;
  tippyClassName?: string;
  label?: string | React.ReactNode;
  loading?: boolean;
}

function Loading({ size }: { size: BtnSize }) {
  const getSize = () => Number(size.replace('w-', ''));
  return <SVGIcon name="icon-loading" size={getSize()} />;
}

function IconButton(props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    icon,
    btnSize = 'w-40',
    variant = 'tertiary',
    tippyPlacement = 'top',
    tippyArrow = true,
    tippyClassName,
    label,
    loading = false,
    className,
    ...rest
  } = props;
  const classname = cx('icon-btn', btnSize, variant, className, { loading });

  return (
    <Tippy
      content={label}
      disabled={!label}
      arrow={tippyArrow}
      placement={tippyPlacement}
      theme="default"
      className={tippyClassName}
    >
      <button {...rest} className={classname} ref={ref}>
        {loading ? <Loading size={btnSize} /> : icon}
      </button>
    </Tippy>
  );
}

export default React.forwardRef(IconButton);
