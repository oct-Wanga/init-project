// @flow
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { AnimatePresence, motion } from 'framer-motion';
import IconButton from '@_component/common/button/IconButton';

import styles from './Toast.module.css';

const cx = classNames.bind(styles);

interface IToastProps {
  isOpen: boolean;
  title: string; // 메인
  description?: string; // 부가 설명
  onClose: () => void;
  status: 'success' | 'error' | 'loading';
}

const toastIcon = {
  // success: <Icon.Success size="w-24" />,
  // error: <Icon.Error size="w-24" />,
  // loading: <Icon.Loading size="w-24" />,
};

function AutoClose(props: Pick<IToastProps, 'isOpen' | 'onClose'>) {
  const { isOpen, onClose } = props;

  useEffect(() => {
    if (!isOpen) return () => {};
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <IconButton size="w-24" variant="transparent" onClick={onClose}>
      {/* <Icon.Cancel size="w-24" /> */}
    </IconButton>
  );
}

function LockedClose(props: Pick<IToastProps, 'onClose'>) {
  const { onClose } = props;
  return (
    <IconButton size="w-24" variant="transparent" onClick={onClose}>
      <Icon.Cancel size="w-24" />
    </IconButton>
  );
}

export default function Toast(props: IToastProps) {
  const { title, description, isOpen, status, onClose } = props;
  const isLock = status === 'loading';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx('toast-popup')}
        >
          <div className={cx('toast-content')}>
            {toastIcon[status]}
            <span>
              <strong> {title}</strong>
            </span>
            {description && <span>{description}</span>}
            {isLock ? <LockedClose onClose={onClose} /> : <AutoClose isOpen={isOpen} onClose={onClose} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type ToastMessageProps = Pick<IToastProps, 'title' | 'description'>;

export function FailedToast({ title, description }: ToastMessageProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseToast = () => setIsOpen(false);

  return <Toast title={title} description={description} status="error" isOpen={isOpen} onClose={handleCloseToast} />;
}

export function SuccessToast({ title, description }: ToastMessageProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseToast = () => setIsOpen(false);

  return <Toast title={title} description={description} status="success" isOpen={isOpen} onClose={handleCloseToast} />;
}

export function LoadingToast({ title, description }: ToastMessageProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseToast = () => setIsOpen(false);

  return <Toast title={title} description={description} status="loading" isOpen={isOpen} onClose={handleCloseToast} />;
}
