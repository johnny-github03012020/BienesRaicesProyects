import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const PropertySlider = ({ properties }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  // Custom arrow components
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  return (
    <div className="property-slider-container">
      <Slider {...settings} prevArrow={<PrevArrow />} nextArrow={<NextArrow />}>
        {properties.map((property, index) => (
          <div key={index} className="slider-item">
            <div className="slider-image-container">
              <img 
                src={property.image} 
                alt={property.title} 
                className="slider-image"
              />
              <div className="slider-overlay">
                <div className="slider-content">
                  <h1 className="display-4 fw-bold">{property.title}</h1>
                  <p className="lead">{property.description}</p>
                  {property.link && (
                    <Link to={property.link} className="btn btn-primary btn-lg">
                      Ver detalles &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PropertySlider;