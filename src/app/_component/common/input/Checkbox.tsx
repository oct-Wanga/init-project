import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import SVGIcon from '@_component/common/SVGIcon';

import styles from './Checkbox.module.css';

const cx = classNames.bind(styles);

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  indeterminate?: boolean;
  label?: string;
  variant?: 'transparent' | 'compact';
  id: string;
}

/**
 * 체크박스 컴포넌트
 * @todos 체크박스 chekced icon 필요
 */
function Checkbox(
  { label, color, id, indeterminate = false, variant, checked, className, ...props }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className={cx('check-box-wrapper', variant)} onClick={e => e.stopPropagation()} role="presentation">
      <label className={cx('checkbox-label')} htmlFor={id}>
        <div className={cx('checkbox-container')}>
          <input
            type="checkbox"
            ref={ref}
            id={id}
            checked={indeterminate || checked}
            className={cx('checkbox', className)}
            {...props}
          />
          <div className={cx('checkbox-icon')}>
            <SVGIcon name={indeterminate || checked ? 'icon-checkbox-checked' : 'icon-checkbox'} size={20} />
          </div>
        </div>
        {label && <span className={cx('text')}>{label}</span>}
      </label>
    </div>
  );
}

export default React.forwardRef(Checkbox);
