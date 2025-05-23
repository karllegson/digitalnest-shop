import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchProducts } from './utils/api';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <header>
              <h1>DigitalNest Shop</h1>
            </header>
            <main>
              <section id="product-section">
                <h2>Our Products</h2>
                <div>
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
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <p>Loading products...</p>
                  )}
                </div>
              </section>
            </main>
          </div>
        }
      />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;