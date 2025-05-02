import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import Icon from '@_component/Icon/Icon';

import styles from './Input.module.css';

const cx = classNames.bind(styles);

// @flow
interface TextAreaProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  error?: boolean;
  errorText?: string;
  required?: boolean;
  size?: 'medium';
  label: string;
  isHideHelperText?: boolean;
}

function TextArea(
  { label, size = 'medium', required = true, errorText, error, isHideHelperText, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const className = cx(props.className, size);

  return (
    <div className={cx('input-wrapper', { error }, className)}>
      <div className={cx('label-wrapper')}>
        <label className={cx('input-label')}>{label}</label>
        {required && <span className={cx('dot')}>*</span>}
      </div>
      <textarea ref={ref} className={cx('input-textarea')} {...props} />
      {!isHideHelperText && (
        <span className={cx('input-helperText')}>
          {error && (
            <>
              <Icon.InputError size="w-16" />
              {errorText}
            </>
          )}
        </span>
      )}
    </div>
  );
}

export default React.forwardRef(TextArea);
