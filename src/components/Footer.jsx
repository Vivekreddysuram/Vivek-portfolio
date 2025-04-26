import React from "react";
import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <a href="https://github.com/vivekreddysuram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/vivekreddysuram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:vivekreddysuram@gmail.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <div className="copyright">
          © {currentYear} Vivek Reddy Suram. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 