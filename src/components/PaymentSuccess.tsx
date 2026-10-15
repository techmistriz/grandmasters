import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import autoTable from "jspdf-autotable";

interface PaymentData {
  order_number: string;
  order_id: string;
  transaction_id: string;
  payment_status: string;
  payment_amount: number | string;
  gateway_order_id: string;
}

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const payment = location.state as PaymentData | null;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  if (!payment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#002b5c]">
            Order details not found
          </h1>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 inline-flex rounded-[4px] bg-[#D0252D] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Go To Checkout
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mt-15 flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f7f8fa] px-4 py-6">
      <div className="w-full max-w-[620px]">
        <div
          id="receipt-content"
          className="rounded-[8px] bg-white p-5 shadow-sm sm:p-7"
        >
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle
                size={30}
                className="text-green-600"
                strokeWidth={2.5}
              />
            </div>

            <h1 className="mt-3 text-[24px] font-bold text-[#D0252D]">
              Thank You!
            </h1>

            <p className="mt-1 text-[13px] text-[#666]">
              Your payment has been successfully verified.
            </p>
          </div>

          {/* Order and Customer Details */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailCard
              title="Order Details"
              rows={[
                ["Order Number", payment.order_number],
                ["Order ID", payment.order_id],
                ["Transaction ID", payment.transaction_id],
                [
                  "Amount",
                  `INR ${Number(payment.payment_amount).toLocaleString("en-IN")}`,
                ],
                ["Status", payment.payment_status],
                ["Gateway Order ID", payment.gateway_order_id],
              ]}
            />

            <DetailCard
              title="Customer Details"
              rows={[
                ["Payment Status", payment.payment_status],
                ["Order Number", payment.order_number],
              ]}
            />
          </div>

          {/* Footer Note */}
          <p className="mt-5 text-[12px] text-[#777]">
            This receipt confirms that your payment was successfully processed
            and verified.
          </p>

          {/* Actions */}
          <div
            id="receipt-actions"
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              to="/"
              className="inline-flex h-[42px] items-center justify-center rounded-[4px] bg-[#D0252D] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

function DetailCard({
  title,
  rows,
}: {
  title: string;
  rows: [string, string | number][];
}) {
  return (
    <div className="rounded-[5px] border border-[#e1e4e8]">
      <div className="border-b border-[#e1e4e8] px-4 py-3">
        <h2 className="text-[15px] font-bold text-[#002b5c]">{title}</h2>
      </div>

      <div className="space-y-2.5 px-4 py-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-3 text-[12px]"
          >
            <span className="text-[#777]">{label}</span>

            <span className="max-w-[65%] break-words text-right font-medium text-[#333]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentSuccess;
