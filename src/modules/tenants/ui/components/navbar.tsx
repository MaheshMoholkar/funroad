"use client";

import React from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const Navbar = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data: tenant } = useSuspenseQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-12">
        <p className="text-xl">{tenant.name}</p>
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-12">
        <div />
      </div>
    </nav>
  );
};

export default Navbar;
