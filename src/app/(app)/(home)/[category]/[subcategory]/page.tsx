import React, { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { ProductList } from "@/modules/products/components/product-list";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const Page = async ({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) => {
  const { subcategory } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Skeleton />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
