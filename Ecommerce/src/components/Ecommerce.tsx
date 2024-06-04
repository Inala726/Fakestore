import { FaSearch } from "react-icons/fa";
import "./ecommerce.css";
import { FaCartShopping, FaSquarespace } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./Cart";
import swal from "sweetalert";
import React from "react";

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
  const [search, setSearch] = useState("");

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
          swal({
            title: "Product already exists in the cart",
            icon: "warning",
          });
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

  const removeFromCart = (id: number) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        swal("Poof! Your product has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your product is safe!");
      }
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const filteredItems = products.filter(
    (value) =>
      value.title.toLowerCase().includes(search.toLowerCase()) ||
      value.category.toLowerCase().includes(search.toLowerCase()) ||
      value.price.toString().includes(search)
  );
  {
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <FaSquarespace />
          Fakestore
        </div>
        <div className="">
          <div className="search">
            <FaSearch />
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search by name,category..."
            />
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
        <div className="text">
          <h1>Try out some of</h1>
          <h1>our quality products</h1>
        </div>
      </div>
      <div className="heading">
        <h1>Available Products</h1>
        <div className="search">
            <FaSearch />
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search by name,category..."
            />
          </div>
      </div>

      <div className="products">
        {filteredItems.map((product) => (
          <div className="product-card">
              <img src={product.image} alt="" />
           <p>{product.title}</p>
            <div className="inner">
              <div>{product.category}</div>
              <p>{`$${product.price}`}</p>
            </div>
            <div className="button">
              <button className="btn" onClick={() => addToCart(product.id)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <Cart
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        cart={cart}
        removeFromCart={removeFromCart}
      ></Cart>
    </>
  );
};

export default Ecommerce;
