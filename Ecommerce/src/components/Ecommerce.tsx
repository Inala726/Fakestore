import { FaSearch } from "react-icons/fa";
import "./ecommerce.css";
import { FaCartShopping, FaPerson } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
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
  const [cart, setCart] = useState<IProduct[]>([])

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

  const addToCart = (id:number) =>{
      const product = products.find((item)=>item.id == id)
      if(product){
      setCart((prevCart) => [...prevCart, product])
      alert('Product added successfully')
      }
      if(!product){
          alert('Error while addind to cart')
        }
  }
  console.log(cart);
  

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
        <h1>Available Products {cart.length}</h1>
      </div>
      <div className="products">
        {products.map((product) => (
          <div className="product-card">
            <img src={product.image} alt="" />
            <p>{product.title}</p>
            <div className="inner">
              <button>{product.category}</button>
              <p>{`$${product.price}`}</p>
            </div>
            <button className="btn" onClick={() => addToCart(product.id)}>Add to cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ecommerce;
