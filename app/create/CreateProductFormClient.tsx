"use client";

import Link from "next/link";
import { Plus, Upload } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductFormClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "Laptops",
    brand: "Apple",
    condition: "New",
    description: "",
    price: "",
    stock: "",
    sku: "",
    availability: "In Stock",
    warranty: "No Warranty",
    processor: "",
    ram: "",
    storage: "",
    displaySize: "",
    connectivity: "",
    batteryLife: "",
    noiseCancellation: "",
    megapixels: "",
    sensorSize: "",
    videoResolution: "",
    waterResistance: "",
    sensors: "",
    compatibility: "",
    otherSpecs: "",
    features: ["", "", "", ""],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" // default image for demo
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      alert("Name, Price, and Stock are required!");
      return;
    }

    // Transform formatting based on backend schema expectation
    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      description: formData.description,
      image: formData.image,
      features: formData.features.filter(f => f.trim() !== ""),
      about: {
        brand: formData.brand,
        condition: formData.condition,
        warranty: formData.warranty,
        other: formData.otherSpecs,
        ...(formData.processor && { processor: formData.processor }),
        ...(formData.ram && { ram: formData.ram }),
        ...(formData.storage && { storage: formData.storage }),
        ...(formData.displaySize && { display: formData.displaySize }),
        ...(formData.connectivity && { connectivity: formData.connectivity }),
        ...(formData.batteryLife && { batteryLife: formData.batteryLife }),
        ...(formData.noiseCancellation && { noiseCancellation: formData.noiseCancellation }),
        ...(formData.megapixels && { megapixels: formData.megapixels }),
        ...(formData.sensorSize && { sensorSize: formData.sensorSize }),
        ...(formData.videoResolution && { videoResolution: formData.videoResolution }),
        ...(formData.waterResistance && { waterResistance: formData.waterResistance }),
        ...(formData.sensors && { sensors: formData.sensors }),
        ...(formData.compatibility && { compatibility: formData.compatibility }),
      }
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        router.push("/manage-list");
        router.refresh();
      } else {
        alert("Failed to create product");
      }
    } catch(err) {
      console.error(err);
      alert("Error occurred");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Step 1 */}
      <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
        <div className="border-b border-gray-300 bg-gray-50 px-6 py-3"><h2 className="text-xs font-bold tracking-wider text-gray-700 uppercase">Step 1: Product Identity</h2></div>
        <div className="space-y-4 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold">Product Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue">
                <option>Laptops</option><option>Smartphones</option><option>Audio</option>
                <option>Gaming Accessories</option><option>Cameras</option><option>Wearables</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold">Brand</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Condition</label>
              <select name="condition" value={formData.condition} onChange={handleChange} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue">
                <option>New</option><option>Renewed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
          </div>
        </div>
      </div>

      {/* Step 2: Key Features & Technical Details */}
      <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
        <div className="border-b border-gray-300 bg-gray-50 px-6 py-3"><h2 className="text-xs font-bold tracking-wider text-gray-700 uppercase">Step 2: Key Features &amp; Technical Details</h2></div>
        <div className="space-y-4 p-6">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold">Key Features (Bullet Points)</label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-sm">{index + 1}</div>
                  <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder={`e.g., High performance processor for exceptional speeds`} className="flex-1 rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">These will be displayed in the "About this item" section on the product details page. Leave blank to omit.</p>
          </div>

          {(formData.category === "Laptops" || formData.category === "Smartphones") && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-bold">Processor</label>
                <input type="text" name="processor" value={formData.processor} onChange={handleChange} placeholder={formData.category === "Laptops" ? "e.g., Apple M2" : "e.g., Snapdragon 8 Gen 2"} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">RAM</label>
                <input type="text" name="ram" value={formData.ram} onChange={handleChange} placeholder={formData.category === "Laptops" ? "e.g., 16GB" : "e.g., 8GB"} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Storage</label>
                <input type="text" name="storage" value={formData.storage} onChange={handleChange} placeholder={formData.category === "Laptops" ? "e.g., 512GB SSD" : "e.g., 256GB"} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Display</label>
                <input type="text" name="displaySize" value={formData.displaySize} onChange={handleChange} placeholder={formData.category === "Laptops" ? "e.g., 13.6-inch Liquid Retina" : "e.g., 6.7-inch AMOLED"} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
            </div>
          )}

          {formData.category === "Audio" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-bold">Connectivity</label>
                <input type="text" name="connectivity" value={formData.connectivity} onChange={handleChange} placeholder="e.g., Bluetooth 5.3" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Battery Life</label>
                <input type="text" name="batteryLife" value={formData.batteryLife} onChange={handleChange} placeholder="e.g., 30 Hours" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Noise Cancellation</label>
                <input type="text" name="noiseCancellation" value={formData.noiseCancellation} onChange={handleChange} placeholder="e.g., Active Noise Cancellation (ANC)" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
            </div>
          )}

          {formData.category === "Wearables" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-bold">Display Type</label>
                <input type="text" name="displaySize" value={formData.displaySize} onChange={handleChange} placeholder="e.g., 1.4-inch OLED" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Battery Life</label>
                <input type="text" name="batteryLife" value={formData.batteryLife} onChange={handleChange} placeholder="e.g., Up to 14 Days" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Water Resistance</label>
                <input type="text" name="waterResistance" value={formData.waterResistance} onChange={handleChange} placeholder="e.g., 5 ATM" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Sensors</label>
                <input type="text" name="sensors" value={formData.sensors} onChange={handleChange} placeholder="e.g., Heart Rate, SpO2" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
            </div>
          )}

          {formData.category === "Cameras" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-bold">Megapixels</label>
                <input type="text" name="megapixels" value={formData.megapixels} onChange={handleChange} placeholder="e.g., 24.2 MP" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Sensor Size</label>
                <input type="text" name="sensorSize" value={formData.sensorSize} onChange={handleChange} placeholder="e.g., Full Frame" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Video Resolution</label>
                <input type="text" name="videoResolution" value={formData.videoResolution} onChange={handleChange} placeholder="e.g., 4K at 60fps" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
            </div>
          )}

          {formData.category === "Gaming Accessories" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-bold">Compatibility</label>
                <input type="text" name="compatibility" value={formData.compatibility} onChange={handleChange} placeholder="e.g., PC, PS5, Xbox Series X" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">Connectivity</label>
                <input type="text" name="connectivity" value={formData.connectivity} onChange={handleChange} placeholder="e.g., 2.4GHz Wireless, USB-C" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-bold">Other Specifications</label>
            <input type="text" name="otherSpecs" value={formData.otherSpecs} onChange={handleChange} placeholder="e.g., Backlit Keyboard, 1080p FaceTime HD camera" className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
        <div className="border-b border-gray-300 bg-gray-50 px-6 py-3"><h2 className="text-xs font-bold tracking-wider text-gray-700 uppercase">Step 3: Pricing &amp; Inventory</h2></div>
        <div className="space-y-4 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-bold">Price * (৳)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Stock Quantity *</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">SKU (Optional)</label>
              <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
                <label className="mb-1 block text-sm font-bold">Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Warranty</label>
              <select name="warranty" value={formData.warranty} onChange={handleChange} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue">
                <option>No Warranty</option><option>6 Months</option><option>1 Year</option><option>2 Years</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end gap-4 pt-4 sm:flex-row">
        <Link href="/manage-list" className="rounded-md border border-gray-400 px-6 py-2 text-sm font-medium transition-colors hover:bg-gray-50 text-center">Cancel</Link>
        <button type="submit" className="rounded-md border border-amazon-secondary bg-amazon-yellow px-6 py-2 text-sm font-bold shadow-sm transition-colors hover:bg-amazon-yellow_hover">Publish Product</button>
      </div>
    </form>
  );
}
