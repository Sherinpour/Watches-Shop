import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Developed by{" "}
            <a href="https://github.com/Sherinpour">ZAHRA SHERINPOUR</a>
          </span>
        </strong>
      </div>
      <div class="footer-col-2">
        <i class="bi bi-watch text-5xl"></i>
        <h5>©&nbsp;2022</h5>
      </div>
      <div class="footer-col-3">
        <strong>
          <span>
            Fork this project &nbsp;
            <a href="https://github.com/Sherinpour/Watches-Shop">HERE</a>
          </span>
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
