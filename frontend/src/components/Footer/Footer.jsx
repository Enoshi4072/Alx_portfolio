import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Company Logo" />
          <p>Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. At consequatur
            officiis vitae atque non, 
            reprehenderit dolores ratione 
            nostrum perferendis beatae sapiente
            facere, dolor culpa esse natus nulla 
            neque incidunt, iure nihil aperiam. Nemo 
            omnis molestiae velit quas ea excepturi 
            laborum quaerat corporis dignissimos tempore, quo voluptates distinctio culpa corrupti aperiam?
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-323-546-7898</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright 2024 @Tomato.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
