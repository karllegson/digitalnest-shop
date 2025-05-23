import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Cart({ onClose }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <p>Total: ${totalPrice.toFixed(2)}</p>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
        <button onClick={onClose}>Close</button>
        <Link to="/">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default Cart;