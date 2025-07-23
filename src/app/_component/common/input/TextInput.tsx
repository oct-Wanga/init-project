import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import SVGIcon from '@_component/common/SVGIcon';

import styles from './TextInput.module.css';

const cx = classNames.bind(styles);

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorText?: string;
  required?: boolean;
  label?: string;
  isArrow?: boolean;
  isOpen?: boolean;
}

function TextField(
  { label, required = true, errorText, error, isArrow = true, isOpen, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div>
      {label && (
        <div className={cx('label-wrapper')}>
          <label className={cx('input-label')}>{label}</label>
          {required && <span className={cx('dot')}>*</span>}
        </div>
      )}
      <div className={cx('input-area', { open: isOpen })} ref={ref as React.RefObject<HTMLDivElement>}>
        <input className={cx('input', { error })} {...props} />
        {isArrow && <SVGIcon name="icon-chevron-down" className={cx('chevron')} />}
      </div>
      {error && (
        <span className={cx('input-helperText')}>
          <SVGIcon name="icon-info-error" size={16} />
          {errorText}
        </span>
      )}
    </div>
  );
}

export default React.forwardRef(TextField);
