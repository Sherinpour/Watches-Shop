import React from "react";
import "../../styles/common-section.css";

const CommonSection = ({ title }) => {
  return (
    <section className="common-section">
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
};

export default CommonSection;
