import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage, 
  ogType = 'website',
  structuredData = null
}) => {
  // URL base del sitio
  const siteUrl = window.location.origin;
  
  // URL canónica completa
  const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : window.location.href;
  
  // URL de la imagen para Open Graph
  const ogImageUrl = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/logo.png`;

  return (
    <Helmet>
      {/* Metadatos básicos */}
      <title>{title ? `${title} | Bienes Raíces` : 'Bienes Raíces - Encuentra tu hogar ideal'}</title>
      <meta name="description" content={description || 'Encuentra las mejores propiedades en venta y alquiler. Casas, apartamentos, oficinas y más.'} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* URL canónica */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title ? `${title} | Bienes Raíces` : 'Bienes Raíces - Encuentra tu hogar ideal'} />
      <meta property="og:description" content={description || 'Encuentra las mejores propiedades en venta y alquiler. Casas, apartamentos, oficinas y más.'} />
      <meta property="og:image" content={ogImageUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title ? `${title} | Bienes Raíces` : 'Bienes Raíces - Encuentra tu hogar ideal'} />
      <meta name="twitter:description" content={description || 'Encuentra las mejores propiedades en venta y alquiler. Casas, apartamentos, oficinas y más.'} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Datos estructurados JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;