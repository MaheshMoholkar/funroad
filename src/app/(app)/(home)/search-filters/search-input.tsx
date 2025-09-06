"use client";

import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilter, SearchIcon } from "lucide-react";

import CategoriesSidebar from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const SearchInput = ({ disabled }: { disabled?: boolean }) => {
  const [open, setOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={open} onOpenChange={setOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex md:hidden"
        onClick={() => setOpen(!open)}
      >
        <ListFilter />
      </Button>
      {session.data?.user && (
        <Button variant="elevated" asChild>
          <Link href="/library">
            <BookmarkCheckIcon />
            <span className="hidden lg:block">Library</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
