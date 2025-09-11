"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-product-filters";

export const ProductList = ({ category }: { category?: string }) => {
  const [filters] = useProductFilters();

  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({ category: category, ...filters })
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {products?.docs.map((product) => (
        <div key={product.id} className="border rounded-md bg-white p-4">
          <h2 className="text-xl font-medium">{product.name}</h2>
        </div>
      ))}
    </div>
  );
};

export const ProdcutListSkeleton = () => {
  return <div>Skeleton</div>;
};
