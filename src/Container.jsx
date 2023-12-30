import { useState, useEffect } from "react";
import "./Container.css";
import { FaHeart } from "react-icons/fa";

function Container(props) {
  const [colour, setColour] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [prod_year, SetProdYear] = useState(0);
  const [price, setPrice] = useState(0);
  const [customsPassed, setCustomsPassed] = useState("");
  const [customsPassedStyles, setCustomsPassedStyles] = useState({});

  useEffect(() => {
    SetProdYear(props.prod_year);
    setPrice(props.price);
    getColorSet(props.color_id);
    setImageSrc(
      `https://static.my.ge/myauto/photos/${props.photo}/thumbs/${props.car_id}_1.jpg?v=0`
    );
    if (props.customs_passed === true) {
      setCustomsPassed("განბაჟებულია");
      setCustomsPassedStyles({ color: "green" });
    } else {
      setCustomsPassed("განუბაჟებელია");
      setCustomsPassedStyles({ color: "red" });
    }
  }, [props.color_id, props.photo, props.car_id, props.prod_year, props.price]);

  const getColorSet = (number) => {
    if (number === 16) {
      setColour("black");
    } else if (number === 14) {
      setColour("blue");
    } else if (number === 13) {
      setColour("gray");
    } else if (number === 12) {
      setColour("silver");
    } else if (number === 1) {
      setColour("white");
    } else if (number === 8) {
      setColour("red");
    } else if (number === 5) {
      setColour("green");
    } else if (number === 6) {
      setColour("gold");
    }
  };

  const handleImageError = () => {
    setImageSrc("https://www.carhuddle.com/images/default/car-default.jpg");
  };

  return (
    <div className="carContainer">
      <img className="carImage" src={imageSrc} onError={handleImageError} />
      <p className="customsPassed" style={customsPassedStyles}>
        {customsPassed}
      </p>
      <p className="carColour">Colour: {colour}</p>
      <p className="carProdYear">Prod_year: {prod_year} </p>
      <p className="carPrice">Price: {price}$</p>
    </div>
  );
}

export default Container;
