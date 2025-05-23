import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { fetchProducts } from './utils/api';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(['all', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    loadProducts();

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartItemId: Date.now() // Add a unique ID for each cart item
    };
    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>DigitalNEST Shop</h1>
          <nav>
            <Link to="/">Home</Link>
            <button onClick={() => setShowCart(!showCart)}>Cart ({cart.length})</button>
          </nav>
        </div>
      </header>
      <Cart cart={cart} updateCart={setCart} onClose={() => setShowCart(false)} isVisible={showCart} />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section id="product-section">
                <div className="product-header">
                  <h2>Our Products</h2>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div id="products-container">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))
                  ) : (
                    <p>Loading products...</p>
                  )}
                </div>
              </section>
            </main>
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;