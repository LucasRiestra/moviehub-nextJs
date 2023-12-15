'use client'

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../Footer/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#red-social-1"><FaFacebook /></a>
        <a href="#red-social-2"><FaTwitter /></a>
        <a href="#red-social-3"><FaInstagram /></a>
      </div>
      <div className="footer-links">
        <div className="footer-section">
          <a href="#conditions-of-use">Conditions of Use</a>
        </div>
        <div className="footer-section">
          <a href="#privacy-policy">Privacy & Policy</a>
        </div>
        <div className="footer-section">
          <a href="#press-room">Press Room</a>
        </div>
      </div>
      <div className="copyright">
        © 2023 CineXpress by Lucas Riestra
      </div>
    </footer>
  );
};

export default Footer;