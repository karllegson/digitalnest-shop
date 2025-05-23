import { useEffect, useState } from 'react';
import { fetchProducts } from './utils/api';
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
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    loadProducts();
  }, []);

  return (
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
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div id="products-container">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.id}>{product.name}</div>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;