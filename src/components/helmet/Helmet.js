import React from "react";

const Helmet = (props) => {
  document.title = "Watches Shop - " + props.title;
  return <>{props.children}</>;
};

export default Helmet;
