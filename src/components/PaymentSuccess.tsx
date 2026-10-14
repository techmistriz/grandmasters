import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const payment = location.state;

  const downloadReceipt = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("PAYMENT RECEIPT", 14, 20);

    pdf.setFontSize(10);
    pdf.text("Thank you for your purchase", 14, 28);

    autoTable(pdf, {
      startY: 40,
      head: [["Field", "Value"]],
      body: [
        ["Order Number", payment.order_number],
        ["Order ID", payment.order_id],
        ["Transaction ID", payment.transaction_id],
        ["Payment Status", payment.payment_status],
        [
          "Amount Paid",
          `INR ${Number(payment.payment_amount).toLocaleString("en-IN")}`,
        ],
        ["Gateway Order ID", payment.gateway_order_id],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [208, 37, 45], // #D0252D
      },
    });

    const finalY = (pdf as any).lastAutoTable.finalY || 100;

    pdf.setFontSize(10);
    pdf.text(
      "This receipt confirms that your payment was successfully processed.",
      14,
      finalY + 15,
    );

    pdf.save(`receipt-${payment.order_number}.pdf`);
  };

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#D0252D] mb-3">
            No Payment Data Found
          </h2>

          <p className="text-[#333] mb-4">
            This page can only be accessed after a successful payment.
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-[#D0252D] text-white px-5 py-2 rounded cursor-pointer"
          >
            Go To Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-[#f5f5f5] flex items-center justify-center px-4 py-6">
      <div
        id="receipt-content"
        className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#D0252D] text-white text-center py-6 px-4">
          <CheckCircle size={52} className="mx-auto mb-2" />

          <h1 className="text-2xl font-bold">Payment Successful</h1>

          <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mt-2">
            Payment Verified
          </div>

          {/* <p className="mt-2 text-sm opacity-90">Thank you for your purchase</p> */}
        </div>

        {/* Receipt Body */}
        <div className="p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#D0252D]">
              Payment Receipt
            </h2>

            <p className="text-sm text-gray-500">
              Generated after successful payment verification
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-300">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border p-3 font-semibold bg-gray-50 w-[40%]">
                    Order Number
                  </td>
                  <td className="border p-3">{payment.order_number}</td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold bg-gray-50">
                    Order ID
                  </td>
                  <td className="border p-3">{payment.order_id}</td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold bg-gray-50">
                    Transaction ID
                  </td>
                  <td className="border p-3">{payment.transaction_id}</td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold bg-gray-50">
                    Payment Status
                  </td>

                  <td className="border p-3 font-semibold text-green-600">
                    {payment.payment_status}
                  </td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold bg-gray-50">
                    Amount Paid
                  </td>
                  {/* <div className="flex justify-between border-b py-2">
                <span className="font-medium">Amount Paid</span>
                <span className="font-sans">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(Number(payment.payment_amount))}
                </span>
              </div> */}

                  <td className="border p-3 font-bold">
                    <span className="font-sans">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(Number(payment.payment_amount))}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold bg-gray-50">
                    Gateway Order ID
                  </td>

                  <td className="border p-3">{payment.gateway_order_id}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Note */}
          <div className="mt-5 text-xs text-gray-500">
            This receipt confirms that your payment has been successfully
            processed and verified.
          </div>

          {/* Actions */}
          <div
            id="receipt-actions"
            className="flex flex-col sm:flex-row gap-3 mt-6"
          >
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-[#D0252D] text-white py-3 rounded-md font-semibold hover:opacity-90 transition cursor-pointer"
            >
              Back To Home
            </button>

            <button
              onClick={downloadReceipt}
              className="flex-1 border border-[#D0252D] text-[#D0252D] py-3 rounded-md font-semibold hover:bg-[#D0252D] hover:text-white transition cursor-pointer"
            >
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
