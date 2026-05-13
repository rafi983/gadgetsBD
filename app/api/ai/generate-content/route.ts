import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type GenerateRequest = {
  name?: string;
  category?: string;
  brand?: string;
  keySpecs?: string[];
  price?: number;
  priceHint?: number;
  tone?: "professional" | "friendly" | "premium";
};

type GeneratedDraft = {
  description: string;
  features: string[];
  image: string;
  price: number;
  stock: number;
  condition: string;
  warranty: string;
  processor: string;
  ram: string;
  storage: string;
  displaySize: string;
  connectivity: string;
  batteryLife: string;
  noiseCancellation: string;
  megapixels: string;
  sensorSize: string;
  videoResolution: string;
  waterResistance: string;
  sensors: string;
  compatibility: string;
  otherSpecs: string;
  sku: string;
};

function toText(input: GenerateRequest) {
  return `${input.name || ""} ${(input.keySpecs || []).join(" ")} ${input.brand || ""}`.toLowerCase();
}

function detectRam(text: string) {
  const match = text.match(/(8|12|16|18|24|32|64)\s?gb/);
  return match ? `${match[1]}GB` : "";
}

function detectStorage(text: string) {
  const tb = text.match(/(1|2|4)\s?tb/);
  if (tb) return `${tb[1]}TB SSD`;

  const gb = text.match(/(128|256|512)\s?gb/);
  if (gb) return `${gb[1]}GB SSD`;

  return "";
}

function inferBrandModelDraft(input: GenerateRequest): Partial<GeneratedDraft> {
  const name = (input.name || "").toLowerCase();
  const brand = (input.brand || "").toLowerCase();
  const text = toText(input);
  const category = (input.category || "").toLowerCase();

  const ram = detectRam(text);
  const storage = detectStorage(text);

  if (category === "laptops" && (brand.includes("apple") || name.includes("macbook") || name.includes("mac "))) {
    const isPro = name.includes("pro");
    const isAir = name.includes("air");
    const hasM4 = text.includes("m4");
    const hasM3 = text.includes("m3");
    const hasM2 = text.includes("m2");

    const chip = hasM4 ? "Apple M4" : hasM3 ? "Apple M3" : hasM2 ? "Apple M2" : "Apple M3";
    const basePrice = isPro ? 265000 : isAir ? 155000 : 185000;
    const chipDelta = hasM4 ? 80000 : hasM3 ? 35000 : 0;
    const ramDelta = ram === "24GB" ? 60000 : ram === "18GB" ? 35000 : ram === "16GB" ? 22000 : 0;
    const storageDelta = storage.startsWith("1TB") ? 50000 : storage.startsWith("2TB") ? 130000 : 0;

    return {
      processor: chip,
      ram: ram || (isPro ? "18GB" : "16GB"),
      storage: storage || "512GB SSD",
      displaySize: isPro ? "14.2-inch Liquid Retina XDR" : "13.6-inch Liquid Retina",
      batteryLife: isPro ? "Up to 18 hours" : "Up to 15 hours",
      connectivity: "Wi-Fi 6E, Bluetooth 5.3, Thunderbolt / USB4",
      otherSpecs: "Backlit Magic Keyboard, Force Touch trackpad, 1080p FaceTime camera",
      warranty: "1 Year",
      condition: "New",
      price: basePrice + chipDelta + ramDelta + storageDelta,
    };
  }

  if (category === "laptops" && (text.includes("rtx 4090") || text.includes("rtx4090"))) {
    return {
      processor: text.includes("i9") ? "Intel Core i9" : "Intel Core i9 14th Gen",
      ram: ram || "32GB",
      storage: storage || "1TB SSD",
      displaySize: "16-inch QHD+ 240Hz",
      batteryLife: "Up to 6 hours",
      connectivity: "Wi-Fi 6E, Bluetooth 5.3, USB-C, HDMI",
      otherSpecs: "RTX 4090 GPU, advanced cooling, RGB keyboard",
      warranty: "1 Year",
      condition: "New",
      price: 450000,
    };
  }

  if (category === "smartphones" && brand.includes("apple")) {
    const isProMax = name.includes("pro max");
    const isPro = !isProMax && name.includes("pro");
    const isPlus = name.includes("plus");

    return {
      processor: "Apple A-series chipset",
      ram: isProMax || isPro ? "8GB" : "6GB",
      storage: storage || (isProMax ? "256GB" : "128GB"),
      displaySize: isProMax ? "6.7-inch Super Retina XDR" : "6.1-inch Super Retina XDR",
      batteryLife: "All-day battery life",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC",
      otherSpecs: "Face ID, MagSafe, IP68 water resistance",
      warranty: "1 Year",
      condition: "New",
      price: isProMax ? 220000 : isPro ? 185000 : isPlus ? 155000 : 135000,
    };
  }

  return {
    ram,
    storage,
  };
}

