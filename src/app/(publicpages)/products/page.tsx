// Products.tsx
"use client";

import { useState, useEffect } from 'react';
import styles from './products.module.css';

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
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

  async function addProduct() {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
      setNewProduct({ name: '', price: 0 });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  async function updateProduct() {
    if (!editingProduct) return;

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });
      const data = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === data.id ? data : product))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  async function deleteProduct(id: string) {
    try {
      await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Product List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.productList}>
          {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
              <span>{product.name} - ${product.price}</span>
              <div>
                <button className={styles.button} onClick={() => setEditingProduct(product)}>Edit</button>
                <button className={styles.button} onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          editingProduct ? updateProduct() : addProduct();
        }}
      >
        <input
          type="text"
          className={styles.input}
          placeholder="Product Name"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          className={styles.input}
          placeholder="Price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
              : setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
        />
        <button type="submit" className={styles.button}>
          {editingProduct ? 'Update' : 'Add'}
        </button>
        {editingProduct && (
          <button
            className={styles.button}
            onClick={() => setEditingProduct(null)}
            type="button"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
