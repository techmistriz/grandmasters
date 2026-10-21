"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Ticket, Trash2 } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import Select from "react-select";

import { useCart } from "@/src/hooks/useCart";
import {
  paymentFail,
  registerOrder,
  verifyPayment,
} from "@/src/services/order.service";
import {
  applyCoupon,
  removeCoupon,
  removeItem,
  updateCart,
} from "@/src/services/cart.service";
import {
  getCities,
  getCountries,
  getStates,
} from "@/src/services/location.service";
import { ORDER_SUCCESS_STORAGE_KEY } from "@/src/config/order.config";
import type { CartItem } from "@/src/types/cart";
import type {
  AttendeeFormData,
  LocationOption,
  RegisterOrderPayload,
} from "@/src/types/order";
import { getErrorMessage } from "@/src/utils/error";
import { loadRazorpay } from "@/src/utils/loadRazorpay";

const INDIA_COUNTRY_ID = 101;

const emptyAttendee: AttendeeFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  designation: "",
};

const validEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const inputClass =
  "w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-[#D0252D] focus:border-transparent outline-none text-[13px] transition-shadow";

function MiniLoader() {
  return (
    <div className="w-3.5 h-3.5 border-2 border-[#D12229] border-t-transparent rounded-full animate-spin" />
  );
}

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, loading: cartLoading, refetchCart: refetch } = useCart();

  const timeoutRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const cartItems = cart?.items ?? [];
  const cartTotal = cart;

  const [showCouponBox, setShowCouponBox] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [updatedQuantities, setUpdatedQuantities] = useState<{
    [key: number]: number;
  }>({});

  const [updating, setUpdating] = useState<number | null>(null);

  const [couponApplying, setCouponApplying] = useState(false);
  const [couponRemoving, setCouponRemoving] = useState(false);

  const [countries, setCountries] = useState<LocationOption[]>([]);
  const [states, setStates] = useState<LocationOption[]>([]);
  const [cities, setCities] = useState<LocationOption[]>([]);

  const [selectedCountryId, setSelectedCountryId] =
    useState<number>(INDIA_COUNTRY_ID);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    gst_number: "",
    firm_name: "",
    country: "India",
    country_id: INDIA_COUNTRY_ID as number,

    state: "",
    state_id: null as number | null,

    city: "",
    city_id: null as number | null,
    address: "",
    pincode: "",
  });

  const attendeeCount = cartItems.reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0,
  );

  // One attendee form per ticket; entries typed so far are kept when the
  // quantity changes.
  const [attendeeDrafts, setAttendeeDrafts] = useState<AttendeeFormData[]>([]);

  const attendees = Array.from(
    { length: attendeeCount },
    (_, index) => attendeeDrafts[index] ?? emptyAttendee,
  );

  const updateAttendee = (
    index: number,
    field: keyof AttendeeFormData,
    value: string,
  ) => {
    setAttendeeDrafts(
      attendees.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleQuantityChange = async (planId: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      setUpdating(planId);

      await updateCart(planId, quantity);

      await refetch();

      setUpdatedQuantities((prev) => ({
        ...prev,
        [planId]: quantity,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    try {
      setCouponError("");
      setCouponApplying(true);

      await applyCoupon(couponCode);
      await refetch();

      setCouponCode("");
      setShowCouponBox(false);
    } catch (err) {
      setCouponError(getErrorMessage(err, "Invalid coupon code."));
    } finally {
      setCouponApplying(false);
    }
  };

  const handleRemoveCoupon = async () => {
    const code = cartTotal?.coupon?.code;

    if (!code) {
      toast.error("No coupon applied.");
      return;
    }

    try {
      setCouponRemoving(true);

      await removeCoupon(code);
      await refetch();

      setCouponCode("");
      setShowCouponBox(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCouponRemoving(false);
    }
  };

  const handleRemove = async (item: CartItem) => {
    try {
      setLoadingAction(`remove-${item.plan_id}`);

      await removeItem(item.plan_id);
      await refetch();

      toast.success(`"${item.plan_name}" removed from cart.`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleOrder = async () => {
    try {
      if (
        !formData.full_name.trim() ||
        !validEmail(formData.email) ||
        formData.phone.length !== 10 ||
        !formData.firm_name.trim() ||
        !formData.address.trim() ||
        !formData.city_id ||
        !formData.state_id ||
        !formData.country_id ||
        formData.pincode.length !== 6
      ) {
        toast.error("Please complete all required billing fields correctly.");
        return;
      }

      if (attendees.length !== attendeeCount || attendeeCount === 0) {
        toast.error("Please check your ticket quantity and attendee details.");
        return;
      }

      const invalidAttendee = attendees.some(
        (attendee) =>
          !attendee.name.trim() ||
          !validEmail(attendee.email) ||
          attendee.phone.length !== 10 ||
          !attendee.company.trim() ||
          !attendee.designation.trim(),
      );

      if (invalidAttendee) {
        toast.error("Please complete all attendee details correctly.");
        return;
      }

      setLoading(true);

      const payload: RegisterOrderPayload = {
        full_name: formData.full_name,
        email: formData.email.trim(),
        phone: formData.phone,
        firm_name: formData.firm_name.trim(),
        gst_number: formData.gst_number.trim(),
        message: "",
        address: formData.address.trim(),
        city_id: String(formData.city_id),
        state_id: String(formData.state_id),
        country_id: String(formData.country_id),
        pincode: formData.pincode,
        attendees: attendees.map((attendee) => ({
          attendee_name: attendee.name.trim(),
          attendee_email: attendee.email.trim(),
          attendee_phone: attendee.phone,
          attendee_company: attendee.company.trim(),
          attendee_designation: attendee.designation.trim(),
        })),
      };

      const registerResponse = await registerOrder(payload);
      const order = registerResponse.data;

      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error("Unable to load payment gateway");
        return;
      }

      const razorpay = new window.Razorpay({
        key: order.razorpay_key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.razorpay_order_id,
        name: "Grand Masters",
        description: order.order_number,

        prefill: {
          name: order.user.name,
          email: order.user.email,
          contact: order.user.phone,
        },

        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            setPaymentProcessing(true);

            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment Successful");

            sessionStorage.setItem(
              ORDER_SUCCESS_STORAGE_KEY,
              JSON.stringify(verifyRes.data || verifyRes),
            );

            router.push("/payment-success");
          } catch (error) {
            toast.error(getErrorMessage(error, "Payment verification failed"));
            setPaymentProcessing(false);
          }
        },

        modal: {
          ondismiss: async () => {
            setPaymentProcessing(false);

            try {
              await paymentFail({
                razorpay_order_id: order.razorpay_order_id,
              });
            } catch (error) {
              console.error("PAYMENT FAIL API ERROR:", error);
            }

            toast.error("Payment cancelled");
          },
        },

        theme: {
          color: "#D0252D",
        },
      });

      razorpay.on("payment.failed", async () => {
        setPaymentProcessing(false);

        try {
          await paymentFail({
            razorpay_order_id: order.razorpay_order_id,
          });
        } catch (error) {
          console.error("PAYMENT FAIL API ERROR:", error);
        }

        toast.error("Payment failed");
      });

      razorpay.open();
    } catch (error) {
      toast.error(getErrorMessage(error, "Order creation failed"));
    } finally {
      setLoading(false);
    }
  };

  const countryOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.id,
    label: state.name,
  }));

  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const fetchStates = async (countryId: number) => {
    try {
      const res = await getStates(countryId);

      setStates(res.data ?? []);
      setCities([]);

      setSelectedCountryId(countryId);
      setSelectedStateId(null);

      setFormData((prev) => ({
        ...prev,
        state: "",
        state_id: null,
        city: "",
        city_id: null,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries();

        setCountries(res.data ?? []);

        // Load India's states immediately
        fetchStates(INDIA_COUNTRY_ID);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCountries();
  }, []);

  const fetchCities = async (stateId: number) => {
    try {
      const res = await getCities(stateId);

      setCities(res.data ?? []);

      setSelectedStateId(stateId);

      setFormData((prev) => ({
        ...prev,
        city: "",
        city_id: null,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (cartLoading && !cart) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D0252D]/20 border-t-[#D0252D]" />
      </div>
    );
  }

  return (
    <>
      {paymentProcessing && (
        <div className="font-roboto fixed inset-0 z-[9999] bg-black/50 flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#D0252D] border-t-transparent rounded-full animate-spin" />

            <p className="text-lg font-semibold">Payment Processing...</p>

            <p className="text-sm text-gray-500">
              Please do not refresh or close this page.
            </p>
          </div>
        </div>
      )}

      <div className="font-roboto bg-white min-h-screen text-[#333] mt-[80px]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-4 py-6 md:py-10">
          {/* Main Layout - Grid with 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Left Column: Billing Details + Additional Information - Takes 2/3 of the space */}
            <div className="lg:col-span-2 space-y-8">
              {/* Selected Ticket Section */}

              <h2 className="text-[#D0252d] font-bold text-[21px] leading-6 mb-4 uppercase">
                Your Ticket
              </h2>
              <div className="rounded-lg border border-[#D0252D]/20 bg-[#FFF8F8] p-6">
                {cartItems.map((item) => (
                  <div
                    key={item.plan_id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 py-4 last:border-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">
                        {item.plan_name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ₹{Number(item.price).toLocaleString("en-IN")} / Ticket
                      </p>
                    </div>

                    <div className="flex items-center gap-10 mt-4 md:mt-0">
                      {/* Quantity */}
                      <div className="relative flex items-center gap-3">
                        <span className="text-sm text-gray-600">Qty</span>
                        <button
                          type="button"
                          onClick={() => handleRemove(item)}
                          disabled={loadingAction === `remove-${item.plan_id}`}
                          className="text-red-600 hover:text-red-700"
                        >
                          {loadingAction === `remove-${item.plan_id}` ? (
                            <MiniLoader />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={
                            updatedQuantities[item.plan_id] ?? item.quantity
                          }
                          onChange={(e) => {
                            const qty = Number(e.target.value);

                            setUpdatedQuantities((prev) => ({
                              ...prev,
                              [item.plan_id]: qty,
                            }));

                            clearTimeout(timeoutRef.current[item.plan_id]);

                            timeoutRef.current[item.plan_id] = setTimeout(
                              () => {
                                handleQuantityChange(item.plan_id, qty);
                              },
                              500,
                            );
                          }}
                          className="w-16 border border-gray-300 rounded-md text-center py-1.5 focus:ring-2 focus:ring-[#D0252D] focus:border-transparent outline-none"
                        />

                        {updating === item.plan_id && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#D0252D] border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>

                      {/* Price */}
                      <div className="min-w-[100px] text-right font-bold text-base">
                        ₹
                        {Number(
                          item.price *
                            (updatedQuantities[item.plan_id] ?? item.quantity),
                        ).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              {cartTotal?.coupon ? (
                <div className="bg-green-50 p-4 rounded-md flex items-center gap-3 border border-green-200">
                  <FaCheckCircle className="text-[#D0252D] text-lg" />

                  <p className="text-sm md:text-base">
                    Coupon code applied successfully.
                    <span className="ml-2 font-semibold text-[#D0252D]">
                      ({cartTotal.coupon.code})
                    </span>
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-[#f5f5f5] p-4 rounded-md flex items-center gap-3">
                    <Ticket className="text-[#D0252D] w-5 h-5" />

                    <p className="text-sm md:text-base">
                      Have a coupon?{" "}
                      <button
                        onClick={() => setShowCouponBox(!showCouponBox)}
                        className="text-[#D0252D] underline cursor-pointer font-medium hover:text-[#b01e24] transition-colors"
                      >
                        Click here to enter your code
                      </button>
                    </p>
                  </div>

                  {showCouponBox && (
                    <div className="border rounded-md border-gray-300 p-5 bg-white shadow-sm">
                      <div className="flex flex-col md:flex-row gap-4">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleApplyCoupon();
                          }}
                          className="flex flex-col sm:flex-row gap-3 w-full"
                        >
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="border border-gray-300 px-3 py-2 rounded-md w-full sm:w-64 focus:ring-2 focus:ring-[#D0252D] focus:border-transparent outline-none text-sm"
                          />

                          <button
                            type="submit"
                            disabled={couponApplying}
                            className="bg-[#e9e6ed] text-[#515151] hover:bg-[#d9d6dd] text-[15px] font-bold px-6 py-2 rounded-md cursor-pointer disabled:opacity-50 transition-colors"
                          >
                            {couponApplying ? "Applying..." : "Apply coupon"}
                          </button>
                        </form>
                      </div>
                      {couponError && (
                        <p className="mt-2 text-[11px] font-normal text-[#D0252D]">
                          {couponError}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Attendee Details */}
              <div>
                <h2 className="text-[#D0252d] font-bold text-xl mb-6 uppercase tracking-wide">
                  Attendee Details
                </h2>

                <div className="space-y-6">
                  {attendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md p-5 space-y-5"
                    >
                      <h3 className="text-[#333] font-semibold text-base">
                        Attendee {index + 1}
                      </h3>

                      {/* First row: Name, Email, Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Name <span className="text-[#D0252D]">*</span>
                          </label>
                          <input
                            type="text"
                            value={attendee.name}
                            onChange={(e) =>
                              updateAttendee(index, "name", e.target.value)
                            }
                            placeholder="Enter attendee name"
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address{" "}
                            <span className="text-[#D0252D]">*</span>
                          </label>
                          <input
                            type="email"
                            value={attendee.email}
                            onChange={(e) =>
                              updateAttendee(index, "email", e.target.value)
                            }
                            placeholder="Enter attendee email"
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone <span className="text-[#D0252D]">*</span>
                          </label>
                          <input
                            type="tel"
                            value={attendee.phone}
                            maxLength={10}
                            onChange={(e) =>
                              updateAttendee(
                                index,
                                "phone",
                                e.target.value.replace(/\D/g, ""),
                              )
                            }
                            placeholder="Enter phone number"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* Second row: Company, Designation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Company <span className="text-[#D0252D]">*</span>
                          </label>
                          <input
                            type="text"
                            value={attendee.company}
                            onChange={(e) =>
                              updateAttendee(index, "company", e.target.value)
                            }
                            placeholder="Enter company name"
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Designation{" "}
                            <span className="text-[#D0252D]">*</span>
                          </label>
                          <input
                            type="text"
                            value={attendee.designation}
                            onChange={(e) =>
                              updateAttendee(
                                index,
                                "designation",
                                e.target.value,
                              )
                            }
                            placeholder="Enter designation"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Details Form */}
              <div>
                <h2 className="text-[#D0252d] font-bold text-xl mb-6 uppercase tracking-wide">
                  Billing Details
                </h2>

                <div className="space-y-5">
                  {/* Row 1: Full Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-[#D0252D]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            full_name: e.target.value,
                          }))
                        }
                        placeholder="Enter full name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address <span className="text-[#D0252D]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Enter email"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone and GST Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone <span className="text-[#D0252D]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        maxLength={10}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="Enter phone number"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        GST Number
                      </label>
                      <input
                        type="text"
                        value={formData.gst_number}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            gst_number: e.target.value.toUpperCase(),
                          }))
                        }
                        placeholder="Enter GST number"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Organization Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Organization Name{" "}
                      <span className="text-[#D0252D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firm_name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          firm_name: e.target.value,
                        }))
                      }
                      placeholder="Enter Organization name"
                      className={inputClass}
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Address <span className="text-[#D0252D]">*</span>
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="Enter address"
                      rows={3}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-[#D0252D] focus:border-transparent outline-none text-[13px] transition-shadow resize-y"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Country / Region <span className="text-[#D0252D]">*</span>
                    </label>
                    <div className="relative">
                      <Select
                        name="country_id"
                        options={countryOptions}
                        value={countryOptions.find(
                          (option) => option.value === formData.country_id,
                        )}
                        onChange={(selected) => {
                          if (!selected) return;

                          setFormData((prev) => ({
                            ...prev,
                            country: selected.label,
                            country_id: selected.value,
                            state: "",
                            state_id: null,
                            city: "",
                            city_id: null,
                          }));

                          fetchStates(selected.value);
                        }}
                        placeholder="Select Country"
                        isSearchable
                      />
                      <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#8D93A0] pointer-events-none" />
                    </div>
                  </div>

                  {/* State, City, and Pincode */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        State <span className="text-[#D0252D]">*</span>
                      </label>
                      <Select
                        name="state_id"
                        options={stateOptions}
                        value={
                          stateOptions.find(
                            (option) => option.value === formData.state_id,
                          ) || null
                        }
                        onChange={(selected) => {
                          if (!selected) return;

                          setFormData((prev) => ({
                            ...prev,
                            state: selected.label,
                            state_id: selected.value,
                            city: "",
                            city_id: null,
                          }));

                          fetchCities(selected.value);
                        }}
                        placeholder="Select State"
                        isSearchable
                        isDisabled={!selectedCountryId}
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        City <span className="text-[#D0252D]">*</span>
                      </label>
                      <Select
                        name="city_id"
                        options={cityOptions}
                        value={
                          cityOptions.find(
                            (option) => option.value === formData.city_id,
                          ) || null
                        }
                        onChange={(selected) => {
                          if (!selected) return;

                          setFormData((prev) => ({
                            ...prev,
                            city: selected.label,
                            city_id: selected.value,
                          }));
                        }}
                        placeholder="Select City"
                        isSearchable
                        isDisabled={!selectedStateId}
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Pincode <span className="text-[#D0252D]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        maxLength={6}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            pincode: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="Enter pincode"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                <h3 className="text-[#D0252d] font-bold text-base uppercase tracking-tight mb-4">
                  In Case of Any Assistance WRT Your Purchase
                </h3>
                <div className="text-sm space-y-3 text-[#333]">
                  <p>
                    <span className="font-medium">Bhupinder Kaur</span> |
                    +91-9654155065 | bhupinder@witnesslive.in
                  </p>
                  <p>
                    <span className="font-medium">Neelima Maheshwari</span> |
                    +91-8800841600 | neelima.maheshwari@witnesslive.in
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Your Order - Sticky/Fixed Position */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-[100px]">
                <h2 className="text-[#D0252d] font-bold text-[21px] leading-6 mb-4 uppercase">
                  Your Order
                </h2>

                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <table className="min-w-[300px] w-full border-collapse">
                    <thead>
                      <tr className="bg-[#D0252D] text-white">
                        <th className="px-4 py-3 font-semibold uppercase text-sm border border-[#D0252D] text-left">
                          Product
                        </th>
                        <th className="px-4 py-3 font-semibold uppercase text-sm border border-[#D0252D] text-right">
                          Subtotal
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-sm">
                      {cartItems.map((item) => (
                        <tr key={item.plan_id}>
                          <td className="px-4 py-2 font-normal text-[#333] border border-gray-200">
                            {item.plan_name}
                            <span className="font-bold">
                              {" "}
                              × {item.quantity}
                            </span>
                          </td>

                          <td className="px-4 py-2 font-bold text-[#333] border border-gray-200 text-right">
                            ₹
                            {Number(item.price * item.quantity).toLocaleString(
                              "en-IN",
                            )}
                          </td>
                        </tr>
                      ))}

                      {cartTotal?.coupon && (
                        <tr>
                          <td className="px-4 py-2.5 font-bold border border-gray-200">
                            Coupon ({cartTotal.coupon.code})
                          </td>

                          <td className="px-4 py-2.5 font-bold border border-gray-200 text-right">
                            <div className="flex flex-col items-end">
                              <span className="text-green-600">
                                -₹
                                {Number(cartTotal.discount || 0).toLocaleString(
                                  "en-IN",
                                )}
                              </span>

                              <button
                                onClick={handleRemoveCoupon}
                                disabled={couponRemoving}
                                className="text-[#D12229] text-xs hover:underline mt-1 cursor-pointer"
                              >
                                {couponRemoving ? <MiniLoader /> : "Remove"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td className="px-4 py-2.5 font-bold text-[#333] border border-gray-200">
                          GST ({cartTotal?.gst_percent || 18}%)
                        </td>

                        <td className="px-4 py-2.5 font-bold text-[#333] border border-gray-200 text-right">
                          ₹
                          {Number(cartTotal?.gst_amount || 0).toLocaleString(
                            "en-IN",
                          )}
                        </td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="px-4 py-3 font-bold text-base text-[#333] border border-gray-200">
                          Total
                        </td>

                        <td className="px-4 py-3 font-bold text-base text-[#333] border border-gray-200 text-right">
                          ₹
                          {Number(cartTotal?.total || 0).toLocaleString(
                            "en-IN",
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Payment Section - Inside the sticky container */}
                <div className="bg-[#816e9924] rounded-md mt-6 p-1">
                  <div className="rounded-md overflow-hidden">
                    <div className="p-5 flex items-center gap-2">
                      <span className="text-[#333] font-medium text-sm">
                        Credit Card/Debit Card/NetBanking
                      </span>
                      <img
                        src="/images/rzp_payment_icon.svg"
                        className="h-6 md:h-8 w-auto ml-auto"
                        alt="Razorpay"
                      />
                    </div>

                    <div className="mx-5 p-4 bg-gray-200 text-[#333] text-xs relative rounded">
                      <div className="absolute -top-2 left-6 w-3 h-3 bg-gray-200 rotate-45"></div>
                      Pay securely by Credit or Debit card or Internet Banking
                      through Razorpay.
                    </div>
                  </div>
                  <hr className="border-gray-300 mt-6" />

                  {/* Footer Actions */}
                  <div className="mt-6 pb-4">
                    <p className="text-xs text-[#555] leading-relaxed px-5">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <span className="text-[#D0252D] font-medium">
                        privacy policy
                      </span>
                      .
                    </p>
                    <div className="flex justify-end mt-4 px-5">
                      <button
                        type="button"
                        onClick={handleOrder}
                        disabled={loading}
                        className="font-roboto cursor-pointer leading-4 bg-[#D0252D] text-white px-8 py-3 font-bold text-[15px] rounded-md disabled:opacity-50 hover:bg-[#b01e24] transition-colors"
                      >
                        {loading ? "Processing..." : "Place Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
