import { FaSearch } from 'react-icons/fa';
import './ecommerce.css';
import { FaCartShopping, FaPerson } from 'react-icons/fa6';
// import picture from '../assets/images/wallpaperflare.com_wallpaper (1).jpg'

// import React from 'react'

const Ecommerce = () => {

  
  return (
    <>
        <nav className="navbar">
            <div className="logo">
                Exclusive
            </div>
            <div className="">
              <div className="search">
                <input type="text" placeholder='Search products...' />
                <FaSearch/>
              </div>
            </div>
            <div className="third">
              <FaCartShopping size={25}/>
              <FaPerson size={20}/>
            </div>
        </nav>
        <div className="section">
          <p>Try out some</p>
          <p>of our splendid <br /> Products</p>
        </div>
        <div className="heading">
          <h1>Available Products</h1>
        </div>
        <div className="">

        </div>
    </>
  )
}

export default Ecommerce