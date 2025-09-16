"use client";

import React from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { generateTenantURL } from "@/lib/utils";

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
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {tenant.image?.url && (
            <Image
              src={tenant.image.url}
              alt={tenant.slug}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
            />
          )}
          <p className="text-xl">{tenant.name}</p>
        </Link>
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
