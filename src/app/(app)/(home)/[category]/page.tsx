import React from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={category} />
    </HydrationBoundary>
  );
};

export default Page;
