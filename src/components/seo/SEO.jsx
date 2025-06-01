import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonicalUrl, structuredData }) => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title ? `${title} | Bienes Raíces` : 'Bienes Raíces'}</title>
      <meta name="description" content={description || 'Encuentra tu propiedad ideal con Bienes Raíces'} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={`${window.location.origin}${canonicalUrl}`} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} | Bienes Raíces` : 'Bienes Raíces'} />
      <meta property="og:description" content={description || 'Encuentra tu propiedad ideal con Bienes Raíces'} />
      <meta property="og:url" content={canonicalUrl ? `${window.location.origin}${canonicalUrl}` : window.location.href} />
      <meta property="og:site_name" content="Bienes Raíces" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | Bienes Raíces` : 'Bienes Raíces'} />
      <meta name="twitter:description" content={description || 'Encuentra tu propiedad ideal con Bienes Raíces'} />
      
      {/* Structured data for SEO */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;