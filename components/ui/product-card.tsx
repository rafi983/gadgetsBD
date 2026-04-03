import Image from "next/image";

import { formatBdt, type Product } from "@/lib/mock-data";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <Image
        src={product.image}
        alt={product.name}
        width={640}
        height={360}
        className="mb-3 h-44 w-full rounded object-cover"
      />
      <h3 className="line-clamp-2 text-sm font-semibold">{product.name}</h3>
      <p className="mt-1 text-xs text-gray-600">{product.vendor}</p>
      <p className="mt-2 text-amazon-orange">
        <span className="text-xs align-top">BDT</span> {formatBdt(product.price)}
      </p>
    </article>
  );
}


