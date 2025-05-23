import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '../utils/api';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      }
    }
    loadProduct();
  }, [id]);

  // Using addToCart from props now

  return (
    <div>
      <main>
        <section id="product-detail">
          <h2>Product Details</h2>
          {product ? (
            <div className="product-detail-container">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price.toFixed(2)}</p>
                <button onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  description: product.description,
                  category: product.category
                })}>Add to Cart</button>
                <Link to="/">Back to Products</Link>
              </div>
            </div>
          ) : (
            <p>Product not found</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default ProductDetail;