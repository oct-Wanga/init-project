import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import Button from '@_component/common/button/Button';
import useOnClickOutside from '@_hook/useOnClickOutside';

import styles from './Select.module.css';

const cx = classNames.bind(styles);

interface SelectProps extends Omit<InputHTMLAttributes<HTMLButtonElement>, 'size'> {
  children: React.ReactNode;
  required?: boolean;
  size?: 'w-20';
  label: string;
  value: string;
}

function Select({ children, label, size = 'w-20', required = true, value, ...props }: SelectProps) {
  const { isOpen, nodeRef, triggerRef } = useOnClickOutside<HTMLButtonElement, HTMLDivElement>();
  const className = cx(props.className, size);

  return (
    <div className={cx('select-wrapper')}>
      <div className={cx('input-wrapper', { on: isOpen }, className)}>
        <div className={cx('label-wrapper')}>
          <label className={cx('input-label')}>{label}</label>
          {required && <span className={cx('dot')}>*</span>}
        </div>
        <Button
          className="select-btn"
          variant="transparent"
          size="full"
          ref={triggerRef}
          // endIcon={<Icon.SelectArrow size={size} />}
        >
          {value}
        </Button>
      </div>
      <div className={cx('select-content')} ref={nodeRef}>
        {children}
      </div>
    </div>
  );
}

export default React.forwardRef(Select);
