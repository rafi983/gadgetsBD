import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  type: 'Customer' | 'ShopOwner';
  image?: string;
  googleId?: string;
  shopDetails?: {
    shopName?: string;
    description?: string;
    address?: string;
  };
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  type: { type: String, enum: ['Customer', 'ShopOwner'], default: 'Customer' },
  image: { type: String },
  googleId: { type: String },
  shopDetails: {
    shopName: { type: String },
    description: { type: String },
    address: { type: String }
  }
}, {
  timestamps: true,
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

