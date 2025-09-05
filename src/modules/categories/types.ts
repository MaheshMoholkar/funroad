import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type CatagoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
export type CatagoriesGetSingleOutput = CatagoriesGetManyOutput[0];
