import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className, width, height }) => {
  const [imageSrc, setImageSrc] = useState('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src]);

  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      className={`${className} ${!imageLoaded ? 'lazy-image-loading' : 'lazy-image-loaded'}`}
      width={width}
      height={height}
      loading="lazy"
    />
  );
};

export default LazyImage;