import mongoose, { Schema } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  deliveryFee: number;
  serviceFee: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, default: "Card" },
    itemsPrice: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    serviceFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

