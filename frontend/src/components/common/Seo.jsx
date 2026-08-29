import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteUrl } from '../../utils/format';

export default function Seo({
  title,
  description,
  image,
  type = 'website',
  jsonLd,
}) {
  const location = useLocation();
  const canonical = `${siteUrl()}${location.pathname}`;
  const fullTitle = title?.includes('NOVIQ') ? title : `${title} | NOVIQ Studio & Solutions`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
}
