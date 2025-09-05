"use client";

import { Input } from "@/components/ui/input";
import { ListFilter, SearchIcon } from "lucide-react";

import CategoriesSidebar from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SearchInput = ({ disabled }: { disabled?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={open} onOpenChange={setOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search products" />
      </div>
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex md:hidden"
        onClick={() => setOpen(!open)}
      >
        <ListFilter />
      </Button>
    </div>
  );
};

export default SearchInput;
