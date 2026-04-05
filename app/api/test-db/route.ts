import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';

export async function GET() {
  await dbConnect();
  const categories = await Product.distinct('category');
  return NextResponse.json({ categories });
}

