import { FaSearch } from "react-icons/fa";
import "./ecommerce.css";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import swal from "sweetalert";
// import React from 'react'

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Ecommerce = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

  const addToCart = (id: number) => {
    const product = products.find((item) => item.id === id);
    if (product) {
      setCart((prevCart) => {
        if (prevCart.find((item) => item.id === id)) {
          alert("Product is already in the cart");
          return prevCart;
        }
        swal({
          title: "Product added successfully",
          icon: "success",
        });
        return [...prevCart, product];
      });
    } else {
      alert("Error while adding to cart");
    }
  };

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
          <FaCartShopping
            size={25}
            cursor={"pointer"}
            onClick={() => setModalOpen(true)}
          />
          <div className="dot">{cart.length}</div>
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
        {products.map((product) => (
          <div className="product-card">
            <img src={product.image} alt="" />
            <p>{product.title}</p>
            <div className="inner">
              <button>{product.category}</button>
              <p>{`$${product.price}`}</p>
            </div>
            <button className="btn" onClick={() => addToCart(product.id)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <Modal
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        cart={cart}
      ></Modal>
    </>
  );
};

export default Ecommerce;
