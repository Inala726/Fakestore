import "./Cart.css";
import { IProduct } from "./Index";
import { useEffect, useState,  } from "react";
import swal from "sweetalert";
// import React from "react";


interface modalProps {
  open: boolean;
  onClose: () => void;
  cart: IProduct[];
  removeFromCart: (id: number) => void;
}

const Cart = ({ open, onClose, cart, removeFromCart }: modalProps) => {
  const [checkout, setCheckout] = useState(0);

  useEffect(() => {
    const totalMerchandise = cart.reduce(
      (total, item) => total + item.price,
      0
    );
    setCheckout(totalMerchandise);
  }, [cart]);

  const proceedCheckout = () => {
    swal("Thanks for shopping", "Your order is on it's way", "success");
  };


  return (
    <div className={`modal-container ${open ? "open" : ""}`} onClick={onClose}>
      <div className={`modal`} onClick={(e) => e.stopPropagation()}>
        <div className="mh">
          <p>
          Cart SHII</p>
          <p className="close" onClick={onClose}>
            &times;
          </p>
        </div>
        <div className="main-content">
          <div className="cart">
            {cart.map((item) => (
              <div className="cart-card">
                <img src={item.image} alt="" />
                <div className="in">
                  <button>{item.category}</button>
                  <p>{`$${item.price}`}</p>
                </div>
                <button className="btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="checkout">
            <div className="div">
              <p>Merchandise:</p>
              <p>{`$${checkout.toFixed(2)}`}</p>
            </div>
            <div className="div">
              <p>Estimated shipping cost:</p>
              <p>$0.00</p>
            </div>
            <div className="div">
              <p className="p">ORDER TOTAL:</p>
              <p>{`$${checkout.toFixed(2)}`}</p>
            </div>
            <button disabled={cart.length <= 0} onClick={() => proceedCheckout()}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
