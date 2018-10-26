// Import React
import React from "react";
import PropTypes from "prop-types";

import asSlide from "./as-slide.jsx";
import FullScreen from "./full-screen.jsx";

const BlankSlide = ({ children }) => {
  return <FullScreen column>{children}</FullScreen>;
};

BlankSlide.propTypes = {
  inverted: PropTypes.bool
};

BlankSlide.defaultProps = {
  inverted: false
};

export default asSlide(BlankSlide);
