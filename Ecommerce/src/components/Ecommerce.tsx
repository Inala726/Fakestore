import { FaSearch } from 'react-icons/fa';
import './ecommerce.css';
import { FaCartShopping, FaPerson } from 'react-icons/fa6';

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
                <input type="text" />
                <FaSearch/>
              </div>
            </div>
            <div className="">
              <FaCartShopping/>
              <FaPerson/>
            </div>
        </nav>
    </>
  )
}

export default Ecommerce