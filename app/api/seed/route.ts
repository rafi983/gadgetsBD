import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';
import { products } from '@/lib/mock-data';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear out existing products to prevent duplicates
    await Product.deleteMany({});
    
    // Add stock information by mapping from the existing products and matching mock data if possible
    // Here we'll just insert the products from mock-data
    const seedData = products.map((p) => ({
      name: p.name,
      image: p.image,
      price: p.price,
      vendor: p.vendor,
      category: p.category,
      stock: 50 // arbitrary default stock
    }));
    
    await Product.insertMany(seedData);
    
    return NextResponse.json({ message: 'Database seeded successfully', count: seedData.length });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}

