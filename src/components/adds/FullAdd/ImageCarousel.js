import React from "react";
import { Carousel } from "react-bootstrap";
const ImageCarousel = ({ add, base64ToUrl }) => {
  return (
    <Carousel className="mb-3">
      {add.images.map((imageObj, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={base64ToUrl(imageObj.imageData)}
            alt={`Slide ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default ImageCarousel;
