import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyCoupon, removeCoupon } from "./cart";

export const useApplyCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponCode: string) => applyCoupon(couponCode),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export const useRemoveCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponCode: string) => removeCoupon(couponCode),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
