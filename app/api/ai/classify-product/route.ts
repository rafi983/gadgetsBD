import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

type ClassifyRequest = {
  name?: string;
  brand?: string;
  category?: string;
  description?: string;
  keySpecs?: string[];
};

const CATEGORIES = [
  "Laptops",
  "Smartphones",
  "Audio",
  "Gaming Accessories",
  "Cameras",
  "Wearables",
] as const;

function guessCategory(input: ClassifyRequest): { category: string; confidence: number } {
  const text = `${input.name || ""} ${input.description || ""} ${(input.keySpecs || []).join(" ")}`.toLowerCase();

  const rules: Array<{ category: string; keywords: string[] }> = [
    { category: "Laptops", keywords: ["laptop", "notebook", "ultrabook", "ssd", "keyboard", "trackpad"] },
    { category: "Smartphones", keywords: ["phone", "smartphone", "android", "ios", "sim", "5g"] },
    { category: "Audio", keywords: ["earbud", "headphone", "speaker", "anc", "audio", "bluetooth"] },
    { category: "Gaming Accessories", keywords: ["gaming", "controller", "mouse", "keyboard", "rgb", "joystick"] },
    { category: "Cameras", keywords: ["camera", "lens", "mirrorless", "dslr", "sensor", "megapixel"] },
    { category: "Wearables", keywords: ["watch", "band", "wearable", "fitness", "heart rate", "spo2"] },
  ];

  let best = { category: input.category || "Laptops", score: 0 };

  for (const rule of rules) {
    const score = rule.keywords.reduce((acc, keyword) => acc + (text.includes(keyword) ? 1 : 0), 0);
    if (score > best.score) {
      best = { category: rule.category, score };
    }
  }

  if (best.score === 0 && input.category && CATEGORIES.includes(input.category as (typeof CATEGORIES)[number])) {
    return { category: input.category, confidence: 0.7 };
  }

  return {
    category: best.category,
    confidence: Math.min(0.55 + best.score * 0.08, 0.96),
  };
}

function buildTags(input: ClassifyRequest, category: string) {
  const base = [category, input.brand || "Generic", "Tech", "Best Seller"];
  const fromName = (input.name || "")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 3);

  return [...base, ...fromName]
    .map((tag) => tag.trim())
    .filter(Boolean)
    .filter((tag, index, arr) => arr.indexOf(tag) === index)
    .slice(0, 6);
}

function buildFallback(input: ClassifyRequest) {
  const { category, confidence } = guessCategory(input);
  const tags = buildTags(input, category);

  return {
    category,
    tags,
    confidence,
    audience: "General tech shoppers",
    summary: `This listing best fits ${category}. Tags were generated from the product name, brand, and detected keywords.`,
  };
}

async function tryLLMClassify(input: ClassifyRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const prompt = `Classify this e-commerce product and generate tags. Return strict JSON only.

Input:
${JSON.stringify(input, null, 2)}

Allowed categories: ${CATEGORIES.join(", ")}

Return JSON:
{
  "category": "one of allowed categories",
  "tags": ["string", "string", "string", "string", "string", "string"],
  "confidence": 0.0,
  "audience": "string",
  "summary": "short string"
}`;

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
          content: "You are a product classifier. Output only valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
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

    const body = (await req.json()) as ClassifyRequest;

    if (!body.name && !body.description) {
      return NextResponse.json({ error: "name or description is required" }, { status: 400 });
    }

    const fallback = buildFallback(body);

    try {
      const llm = await tryLLMClassify(body);
      if (llm?.category && Array.isArray(llm?.tags)) {
        return NextResponse.json({ ...llm, source: "llm" });
      }
    } catch {
      // fallback
    }

    return NextResponse.json({ ...fallback, source: "fallback" });
  } catch {
    return NextResponse.json({ error: "Failed to classify product" }, { status: 500 });
  }
}
