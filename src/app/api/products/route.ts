// app/api/products/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../app/lib/mongodb';
import Product from '../../models/Product';

export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  await dbConnect();
  const newProductData = await request.json();
  const newProduct = await Product.create(newProductData);
  return NextResponse.json(newProduct);
}

export async function PUT(request: Request) {
  await dbConnect();
  const { id, ...updateData } = await request.json();
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedProduct) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: Request) {
  await dbConnect();
  const { id } = await request.json();
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(deletedProduct);
}
