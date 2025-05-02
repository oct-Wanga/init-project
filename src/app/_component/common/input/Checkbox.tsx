import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';

import styles from './Checkbox.module.css';

const cx = classNames.bind(styles);

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  indeterminate?: boolean;
  size?: 'w-24' | 'w-28';
  label?: string;
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'transparent' | 'compact';
  id: string;
}

function Checkbox(
  {
    label,
    size = 'w-24',
    color,
    id,
    indeterminate = false,
    labelPlacement = 'right',
    variant,
    checked,
    ...props
  }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const className = cx(props.className, size, color, checked, { indeterminate }, labelPlacement);
  const isChecked = indeterminate || checked;

  return (
    <div className={cx('check-box-wrapper', variant)} onClick={e => e.stopPropagation()} role="presentation">
      <input type="checkbox" ref={ref} id={id} checked={isChecked} {...props} />
      {label ? (
        <label htmlFor={id} className={className}>
          <span className={cx('text')}>{label}</span>
        </label>
      ) : (
        <label htmlFor={id} className={className} />
      )}
    </div>
  );
}

export default React.forwardRef(Checkbox);
