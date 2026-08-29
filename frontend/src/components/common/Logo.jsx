import { useState } from 'react';
import darkLogo from '../../assets/logos/noviq-logo.svg';
import lightLogo from '../../assets/logos/light-noviq-logo.svg';

const SOURCES = {
  dark: darkLogo,
  light: lightLogo,
};

const DEFAULT_ALT = 'NOVIQ Studio & Solutions';

export default function Logo({
  variant = 'dark',
  className = 'block h-auto w-full max-w-[240px] object-contain',
  alt = DEFAULT_ALT,
}) {
  const [failed, setFailed] = useState(false);
  const src = SOURCES[variant] ?? SOURCES.dark;

  if (failed) {
    return (
      <span className={`font-display text-sm leading-snug tracking-tight ${variant === 'light' ? 'text-cream-100' : 'text-ink'}`}>
        {alt}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
