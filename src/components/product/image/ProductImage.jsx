import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ProductImage.css";

const ProductImage = ({ src }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const blob = new Blob([src], { type: "text/plain" });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64String = reader.result;
      setImage(base64String.substr(base64String.indexOf(", ") + 1));
    };
  }, []);

  return (
    <img
      id="product-image"
      alt=""
      src={image}
      loading="lazy"
    />
  );
};

ProductImage.propTypes = {
  src: PropTypes.object.isRequired,
};
export default ProductImage;
