import React from "react";
import AliceCarousel, { Link } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import carousel1 from "../../../assets/car1.jpg";
import carousel2 from "../../../assets/car2.jpg";
import carousel3 from "../../../assets/car3.jpg";
import carousel4 from "../../../assets/car4.jpg";
function Carousel() {
  return (
    <AliceCarousel mouseTracking autoPlay animationDuration={2000}>
      <Link href="#">
        <img src={carousel1} />
      </Link>
      <img src={carousel2} />
      <img src={carousel3} />
      <img src={carousel4} />
    </AliceCarousel>
  );
}

export default Carousel;
