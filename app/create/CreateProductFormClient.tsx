"use client";

import { Loader2, WandSparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

export default function CreateProductFormClient() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMessage, setGenerationMessage] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationMessage, setClassificationMessage] = useState("");
  const [generationTone, setGenerationTone] = useState<"professional" | "friendly" | "premium">("professional");
  const [formData, setFormData] = useState({
    name: "",
    category: "Laptops",
    brand: "Apple",
    condition: "New",
    description: "",
    marketPriceHint: "",
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
    aiTags: [] as string[],
    features: ["", "", "", ""],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" // default image for demo
  });

  type ProductDraft = Partial<typeof formData> & {
    features?: string[];
    price?: number | string;
    stock?: number | string;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleClassifyWithAI = async () => {
    if (!formData.name && !formData.description) {
      alert("Please enter product name or description first.");
      return;
    }

    setIsClassifying(true);
    setClassificationMessage("");

    const keySpecs = [
      formData.processor,
      formData.ram,
      formData.storage,
      formData.displaySize,
      formData.connectivity,
      formData.batteryLife,
      formData.noiseCancellation,
      formData.megapixels,
      formData.sensorSize,
      formData.videoResolution,
      formData.waterResistance,
      formData.sensors,
      formData.compatibility,
      formData.otherSpecs,
    ].filter((item) => item && item.trim().length > 0);

    try {
      const res = await fetch("/api/ai/classify-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          brand: formData.brand,
          category: formData.category,
          description: formData.description,
          keySpecs,
        }),
      });

      if (!res.ok) {
        setClassificationMessage("Classification failed. Please try again.");
        return;
      }

      const classified = await res.json();

      setFormData((prev) => ({
        ...prev,
        category: classified.category || prev.category,
        aiTags: Array.isArray(classified.tags) ? classified.tags.slice(0, 6) : prev.aiTags,
      }));

      setClassificationMessage(
        classified.source === "llm"
          ? `Category suggested: ${classified.category} (AI)`
          : `Category suggested: ${classified.category} (fallback)`
      );
    } catch {
      setClassificationMessage("Classification failed. Please try again.");
    } finally {
      setIsClassifying(false);
    }
  };

  const handleGenerateWithAI = async () => {
    if (!formData.name || !formData.category) {
      alert("Please enter product name and category first.");
      return;
    }

    setIsGenerating(true);
    setGenerationMessage("");

    const keySpecs = [
      formData.processor,
      formData.ram,
      formData.storage,
      formData.displaySize,
      formData.connectivity,
      formData.batteryLife,
      formData.noiseCancellation,
      formData.megapixels,
      formData.sensorSize,
      formData.videoResolution,
      formData.waterResistance,
      formData.sensors,
      formData.compatibility,
      formData.otherSpecs,
    ].filter((item) => item && item.trim().length > 0);

    try {
      const res = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          brand: formData.brand,
          keySpecs,
          price: formData.price ? Number(formData.price) : undefined,
          priceHint: formData.marketPriceHint ? Number(formData.marketPriceHint) : undefined,
          tone: generationTone,
        }),
      });

      if (!res.ok) {
        setGenerationMessage("AI generation failed. Please try again.");
        return;
      }

      const generated = await res.json();
      const draft: ProductDraft = generated.draft || {};
      const featureSource = Array.isArray(draft.features)
        ? draft.features
        : Array.isArray(generated.features)
          ? generated.features
          : [];

      const featureList = featureSource.slice(0, 4);

      setFormData((prev) => ({
        ...prev,
        description: draft.description || generated.description || prev.description,
        price: draft.price !== undefined ? String(draft.price) : prev.price,
        stock: draft.stock !== undefined ? String(draft.stock) : prev.stock,
        image: draft.image || prev.image,
        condition: draft.condition || prev.condition,
        warranty: draft.warranty || prev.warranty,
        processor: draft.processor || prev.processor,
        ram: draft.ram || prev.ram,
        storage: draft.storage || prev.storage,
        displaySize: draft.displaySize || prev.displaySize,
        connectivity: draft.connectivity || prev.connectivity,
        batteryLife: draft.batteryLife || prev.batteryLife,
        noiseCancellation: draft.noiseCancellation || prev.noiseCancellation,
        megapixels: draft.megapixels || prev.megapixels,
        sensorSize: draft.sensorSize || prev.sensorSize,
        videoResolution: draft.videoResolution || prev.videoResolution,
        waterResistance: draft.waterResistance || prev.waterResistance,
        sensors: draft.sensors || prev.sensors,
        compatibility: draft.compatibility || prev.compatibility,
        otherSpecs: draft.otherSpecs || prev.otherSpecs,
        sku: draft.sku || prev.sku,
        features: [
          featureList[0] || prev.features[0] || "",
          featureList[1] || prev.features[1] || "",
          featureList[2] || prev.features[2] || "",
          featureList[3] || prev.features[3] || "",
        ],
      }));

      setGenerationMessage(
        generated.source === "llm"
          ? "AI filled product draft successfully."
          : "Smart fallback draft filled successfully."
      );
    } catch {
      setGenerationMessage("AI generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      tags: formData.aiTags,
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
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleClassifyWithAI}
                  disabled={isClassifying}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-amazon-secondary bg-[#f3f8ff] px-3 py-1.5 text-xs font-bold text-amazon-blue transition-colors hover:bg-[#e7f2ff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isClassifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <WandSparkles className="h-4 w-4" />}
                  AI Classify & Tag
                </button>
                {classificationMessage ? <p className="text-xs text-gray-600">{classificationMessage}</p> : null}
              </div>
              {formData.aiTags.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.aiTags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold">Brand</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold">Market Price Hint (৳)</label>
              <input
                type="number"
                name="marketPriceHint"
                value={formData.marketPriceHint}
                onChange={handleChange}
                placeholder="e.g., 495000"
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue"
              />
              <p className="mt-1 text-xs text-gray-500">Optional: give real market price to guide AI draft pricing.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-gray-700">Tone</label>
                <select
                  value={generationTone}
                  onChange={(e) => setGenerationTone(e.target.value as "professional" | "friendly" | "premium")}
                  className="rounded-md border border-gray-400 px-2 py-1 text-xs outline-none focus:border-amazon-blue focus:ring-1 focus:ring-amazon-blue"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleGenerateWithAI}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-amazon-secondary bg-[#f3f8ff] px-3 py-2 text-xs font-bold text-amazon-blue transition-colors hover:bg-[#e7f2ff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <WandSparkles className="h-4 w-4" />}
                Generate with AI
              </button>
              {generationMessage ? <p className="text-xs text-gray-600">{generationMessage}</p> : null}
            </div>
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
            <p className="mt-2 text-xs text-gray-500">These will be displayed in the &quot;About this item&quot; section on the product details page. Leave blank to omit.</p>
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
