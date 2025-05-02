'use client';

import React from 'react';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import styles from './Progressbar.module.css';

const cx = classNames.bind(styles);

interface ProgressBarProps {
  percent: number; // 0 ~ 100
  size?: 'medium' | 'large';
  status?: 'primary' | 'fail' | 'done' | 'green' | 'black';
  noRadius?: boolean;
}

export default function ProgressBar({
  percent,
  size = 'medium',
  status = 'primary',
  noRadius = false,
}: ProgressBarProps) {
  const wrapperClass = cx('progress-bar-wrapper', size);
  const trackClass = cx('progress-track', status, { 'no-radius': noRadius });
  const fillClass = cx('progress-fill', status);

  return (
    <div className={wrapperClass}>
      <div className={trackClass}>
        <motion.div
          className={fillClass}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
