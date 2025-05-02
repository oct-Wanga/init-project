import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';

import styles from './Radio.module.css';

const cx = classNames.bind(styles);

// @flow
interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  size?: 'w-24' | 'w-28';
  options: any[];
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right';
  name: string;
  value: number;
  endIcon?: React.ReactNode;
  onChange: (value: number) => void;
}

export default function RadioGroup({
  options,
  value,
  size = 'w-24',
  name,
  labelPlacement = 'right',
  onChange,
  endIcon,
  ...props
}: RadioProps) {
  const className = cx(props.className, size, labelPlacement);

  return (
    <>
      {options.map(item => (
        <div key={item.id} className={cx('radio-wrapper')}>
          <label className={className}>
            <div>
              {item.icon}
              <input
                type="radio"
                name={name}
                value={item.id}
                checked={value === item.id}
                onChange={() => onChange(item.id)}
                {...props}
              />
              {item.text}
            </div>
            {value === item.id && endIcon}
          </label>
        </div>
      ))}
    </>
  );
}
