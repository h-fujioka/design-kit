'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark((v) => !v)}
      className="hover:bg-accent inline-flex h-9 items-center rounded-full border px-3 text-sm transition-colors"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="ml-2">Theme</span>
    </button>
  );
}
