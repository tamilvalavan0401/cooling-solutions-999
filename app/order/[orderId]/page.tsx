"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock, ArrowLeft, Package, RefreshCw } from "lucide-react";
import { getOrder, GetOrderResponse } from "@/app/api/products/services/api";

export const runtime = 'edge';

const DEFAULT_USER_CODE = "CUS6647BJQ";


export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [orderData, setOrderData] = useState<GetOrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderStatus = async () => {
    if (!orderId) {
      setError("Order ID not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await getOrder(DEFAULT_USER_CODE, orderId);
      setOrderData(response);
    } catch (err: any) {
      console.error("Error fetching order:", err);
      setError(err.response?.data?.message || "Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderStatus();
  }, [orderId]);

  const getStatusIcon = () => {
    if (!orderData) return null;

    const paymentStatus = orderData.payment_status?.toLowerCase();

    if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
      return <CheckCircle className="w-16 h-16 text-green-500" />;
    } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
      return <Clock className="w-10 h-10 text-yellow-500" />;
    } else if (paymentStatus === "failed" || paymentStatus === "error") {
      return <XCircle className="w-10 h-10 text-red-500" />;
    }
    return <Package className="w-10 h-10 text-gray-500" />;
  };

  const getStatusColor = () => {
    if (!orderData) return "text-gray-600";

    const paymentStatus = orderData.payment_status?.toLowerCase();

    if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
      return "text-green-600";
    } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
      return "text-yellow-600";
    } else if (paymentStatus === "failed" || paymentStatus === "error") {
      return "text-red-600";
    }
    return "text-gray-600";
  };

  const getStatusBgColor = () => {
    if (!orderData) return "bg-gray-50";

    const paymentStatus = orderData.payment_status?.toLowerCase();

    if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
      return "bg-green-50";
    } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
      return "bg-yellow-50";
    } else if (paymentStatus === "failed" || paymentStatus === "error") {
      return "bg-red-50";
    }
    return "bg-gray-50";
  };

  const getStatusTitle = () => {
    if (!orderData) return "Order Status";

    const paymentStatus = orderData.payment_status?.toLowerCase();

    if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
      return "Payment Successful!";
    } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
      return "Payment Processing";
    } else if (paymentStatus === "failed" || paymentStatus === "error") {
      return "Payment Failed";
    }
    return "Order Status";
  };

  const getStatusBadgeColor = () => {
    if (!orderData) return "bg-gray-100 text-gray-700";

    const paymentStatus = orderData.payment_status?.toLowerCase();

    if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
      return "bg-green-100 text-green-700";
    } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
      return "bg-yellow-100 text-yellow-700";
    } else if (paymentStatus === "failed" || paymentStatus === "error") {
      return "bg-red-100 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchOrderStatus}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-[#4a7520] transition"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        {/* <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button> */}

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className={`${getStatusBgColor()} p-4 text-center`}>
            <div className="flex justify-center">
              {getStatusIcon()}
            </div>
            <h1 className={`text-xl font-bold ${getStatusColor()}`}>
              {getStatusTitle()}
            </h1>
            {/* {orderData?.message && (
              <p className="text-gray-600 mt-2">{orderData.message}</p>
            )} */}
          </div>

          {/* Order Details */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
            
            <div className="space-y-1">
              {/* Order ID */}
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Order ID</span>
                <span className="text-gray-900 font-semibold text-lg">{orderData?.order_id}</span>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Amount</span>
                <span className="text-gray-900 font-bold text-2xl text-primary">
                  ₹{orderData?.amount}
                </span>
              </div>

              {/* Payment Status */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Payment Status</span>
                <span className={`font-semibold capitalize px-4 py-2 rounded-full text-sm ${getStatusBadgeColor()}`}>
                  {orderData?.payment_status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={fetchOrderStatus}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Status
              </button>
              
              <button
                onClick={() => router.push("/")}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-[#4a7520] transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}