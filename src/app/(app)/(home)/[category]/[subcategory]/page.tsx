import React from "react";

const Page = async ({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) => {
  const { subcategory } = await params;
  return <div>{subcategory}</div>;
};

export default Page;
