import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className='footer bg-custom-orange text-black py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col  md:flex-row justify-between items-center'>
          <div className='text-center md:text-left'>
            <a 
              href='https://github.com/Saichandra2520/DSA-Checklist' 
              target="_blank" 
              rel="noopener noreferrer" 
              className='hover:underline text-sm'
            >
              ✨ Support | Contact Us
            </a>
          </div>
          <div className='mt-4 md:mt-0 text-center'>
            <p className='text-sm'>
              &copy; {new Date().getFullYear()} Saichandra Vallakatla. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;