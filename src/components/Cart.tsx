import React, { useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import img from "../assets/images/lwLogo.jpg";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  removeItem,
  updateCart,
  applyCoupon,
  removeCoupon,
  undoRemoveItem,
} from "../services/APIs/cart";
import { useCart } from "../hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "../types/summit.types";

const Cart = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: cartData, refetch } = useCart();

  const cartItems = cartData?.data?.items || [];
  const cartTotal = cartData?.data || null;

  const [couponCode, setCouponCode] = useState("");
  const [updatedQuantities, setUpdatedQuantities] = useState<{
    [key: number]: number;
  }>({});
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [showUndo, setShowUndo] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setCartMessage(msg);

    setTimeout(() => {
      setCartMessage("");
    }, 3000);
  };

  const showCouponError = (msg: string) => {
    setCouponError(msg);

    setTimeout(() => {
      setCouponError("");
    }, 5000);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      setCouponLoading(true);
      setCouponError("");

      await applyCoupon(couponCode);

      await refetch();
      showMessage("Coupon applied successfully.");
      setShowUndo(false);
    } catch (err: any) {
      showCouponError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Invalid coupon code",
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      setCouponLoading(true);

      const code = cartTotal?.coupon?.code || couponCode;

      await removeCoupon(code);

      setCouponCode("");

      await refetch();

      showMessage("Coupon removed successfully.");
      setShowUndo(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemove = async (item: CartItem) => {
    try {
      setLoadingAction("remove-" + item.plan_id);
      // store removed item FIRST
      setShowUndo(true);

      await removeItem(item.plan_id);
      await refetch();
      showMessage(`"${item.plan_name}" removed from cart.`);

      // auto clear undo after 5–7 sec
      // setTimeout(() => {
      //   setShowUndo(false);
      // }, 15000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleUndoRemove = async () => {
    try {
      await undoRemoveItem();
      await refetch();
      showMessage("Cart restored successfully.");
      setShowUndo(false);
    } catch (error) {
      console.error("[UNDO FAILED]:", error);
    }
  };

  const handleUpdateCart = async () => {
    try {
      setLoadingAction("update");

      for (const item of cartItems) {
        const qty = updatedQuantities[item.plan_id] ?? item.quantity;

        if (qty !== item.quantity) {
          await updateCart(item.plan_id, qty);
        }
      }

      await refetch();
      setUpdatedQuantities({});
      showMessage("Cart updated successfully.");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(null);
    }
  };
  const hasQuantityChanges = cartItems.some(
    (item) =>
      (updatedQuantities[item.plan_id] ?? item.quantity) !== item.quantity,
  );

  const MiniLoader = () => (
    <div className="w-4 h-4 border-2 border-[#D12229] border-t-transparent rounded-full animate-spin" />
  );

  return (
    <div className="max-w-6xl mx-auto p-4 font-roboto text-[#333] my-[120px]">
      {/* Success Alert */}
      <div className="flex items-center gap-3 p-4 mb-8 bg-[#f6f5f8] rounded-sm">
        <FaCheckCircle className="text-[#D0252D] text-lg" />

        <p className="text-[15px]">
          {cartMessage ||
            (cartItems.length > 0
              ? `"${cartItems[0]?.plan_name}" has been added to your cart.`
              : "Your cart is empty.")}

          {showUndo && (
            <button
              onClick={handleUndoRemove}
              className="ml-2 text-[#D0252D] underline font-medium cursor-pointer"
            >
              Undo?
            </button>
          )}
        </p>
      </div>

      {/* Cart Table */}

      <div className="overflow-x-auto border border-gray-200 rounded-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#D0252D] border text-white">
              <th className="p-3 "></th>
              <th className="p-3  "></th>
              <th className="p-3   ">Product</th>
              {/* <th className="p-3 border border-[#d3ced2] ">Price</th> */}
              <th className="p-3 border border-[#d3ced2]  ">Price</th>
              <th className="p-3 border border-[#d3ced2] ">Quantity</th>
              <th className="p-3 border border-[#d3ced2]  ">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="p-4 border border-[#d3ced2]">
                  <button
                    onClick={() => handleRemove(item)}
                    disabled={loadingAction === "remove-" + item.plan_id}
                    className="flex items-center justify-center mx-auto"
                  >
                    {loadingAction === "remove-" + item.plan_id ? (
                      <MiniLoader />
                    ) : (
                      <FaTimes
                        size={20}
                        className="text-[#D0252D] cursor-pointer hover:bg-[#D0252D] hover:text-white rounded-full p-1"
                      />
                    )}
                  </button>
                </td>

                <td className="p-4 border border-[#d3ced2]">
                  <img src={img} alt={item.plan_name} className="w-12" />
                </td>

                <td className="p-4 border-b border-gray-300 text-[#D0252D]">
                  {item.plan_name}
                </td>

                <td className="p-4 border border-[#d3ced2]">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </td>

                <td className="p-4 border border-[#d3ced2]">
                  <input
                    type="number"
                    min="1"
                    value={updatedQuantities[item.plan_id] ?? item.quantity}
                    onChange={(e) =>
                      setUpdatedQuantities((prev) => ({
                        ...prev,
                        [item.plan_id]: Number(e.target.value),
                      }))
                    }
                    className="w-12 h-10 border border-[#d3ced2] text-center"
                  />
                </td>

                <td className="p-4 border border-[#d3ced2]">
                  ₹{Number(item.price * item.quantity).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Coupon Section */}
        <div className="p-4 flex flex-wrap justify-between items-center bg-white border-t border-gray-200 gap-4 rounded-sm">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                type="text"
                placeholder="Coupon code"
                className="border border-gray-300 rounded-sm px-4 py-2 w-32 md:w-48 text-sm"
              />

              <button
                onClick={handleApplyCoupon}
                className="bg-[#D12229] rounded-sm text-white px-6 py-2 text-[13px] font-bold uppercase cursor-pointer"
              >
                {couponLoading ? "Applying..." : "Apply coupon"}
              </button>
            </div>

            {couponError && (
              <p className="text-[#D0252D] text-xs mt-1">{couponError}</p>
            )}
          </div>
          <button
            onClick={handleUpdateCart}
            disabled={loadingAction === "update" || !hasQuantityChanges}
            className={`px-3 py-2 text-[13px] font-bold  rounded-sm transition
            ${
              hasQuantityChanges
                ? "bg-[#dad7de] text-[#515151] cursor-pointer"
                : "bg-[#E9E6ED] text-[#9e9e9e] cursor-not-allowed"
            }`}
          >
            {loadingAction === "update" ? (
              <span className="flex items-center gap-2">
                <MiniLoader /> Updating...
              </span>
            ) : (
              "Update cart"
            )}
          </button>
        </div>
      </div>

      {/* Cart Totals */}
      <div className="mt-10 flex justify-end">
        <div className="w-full max-w-md">
          <h2 className="text-[#D12229] text-xl font-bold uppercase mb-2 ">
            Cart totals
          </h2>
          <table className="w-full border border-gray-200 rounded-sm text-[14px]">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="px-3 py-2 text-left font-bold w-1/3">
                  Subtotal
                </th>
                <td className="px-3 py-2 text-[14px]">
                  ₹{Number(cartTotal?.subtotal || 0).toLocaleString("en-IN")}
                </td>
              </tr>

              {cartTotal?.coupon && (
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-left font-bold">
                    Coupon: {cartTotal.coupon.code}
                  </th>

                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span>
                        -₹
                        {Number(cartTotal.discount || 0).toLocaleString(
                          "en-IN",
                        )}
                      </span>

                      <button
                        onClick={handleRemoveCoupon}
                        disabled={couponLoading}
                        className="text-[#D12229]  hover:underline min-w-[70px] inline-flex items-center justify-center cursor-pointer"
                      >
                        {couponLoading ? <MiniLoader /> : "[Remove]"}
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              <tr className="border-b border-gray-200">
                <th className="px-3 py-2 text-left font-bold">
                  GST ({cartTotal?.gst_percent || 18}%)
                </th>
                <td className="px-3 py-2">
                  ₹{Number(cartTotal?.gst_amount || 0).toLocaleString("en-IN")}
                </td>
              </tr>

              <tr>
                <th className="px-3 py-2 text-left font-bold">Total</th>
                <td className="px-3 py-2 font-bold text-[16px]">
                  ₹{Number(cartTotal?.total || 0).toLocaleString("en-IN")}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-[#D12229] text-white py-4 text-[16px] font-bold rounded-sm uppercase tracking-tight  transition cursor-pointer"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
