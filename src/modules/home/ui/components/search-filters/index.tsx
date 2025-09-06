"use client";

import SearchInput from "./search-input";
import Categories from "./categories";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import BreadcrumbNavigation from "./breadcrumb-navigation";

const SearchFilters = () => {
  const trpc = useTRPC();
  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );
  const params = useParams();
  const categoryParam = params.category as string;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = categories.find(
    (category) => category.slug === activeCategory
  );

  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory;
  const activeSubcategoryName =
    activeCategoryData?.subcategories.find(
      (subcategory) => subcategory.slug === activeSubcategory
    )?.name || null;

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: activeCategoryColor,
      }}
    >
      <SearchInput />
      <div className="hidden md:block">
        <Categories data={categories} />
      </div>
      <BreadcrumbNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput disabled />
      <div className="hidden md:block">
        <div className="h-11" />
      </div>
    </div>
  );
};

export default SearchFilters;
