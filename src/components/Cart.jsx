import { Link, useNavigate } from 'react-router-dom';

function Cart({ cart, onClose, updateCart }) {
  const navigate = useNavigate();

  const removeFromCart = (cartItemId) => {
    const updatedCart = cart.filter(item => item.cartItemId !== cartItemId);
    updateCart(updatedCart);
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
              <div key={item.cartItemId} className="cart-item">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.cartItemId)}>Remove</button>
              </div>
            ))}
            <p>Total: ${totalPrice.toFixed(2)}</p>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
        <button onClick={onClose}>Close</button>
        <button className="link-button" onClick={() => {
          onClose();
          navigate('/');
        }}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default Cart;