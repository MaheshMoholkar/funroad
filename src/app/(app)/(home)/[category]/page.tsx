import React, { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { ProductList } from "@/modules/products/ui/components/product-list";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import ProductFilters from "@/modules/products/ui/components/product-filters";
import ProductSort from "@/modules/products/ui/components/product-sort";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ minPrice: string; maxPrice: string }>;
}) => {
  const { category } = await params;
  const { minPrice, maxPrice } = await searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category, minPrice, maxPrice })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
          <p className="text-2xl font-medium">Curated for You</p>
          <ProductSort />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-8 gap-x-12">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<Skeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
