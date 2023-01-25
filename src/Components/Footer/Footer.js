import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <div>
        <footer className='footer'>
            <div className='footer-item'>
                <a href='https://github.com/Saichandra2520/DSA-Checklist' target="_blank"><span>✨</span>This Project!</a>
            </div>
            <div className='footer-item'>
                <Link to='/about'>About<span>🙇</span></Link>
            </div>
        </footer>
    </div>
  )
}

export default Footer
