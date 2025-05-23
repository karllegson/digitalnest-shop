import { Link, useNavigate } from 'react-router-dom';

function Cart({ cart, onClose, updateCart }) {
  const navigate = useNavigate();

  // Group cart items by product ID and calculate quantities
  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
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
    
    // Find the index of the first occurrence of this product
    const firstItemIndex = cart.findIndex(item => item.id === productId);
    if (firstItemIndex === -1) return;
    
    // Create a copy of the cart
    const updatedCart = [...cart];
    
    // Count current quantity of this product
    const currentItems = cart.filter(item => item.id === productId);
    const currentQty = currentItems.length;
    
    // If increasing quantity
    if (newQuantity > currentQty) {
      // Add the new items at the same position as the first item
      const additionalItems = Array(newQuantity - currentQty).fill().map(() => ({
        ...currentItems[0],
        cartItemId: Date.now() + Math.random() // Ensure unique IDs
      }));
      
      // Remove existing items of this product
      const cartWithoutProduct = updatedCart.filter(item => item.id !== productId);
      
      // Insert all items at the original position
      cartWithoutProduct.splice(firstItemIndex, 0, ...currentItems, ...additionalItems);
      updateCart(cartWithoutProduct);
      localStorage.setItem('cart', JSON.stringify(cartWithoutProduct));
    } 
    // If decreasing quantity
    else if (newQuantity < currentQty) {
      // Keep only the needed number of items
      const itemsToKeep = currentItems.slice(0, newQuantity);
      
      // Remove all instances of this product
      const cartWithoutProduct = updatedCart.filter(item => item.id !== productId);
      
      // Insert the items to keep at the original position
      cartWithoutProduct.splice(firstItemIndex, 0, ...itemsToKeep);
      updateCart(cartWithoutProduct);
      localStorage.setItem('cart', JSON.stringify(cartWithoutProduct));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <h2>Your Cart</h2>
        {groupedItems.length > 0 ? (
          <>
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
            <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
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