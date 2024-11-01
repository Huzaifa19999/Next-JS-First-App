import { NextResponse } from 'next/server';

// Mock database
let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
  { id: 4, name: 'Product 3', price: 400 },
  { id: 5, name: 'Product 3', price: 500 },
  { id: 6, name: 'Product 3', price: 600 },
  { id: 7, name: 'Product 3', price: 700 },
];

// GET: Retrieve all products
export async function GET() {
  return NextResponse.json(products);
}

// POST: Add a new product
export async function POST(request: Request) {
  const newProduct = await request.json();
  newProduct.id = products.length + 1;
  products.push(newProduct);
  return NextResponse.json(newProduct);
}

// PUT: Update a product by ID
export async function PUT(request: Request) {
  const { id, ...updatedProduct } = await request.json();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  products[index] = { ...products[index], ...updatedProduct };
  return NextResponse.json(products[index]);
}

// DELETE: Remove a product by ID
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  const deletedProduct = products.splice(index, 1);
  return NextResponse.json(deletedProduct[0]);
}
