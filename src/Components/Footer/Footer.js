import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <div>
        <footer className='footer bg-custom-orange text-black'>
            <div className='footer-item'>
                <a href='https://github.com/Saichandra2520/DSA-Checklist' target="_blank"><span>✨</span>Support | Terms of Service | Privacy Policy | Contact Us |</a>
            </div>
            
        </footer>
    </div>
  )
}

export default Footer
