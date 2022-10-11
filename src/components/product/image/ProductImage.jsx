import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
      alt=""
      src={image}
      loading="lazy"
      style={{ width: "200px", height: "200px" }}
    />
  );
};

ProductImage.propTypes = {
  src: PropTypes.object.isRequired,
};
export default ProductImage;
