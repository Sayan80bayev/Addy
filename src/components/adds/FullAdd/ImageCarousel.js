import React from "react";
import { Carousel } from "react-bootstrap";
const ImageCarousel = ({ add, base64ToUrl }) => {
  console.log(add.imagesUrl);
  
  return (
    <Carousel className="mb-3">
      {add.imagesUrl.map((imageObj, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={imageObj}
            alt={`Slide ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default ImageCarousel;
