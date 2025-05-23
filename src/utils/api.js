export async function fetchProducts() {
    const response = await fetch('https://cart-api.alexrodriguez.workers.dev/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }
  
  export async function fetchProduct(id) {
    const response = await fetch(`https://cart-api.alexrodriguez.workers.dev/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  }