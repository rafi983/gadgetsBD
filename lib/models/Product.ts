import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  image: string;
  price: number;
  vendor: string;
  category: string;
  stock?: number;
  purchases?: number;
  description?: string;
  about?: {
    brand?: string;
    model?: string;
    releaseYear?: number;
    color?: string;
    storage?: string;
    display?: string;
    battery?: string;
    os?: string;
    [key: string]: any;
  };
  features?: string[];
  rating?: number;
  reviewsCount?: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  vendor: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  purchases: { type: Number, default: 0 },
  description: { type: String },
  about: { type: Schema.Types.Mixed },
  features: { type: [String], default: [] },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, {
  timestamps: true,
});

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
