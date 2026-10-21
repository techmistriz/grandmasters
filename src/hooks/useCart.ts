"use client";

import { useCallback, useEffect, useState } from "react";

import type { CartData } from "@/src/types/cart";
import { getCart } from "../services/cart.service";

export const useCart = () => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);

  const refetchCart = useCallback(async () => {
    try {
      const response = await getCart();
      setCart(response.data ?? null);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      await refetchCart();
      setLoading(false);
    };

    loadCart();
  }, [refetchCart]);

  return { cart, loading, refetchCart };
};
