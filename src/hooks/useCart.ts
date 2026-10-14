import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/APIs/cart";
import type { CartResponse } from "../types/summit.types";

export const useCart = () => {
  return useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await getCart();
      return res.data as CartResponse;
    },
  });
};
