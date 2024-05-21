import { FaSearch } from "react-icons/fa";
import "./ecommerce.css";
import { FaCartShopping, FaPerson } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
// import picture from '../assets/images/wallpaperflare.com_wallpaper (1).jpg'

// import React from 'react'

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Ecommerce = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<IProduct[]>(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product :", error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo">Fakestore</div>
        <div className="">
          <div className="search">
            <input type="text" placeholder="Search products..." />
            <FaSearch />
          </div>
        </div>
        <div className="third">
          <FaCartShopping size={25} />
          <FaPerson size={20} />
        </div>
      </nav>
      <div className="section">
        <p>Try out some</p>
        <p>
          of our splendid <br /> Products
        </p>
      </div>
      <div className="heading">
        <h1>Available Products</h1>
      </div>
      <div className="products">
        <div className="product-card">
          {products.map((product) => (
            <>
              <img src={product.image} alt="" />
              <p>{product.title}</p>
              <div className="inner">
                <button>{product.category}</button>
                <p>{`$${product.price}`}</p>
              </div>
              <button>Add to cart</button>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Ecommerce;
