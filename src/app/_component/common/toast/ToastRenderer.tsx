'use client';

import React, { Fragment } from 'react';
import PortalRenderer from '@lib/PortalRenderer';
import useToastStore from '@store/useToastStore';

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
