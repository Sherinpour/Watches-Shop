import React from "react";
import "./common-section.css";

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
