import { Link, useNavigate } from 'react-router-dom';

function Cart({ cart, onClose, updateCart }) {
  const navigate = useNavigate();

  // Group the same products together and count how many of each we have
  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      // Already have this product, just increase the count
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // First time seeing this product, add it with quantity = 1
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    updateCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    // Find where this product first appears in the cart
    const firstItemIndex = cart.findIndex(item => item.id === productId);
    if (firstItemIndex === -1) return;
    
    // Make a copy of the cart so we don't mess up the original
    const updatedCart = [...cart];
    
    // See how many of this product we already have
    const currentItems = cart.filter(item => item.id === productId);
    const currentQty = currentItems.length;
    
    // Adding more of this product
    if (newQuantity > currentQty) {
      // Create the new items we need to add
      const additionalItems = Array(newQuantity - currentQty).fill().map(() => ({
        ...currentItems[0],
        cartItemId: Date.now() + Math.random() // Need unique IDs for each item
      }));
      
      // Take out the existing ones first
      const cartWithoutProduct = updatedCart.filter(item => item.id !== productId);
      
      // Put everything back in the same spot so items don't jump around
      cartWithoutProduct.splice(firstItemIndex, 0, ...currentItems, ...additionalItems);
      updateCart(cartWithoutProduct);
      localStorage.setItem('cart', JSON.stringify(cartWithoutProduct));
    } 
    // Removing some of this product
    else if (newQuantity < currentQty) {
      // Just keep the ones we need
      const itemsToKeep = currentItems.slice(0, newQuantity);
      
      // Take out all of this product
      const cartWithoutProduct = updatedCart.filter(item => item.id !== productId);
      
      // Put the ones we're keeping back in the same spot
      cartWithoutProduct.splice(firstItemIndex, 0, ...itemsToKeep);
      updateCart(cartWithoutProduct);
      localStorage.setItem('cart', JSON.stringify(cartWithoutProduct));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={`cart-sidebar ${cart.length === 0 ? 'hidden' : ''}`}>
      <div className="cart-content">
        <div className="cart-title">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose}>&times;</button>
        </div>
        
        {groupedItems.length > 0 ? (
          <>
            <div className="cart-items">
              {groupedItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div>
                      <div>{item.name}</div>
                      <div>${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="quantity-btn"
                      >-</button>
                      <span className="quantity-display">{item.quantity || 1}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="quantity-btn"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="remove-btn"
                    >Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
        
        <div className="cart-actions">
          <button className="link-button" onClick={() => {
            onClose();
            navigate('/');
          }}>Continue Shopping</button>
          <button onClick={() => alert('Checkout not implemented yet')}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;