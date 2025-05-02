'use client';

import React from 'react';
import classNames from 'classnames/bind';
import Button from '@_component/common/button/Button';
import useModalStore from '@store/useModalStore';

import styles from './Modal.module.css';

const cx = classNames.bind(styles);

interface ModalWrapperProps {
  children: React.ReactNode;
}
function ModalWrapper({ children }: ModalWrapperProps) {
  return <div className={cx('modal-wrapper')}>{children}</div>;
}

interface ModalTitleProps {
  title: string;
  warning?: boolean;
  titleLine?: boolean;
}
function Header({ title, warning, titleLine }: ModalTitleProps) {
  return (
    <div
      className={cx('modal-header', {
        'title-line': titleLine,
      })}
    >
      {warning && <Icon.Warning size="w-40" />}
      <span>{title}</span>
    </div>
  );
}

interface ModalFooterProps {
  submitText: string;
  onSubmit: () => void;
  onClose?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  isHideCancelButton?: boolean;
  paddingBotton?: 'pb-20' | 'pb-24';
  shouldAutoClose?: boolean;
}
function Footer({
  onClose,
  onSubmit,
  submitText,
  isLoading,
  isDisabled,
  isHideCancelButton,
  paddingBotton = 'pb-20',
  shouldAutoClose = true,
}: ModalFooterProps) {
  const { onCloseModal } = useModalStore();

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
    onCloseModal();
  };

  const handleSubmit = () => {
    onSubmit();
    if (shouldAutoClose) {
      onCloseModal();
    }
  };

  return (
    <div className={cx('modal-footer', paddingBotton)}>
      {!isHideCancelButton && (
        <Button size="modal" variant="transparent" onClick={handleCancel}>
          취소
        </Button>
      )}
      <Button size="modal" variant="secondary" loading={isLoading} disabled={isDisabled} onClick={handleSubmit}>
        {submitText}
      </Button>
    </div>
  );
}

const Modal = Object.assign(ModalWrapper, {
  Header,
  Footer,
});

export default Modal;
