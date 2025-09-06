"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const ProductList = ({ category }: { category?: string }) => {
  const trpc = useTRPC();
  const { data: products } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({ category: category })
  );
  return (
    <div>
      {products?.docs.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export const ProdcutListSkeleton = () => {
  return <div>Skeleton</div>;
};
