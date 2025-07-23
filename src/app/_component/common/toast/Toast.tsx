// @flow
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { AnimatePresence, motion } from 'framer-motion';
import IconButton from '@_component/common/button/IconButton';
import SVGIcon from '@_component/common/SVGIcon';
import useToastStore from '@store/useToastStore';

import styles from './Toast.module.css';

const cx = classNames.bind(styles);

interface IToastProps {
  isOpen: boolean;
  title: string; // 메인
  onClose: () => void;
  status: 'success' | 'error' | 'loading';
}

const toastIcon: Record<IToastProps['status'], React.ReactNode> = {
  // Toast Icon 종류
  success: <SVGIcon name="icon-success" />,
  error: <></>,
  loading: <></>,
};

function AutoClose(props: Pick<IToastProps, 'isOpen' | 'onClose'>) {
  const { isOpen, onClose } = props;
  const { closeToast } = useToastStore();

  const onToastClose = () => {
    onClose();
    closeToast();
  };

  useEffect(() => {
    if (!isOpen) return () => {};
    const timer = setTimeout(onToastClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <IconButton
      btnSize="w-24"
      variant="transparent"
      onClick={onClose}
      icon={<SVGIcon name="icon-cancel" size={20} color="#4E5055" />}
    />
  );
}

function LockedClose(props: Pick<IToastProps, 'onClose'>) {
  const { onClose } = props;
  return (
    <IconButton
      btnSize="w-24"
      variant="transparent"
      onClick={onClose}
      icon={<SVGIcon name="icon-cancel" size={20} color="#4E5055" />}
    />
  );
}

export default function Toast(props: IToastProps) {
  const { title, isOpen, status, onClose } = props;

  const [isMultiLine, setIsMultiLine] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const isLock = status === 'loading';

  useEffect(() => {
    const element = toastRef.current;
    if (element) {
      const height = element.offsetHeight;
      setIsMultiLine(height >= 70);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={toastRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx('toast-popup', { isMultiLine })}
        >
          <div className={cx('toast-content')}>
            {toastIcon[status]}
            <span>{title}</span>
            {isLock ? <LockedClose onClose={onClose} /> : <AutoClose isOpen={isOpen} onClose={onClose} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type ToastMessageProps = Pick<IToastProps, 'title'>;

export function FailedToast({ title }: ToastMessageProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseToast = () => setIsOpen(false);

  return <Toast title={title} status="error" isOpen={isOpen} onClose={handleCloseToast} />;
}

export function SuccessToast({ title }: ToastMessageProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseToast = () => setIsOpen(false);

  return <Toast title={title} status="success" isOpen={isOpen} onClose={handleCloseToast} />;
}

export function LoadingToast({ title }: ToastMessageProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseToast = () => setIsOpen(false);

  return <Toast title={title} status="loading" isOpen={isOpen} onClose={handleCloseToast} />;
}