function getCategoryDefaults(category: string): Partial<GeneratedDraft> {
  const normalized = category.toLowerCase();

  if (normalized === "laptops") {
    return {
      price: 115000,
      stock: 18,
      condition: "New",
      warranty: "1 Year",
      processor: "Intel Core i7 13th Gen",
      ram: "16GB",
      storage: "512GB SSD",
      displaySize: "15.6-inch FHD IPS",
      batteryLife: "Up to 8 hours",
      connectivity: "Wi-Fi 6, Bluetooth 5.2, USB-C",
      otherSpecs: "Backlit keyboard, fingerprint sensor, HD webcam",
    };
  }

  if (normalized === "smartphones") {
    return {
      price: 68000,
      stock: 24,
      condition: "New",
      warranty: "1 Year",
      processor: "Snapdragon 8 Gen Series",
      ram: "8GB",
      storage: "256GB",
      displaySize: "6.7-inch AMOLED",
      batteryLife: "5000mAh all-day battery",
      connectivity: "5G, Wi-Fi 6, Bluetooth 5.3, NFC",
      otherSpecs: "Fast charging, stereo speakers, in-display fingerprint",
    };
  }

  if (normalized === "audio") {
    return {
      price: 14500,
      stock: 30,
      condition: "New",
      warranty: "6 Months",
      connectivity: "Bluetooth 5.3",
      batteryLife: "Up to 30 hours (case included)",
      noiseCancellation: "Hybrid Active Noise Cancellation",
      otherSpecs: "Low-latency mode, dual-device pairing, clear call mic",
    };
  }

  if (normalized === "cameras") {
    return {
      price: 95000,
      stock: 10,
      condition: "New",
      warranty: "1 Year",
      megapixels: "24.2 MP",
      sensorSize: "APS-C",
      videoResolution: "4K 30fps",
      connectivity: "Wi-Fi, Bluetooth, USB-C",
      otherSpecs: "Fast autofocus, in-body stabilization, flip screen",
    };
  }

  if (normalized === "wearables") {
    return {
      price: 18500,
      stock: 28,
      condition: "New",
      warranty: "1 Year",
      displaySize: "1.43-inch AMOLED",
      batteryLife: "Up to 10 days",
      waterResistance: "5 ATM",
      sensors: "Heart rate, SpO2, sleep, stress",
      connectivity: "Bluetooth 5.2",
      otherSpecs: "GPS, notifications, fitness tracking",
    };
  }

  if (normalized === "gaming accessories") {
    return {
      price: 7500,
      stock: 35,
      condition: "New",
      warranty: "6 Months",
      compatibility: "PC, PS5, Xbox Series X|S",
      connectivity: "2.4GHz Wireless + USB-C",
      otherSpecs: "Low-latency input, ergonomic design, RGB support",
    };
  }

  return {
    price: 20000,
    stock: 20,
    condition: "New",
    warranty: "No Warranty",
    otherSpecs: "Balanced performance and reliable build quality",
  };
}

function makeSku(name: string, category: string, brand?: string) {
  const n = name.replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase() || "ITEM";
  const c = category.replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase() || "CAT";
  const b = (brand || "GEN").replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase() || "GEN";
  return `${b}-${c}-${n}`;
}

