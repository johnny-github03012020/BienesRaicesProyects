import React, { useEffect, useState } from 'react';
import '../../styles/AdSpace.css';

const AdSpace = ({ location }) => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        // TODO: Implementar servicio para obtener anuncios
        // const data = await adService.getAdByLocation(location);
        // setAd(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ad:', error);
        setLoading(false);
      }
    };

    fetchAd();
  }, [location]);

  if (loading) return null;
  if (!ad) return null;

  return (
    <div className={`ad-space ad-space-${location}`}>
      <a 
        href={ad.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="ad-link"
      >
        <img 
          src={ad.image} 
          alt={ad.name}
          className="ad-image"
        />
      </a>
    </div>
  );
};

export default AdSpace;