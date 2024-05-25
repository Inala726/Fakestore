import './Modal.css'
import { IProduct } from './Ecommerce';


interface modalProps{
  open:boolean;
  onClose:() => void;
  cart:IProduct[];
}

const Modal = ({open, onClose, cart  }: modalProps) => {
  return (
    <div className={`modal-container ${open ? 'open' : ''}`} onClick={onClose}>
         <div className={`modal`} onClick={(e) => e.stopPropagation()}>
            <div className="main-display">
            <div className="mh">
            <p>Cart SHII</p>
            <p onClick={onClose} className='close'>&times;</p>
            </div>
            <div className="products">
        {cart.map((item) => (
          <div className="product-card">
            <img src={item.image} alt="" />
            <p>{item.title}</p>
            <div className="inner">
              <button>{item.category}</button>
              <p>{`$${item.price}`}</p>
            </div>
            <button className="btn">
              Add to cart
            </button>
          </div>
        ))}
      </div>
          <div className="checkout"></div>
            </div>
        </div> 
    </div>
  )
}

export default Modal