'use client';

import { useEffect } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return null;
}
