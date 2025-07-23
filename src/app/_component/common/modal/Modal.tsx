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

interface IHeaderText {
  main: string;
  sub?: string;
}

interface ModalHeaderProps {
  contents: IHeaderText | React.ReactNode;
}

function Header({ contents }: ModalHeaderProps) {
  const isTextObject = (value: ModalHeaderProps['contents']): value is IHeaderText =>
    typeof value === 'object' && value !== null && 'main' in value;

  return (
    <div className={cx('modal-header')}>
      {isTextObject(contents) ? (
        <div className={cx('text-wrapper')}>
          <span className={cx('main-text')}>{contents.main}</span>
          {contents.sub && <span className={cx('sub-text')}>{contents.sub}</span>}
        </div>
      ) : (
        contents
      )}
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
}

function Footer({ onClose, onSubmit, submitText, isLoading, isDisabled, isHideCancelButton }: ModalFooterProps) {
  const { onCloseModal } = useModalStore();

  const handleCancel = () => {
    if (onClose) onClose();
    onCloseModal();
  };

  const handleSubmit = () => {
    onSubmit();
    onCloseModal();
  };

  return (
    <div className={cx('modal-footer')}>
      {!isHideCancelButton && (
        <Button size="h-38" variant="transparent" onClick={handleCancel}>
          Text
        </Button>
      )}
      <Button size="h-38" variant="secondary" loading={isLoading} disabled={isDisabled} onClick={handleSubmit}>
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
