'use client';

import React, { Fragment, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import PortalRenderer from '@lib/PortalRenderer';
import useModalStore from '@store/useModalStore';

import styles from './Modal.module.css';

const cx = classNames.bind(styles);

/**
 * 모달 상태를 관리 및 렌더링
 */
function ModalRenderer() {
  const { modals, resetModal } = useModalStore();
  const pathname = usePathname();

  useEffect(() => {
    if (modals.length > 0) {
      resetModal();
    }
  }, [pathname]);

  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modals.length]);

  return (
    <PortalRenderer rootId="modal-root">
      {modals.map(({ Component }, idx) => {
        return (
          <Fragment key={idx}>
            <div id="dimmed" className={cx('dimmed')} />
            {Component}
          </Fragment>
        );
      })}
    </PortalRenderer>
  );
}

export default ModalRenderer;
