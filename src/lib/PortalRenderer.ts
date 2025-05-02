'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalRendererProps {
  children: ReactNode;
  rootId: 'modal-root' | 'toast-root';
}

export default function PortalRenderer({ children, rootId }: PortalRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const container = document.getElementById(rootId);
  return container ? createPortal(children, container) : null;
}
