'use client';

import React, { Fragment } from 'react';
import useToastStore from '@store/useToastStore';

import PortalRenderer from '../portal/PortalRenderer';

function ToastRenderer() {
  const { toasts } = useToastStore();

  return (
    <PortalRenderer rootId="toast-root">
      {toasts.map(({ Component }, idx) => (
        <Fragment key={idx}>{Component}</Fragment>
      ))}
    </PortalRenderer>
  );
}

export default ToastRenderer;
