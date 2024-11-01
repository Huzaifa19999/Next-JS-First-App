"use client";

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Product List</h1>
      <ul className=''>
        {products.map((product) => (
          <li key={product.id}>
            <tr>
            {product.name} - ${product.price}
            </tr>
          </li>
        ))}
      </ul>
    </div>
  );
}
