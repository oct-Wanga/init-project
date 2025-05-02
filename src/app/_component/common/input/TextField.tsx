import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import Icon from '@_component/Icon/Icon';

import styles from './Input.module.css';

const cx = classNames.bind(styles);

// @flow
interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
  helperText?: string;
  required?: boolean;
  size?: 'medium';
  label?: string;
  isHideHelperText?: boolean;
}

function TextField(
  { label, size = 'medium', required = true, helperText, error, isHideHelperText, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const className = cx(props.className, size);

  return (
    <div className={cx('input-wrapper', { error }, className)}>
      {label && (
        <div className={cx('label-wrapper')}>
          <label className={cx('input-label')}>{label}</label>
          {required && <span className={cx('dot')}>*</span>}
        </div>
      )}
      <input className={cx('input-area')} ref={ref} {...props} />
      {!isHideHelperText && (
        <span className={cx('input-helperText')}>
          {error && <Icon.InputError size="w-16" />}
          {helperText}
        </span>
      )}
    </div>
  );
}

export default React.forwardRef(TextField);
