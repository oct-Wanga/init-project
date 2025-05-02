'use client';

import { useEffect } from 'react';

import spriteContent from '@/assets/dev-sprite.svg?raw';

const isDev = process.env.NODE_ENV === 'development';

export default function SpriteRenderer() {
  useEffect(() => {
    const div = document.createElement('div');
    div.style.display = 'none';

    if (isDev) {
      div.innerHTML = spriteContent;
    } else {
      fetch('/sprite.svg')
        .then(res => res.text())
        .then(text => {
          div.innerHTML = text;
        })
        .catch(err => {
          console.error('Failed to load sprite:', err);
        });
    }

    document.body.insertBefore(div, document.body.firstChild);
  }, []);

  return null;
}
