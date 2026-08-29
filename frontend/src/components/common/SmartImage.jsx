import { useState } from 'react';

const PLACEHOLDER =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000"><rect fill="#EDE4D6" width="1600" height="1000"/><text x="50%" y="50%" fill="#8A847A" font-family="Georgia, serif" font-size="42" text-anchor="middle">NOVIQ</text></svg>`,
  );

export default function SmartImage({ src, alt, className, ...props }) {
  const [failed, setFailed] = useState(!src);

  return (
    <img
      src={failed ? PLACEHOLDER : src}
      alt={alt || 'NOVIQ project image'}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
