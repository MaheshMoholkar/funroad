import React from "react";

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  return <div>{category}</div>;
};

export default Page;