function buildFallbackContent(input: GenerateRequest) {
  const title = input.name || "This product";
  const brand = input.brand ? `${input.brand} ` : "";
  const category = input.category || "gadget";
  const tone = input.tone || "professional";
  const keySpecs = (input.keySpecs || []).filter(Boolean);
  const defaults = getCategoryDefaults(category);
  const modelAware = inferBrandModelDraft(input);
  const targetPrice = Number(input.priceHint || input.price || modelAware.price || defaults.price || 20000);

  const openingByTone: Record<string, string> = {
    professional: `${title} is a reliable ${brand}${category.toLowerCase()} designed for everyday performance and long-term value.`,
    friendly: `Meet ${title} — a ${brand}${category.toLowerCase()} built to make your daily tasks smoother and more enjoyable.`,
    premium: `${title} is a premium ${brand}${category.toLowerCase()} that combines refined design with top-tier performance.`,
  };

  const description = [
    openingByTone[tone] || openingByTone.professional,
    keySpecs.length
      ? `Highlights include ${keySpecs.slice(0, 3).join(", ")}, making it a strong choice for users who want practical features without compromise.`
      : `It offers a balanced mix of design, performance, and usability for modern tech users.`,
    Number.isFinite(targetPrice)
      ? `With a price point around ৳${targetPrice.toLocaleString()}, it delivers excellent value in its segment.`
      : `It is positioned to deliver excellent value in its category.`,
  ].join(" ");

  const features = [
    ...(keySpecs.length ? keySpecs.slice(0, 3) : []),
    "Trusted build quality",
    "Optimized for daily use",
    "Great value for money",
  ].slice(0, 5);

  const tags = [category, input.brand, "Tech", "Value"]
    .filter(Boolean)
    .map((t) => String(t).trim())
    .filter((t, idx, arr) => arr.indexOf(t) === idx)
    .slice(0, 5);

  const draft: GeneratedDraft = {
    description,
    features,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900",
    price: targetPrice,
    stock: Number(defaults.stock || 20),
    condition: modelAware.condition || defaults.condition || "New",
    warranty: modelAware.warranty || defaults.warranty || "No Warranty",
    processor: modelAware.processor || defaults.processor || "",
    ram: modelAware.ram || defaults.ram || "",
    storage: modelAware.storage || defaults.storage || "",
    displaySize: modelAware.displaySize || defaults.displaySize || "",
    connectivity: modelAware.connectivity || defaults.connectivity || "",
    batteryLife: modelAware.batteryLife || defaults.batteryLife || "",
    noiseCancellation: defaults.noiseCancellation || "",
    megapixels: defaults.megapixels || "",
    sensorSize: defaults.sensorSize || "",
    videoResolution: defaults.videoResolution || "",
    waterResistance: defaults.waterResistance || "",
    sensors: defaults.sensors || "",
    compatibility: defaults.compatibility || "",
    otherSpecs: modelAware.otherSpecs || defaults.otherSpecs || "",
    sku: makeSku(title, category, input.brand),
  };

  return {
    shortDescription: `${title} | ${brand}${category}`.trim(),
    description,
    features,
    tags,
    draft,
  };
}

async function tryLLMContent(input: GenerateRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const prompt = `Create e-commerce product content in strict JSON.

Input:
${JSON.stringify(input, null, 2)}

Return JSON only with this shape:
{
  "shortDescription": "string (max 120 chars)",
  "description": "string (100-180 words)",
  "features": ["string", "string", "string", "string", "string"],
  "tags": ["string", "string", "string", "string", "string"],
  "draft": {
    "description": "string",
    "features": ["string", "string", "string", "string"],
    "image": "string image URL",
    "price": 0,
    "stock": 0,
    "condition": "New or Renewed",
    "warranty": "No Warranty or 6 Months or 1 Year or 2 Years",
    "processor": "string",
    "ram": "string",
    "storage": "string",
    "displaySize": "string",
    "connectivity": "string",
    "batteryLife": "string",
    "noiseCancellation": "string",
    "megapixels": "string",
    "sensorSize": "string",
    "videoResolution": "string",
    "waterResistance": "string",
    "sensors": "string",
    "compatibility": "string",
    "otherSpecs": "string",
    "sku": "string"
  }
}

Rules:
- No markdown
- No extra keys
- Keep language clear for e-commerce shoppers
- Features should be punchy bullet-friendly phrases
- Ensure draft fields are relevant to the category
- Infer realistic price and specs from product name and brand
- Do not use Intel processors for Apple MacBook; use Apple M-series
- If model cues indicate premium products (e.g., MacBook Pro M3/M4, RTX 4090), set premium-aligned prices
- If priceHint is provided, keep draft.price close to it (within about +-10%) unless clearly impossible`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are an e-commerce copywriter. Output only strict JSON, no markdown or prose.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;

  try {
    return JSON.parse(content);
  } catch {
    const cleaned = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userType = (session?.user as { type?: string } | undefined)?.type;
    if (!session || userType !== "ShopOwner") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as GenerateRequest;

    if (!body.name || !body.category) {
      return NextResponse.json({ error: "name and category are required" }, { status: 400 });
    }

    const fallback = buildFallbackContent(body);

    try {
      const llmContent = await tryLLMContent(body);
      if (llmContent?.description && Array.isArray(llmContent?.features)) {
        return NextResponse.json({ ...llmContent, source: "llm" });
      }
    } catch {
      // Fallback intentionally used when LLM call fails.
    }

    return NextResponse.json({ ...fallback, source: "fallback" });
  } catch {
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
