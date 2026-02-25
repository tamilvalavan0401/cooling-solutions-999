// components/CheckoutModal.tsx
"use client";
import { CircleX, CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";
import Image from "next/image";
import razorpay from "@/public/images/razorpay.png";
import vilvapay from "@/public/images/vilvapay.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchShipping,
  createOrder,
  getOrder,
  FetchShippingPayload,
  CreateOrderPayload,
  FetchShippingResponse,
  CreateOrderResponse,
  GetOrderResponse,
} from "../api/products/services/api";



type Product = {
  id: string;
  name: string;
  price: string;
  image?: string;
  weight_kg?: string;
};

type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
};

type State = {
  id: number;
  name: string;
  countryid: number;
};

type PaymentGateway = {
  id: number;
  name: string;
  description: string;
};

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  states: State[];
  products: Product[];
  paymentGateways: PaymentGateway[];
  onUpdateCart: (updatedCart: CartItem[]) => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
};

// Default User Code - Replace with actual user code from your auth system
const DEFAULT_USER_CODE = "CUS6647BJQ";

// Payment Gateway Icon Component
const PaymentGatewayIcon = ({ name }: { name: string }) => {
  if (name.toLowerCase().includes("razorpay")) {
    return <Image className="w-[50px]" src={razorpay} alt="Razorpay" />;
  }
  if (name.toLowerCase().includes("vilva")) {
    return <Image className="w-[40px]" src={vilvapay} alt="VilvaPay" />;
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
      <CreditCard className="w-5 h-5 text-gray-600" />
    </div>
  );
};

// Payment Status Modal Component
interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: GetOrderResponse | null;
  isLoading: boolean;
  onViewOrder?: () => void;
}

function PaymentStatusModal({ 
  isOpen, 
  onClose, 
  orderData, 
  isLoading,
  onViewOrder 
}: PaymentStatusModalProps) {
  if (!isOpen) return null;

  const getStatusIcon = () => {
    if (isLoading) {
      return (
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      );
    }

    if (!orderData) {
      return (
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
      );
    }

    if (orderData.status) {
      const paymentStatus = orderData.payment_status?.toLowerCase();

      if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
        return (
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        );
      } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
        return (
          <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-12 h-12 text-yellow-500" />
          </div>
        );
      } else {
        return (
          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-12 h-12 text-orange-500" />
          </div>
        );
      }
    }

    return (
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <XCircle className="w-12 h-12 text-red-500" />
      </div>
    );
  };

  const getStatusColor = () => {
    if (!orderData) return "text-red-600";
    if (orderData.status) {
      const paymentStatus = orderData.payment_status?.toLowerCase();
      if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
        return "text-green-600";
      } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
        return "text-yellow-600";
      }
      return "text-orange-600";
    }
    return "text-red-600";
  };

  const getStatusBgColor = () => {
    if (!orderData) return "bg-red-50 border-red-200";
    if (orderData.status) {
      const paymentStatus = orderData.payment_status?.toLowerCase();
      if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
        return "bg-green-50 border-green-200";
      } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
        return "bg-yellow-50 border-yellow-200";
      }
      return "bg-orange-50 border-orange-200";
    }
    return "bg-red-50 border-red-200";
  };

  const getTitle = () => {
    if (isLoading) return "Checking Payment Status...";
    if (!orderData) return "Error";
    if (orderData.status) {
      const paymentStatus = orderData.payment_status?.toLowerCase();
      if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
        return "Payment Successful!";
      } else if (paymentStatus === "initiated" || paymentStatus === "pending") {
        return "Payment Processing";
      }
      return "Payment Status";
    }
    return "Payment Failed";
  };

  const isPaymentSuccess = orderData?.status && 
    (orderData.payment_status?.toLowerCase() === "paid" || 
     orderData.payment_status?.toLowerCase() === "success" || 
     orderData.payment_status?.toLowerCase() === "completed");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4">
      <div className="absolute inset-0" onClick={!isLoading ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className={`p-6 ${getStatusBgColor()} border-b`}>
          {getStatusIcon()}
          <h2 className={`text-2xl font-bold text-center ${getStatusColor()}`}>
            {getTitle()}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center">
              <p className="text-gray-600">Please wait while we verify your payment...</p>
            </div>
          ) : orderData ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Order ID</span>
                <span className="text-gray-900 font-semibold">{orderData.order_id}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Amount</span>
                <span className="text-gray-900 font-semibold text-lg">₹{orderData.amount}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Payment Status</span>
                <span className={`font-semibold capitalize px-3 py-1 rounded-full text-sm ${
                  orderData.payment_status?.toLowerCase() === "paid" ||
                  orderData.payment_status?.toLowerCase() === "success" ||
                  orderData.payment_status?.toLowerCase() === "completed"
                    ? "bg-green-100 text-green-700"
                    : orderData.payment_status?.toLowerCase() === "initiated" ||
                      orderData.payment_status?.toLowerCase() === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {orderData.payment_status}
                </span>
              </div>
              {orderData.message && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm text-center">{orderData.message}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-red-600">Unable to fetch order status. Please try again.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-3">
            {isPaymentSuccess && onViewOrder && (
              <button
                onClick={onViewOrder}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-green-600 hover:bg-green-700 text-white"
              >
                View Order Details
              </button>
            )}
            <button
              onClick={onClose}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                isPaymentSuccess
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              {isPaymentSuccess ? "Continue Shopping" : "Close"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  states,
  products,
  paymentGateways,
  onUpdateCart,
  onSuccess,
  onError,
}: CheckoutModalProps) {
  const router = useRouter();
  const [localCart, setLocalCart] = useState<CartItem[]>(cart);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    state_id: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [shippingAmount, setShippingAmount] = useState<string>("0.00");
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<number | null>(null);

  // Payment Status Modal State
  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState(false);
  const [paymentStatusData, setPaymentStatusData] = useState<GetOrderResponse | null>(null);
  const [paymentStatusLoading, setPaymentStatusLoading] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string>("");

  const indianStates = states.filter((state) => state.countryid === 1);

  useEffect(() => {
    if (paymentGateways.length > 0 && selectedPaymentGateway === null) {
      setSelectedPaymentGateway(paymentGateways[0].id);
    }
  }, [paymentGateways, selectedPaymentGateway]);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      if (typeof window !== "undefined" && !window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          console.log("✅ Razorpay SDK loaded");
        };
        script.onerror = () => {
          console.error("❌ Failed to load Razorpay SDK");
        };
        document.body.appendChild(script);
      }
    };
    loadRazorpay();
  }, []);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePaymentGatewayChange = (gatewayId: number) => {
    setSelectedPaymentGateway(gatewayId);
    if (errors.payment_gateway) {
      setErrors((prev) => ({ ...prev, payment_gateway: "" }));
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = localCart
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
      .filter((item) => item.quantity > 0);
    setLocalCart(updated);
    onUpdateCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = localCart.filter((item) => item.id !== id);
    setLocalCart(updated);
    onUpdateCart(updated);
  };

  const calculateProductAmount = () => {
    return localCart
      .reduce((sum, item) => {
        const price = parseFloat(item.price.replace("₹", "").trim() || "0");
        return sum + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotalAmount = () => {
    const productAmount = parseFloat(calculateProductAmount());
    const shipping = parseFloat(shippingAmount || "0");
    return (productAmount + shipping).toFixed(2);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (formData.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile Number is required";
    else if (!/^\d{10}$/.test(formData.mobile.trim()))
      newErrors.mobile = "Mobile must be 10 digits";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode.trim()))
      newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.address1.trim()) newErrors.address1 = "Address Line 1 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    else if (!/^[a-zA-Z ]+$/.test(formData.city.trim()))
      newErrors.city = "City should contain only letters and spaces";
    if (!formData.state_id) newErrors.state_id = "State is required";
    if (!selectedPaymentGateway)
      newErrors.payment_gateway = "Please select a payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getProductWeight = (productId: string): string => {
    const product = products.find((p) => p.id === productId);
    return product?.weight_kg || "0.500";
  };

  const checkPaymentStatus = async (orderId: string) => {
    const userCode = DEFAULT_USER_CODE;
    setPaymentStatusLoading(true);
    setShowPaymentStatusModal(true);
    setPaymentStatusData(null);
    setCurrentOrderId(orderId);

    try {
      const response: GetOrderResponse = await getOrder(userCode, orderId);
      setPaymentStatusData(response);

      if (response.status) {
        const paymentStatus = response.payment_status?.toLowerCase();
        if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
          onUpdateCart([]);
          onSuccess?.("Payment completed successfully!");
        }
      }
    } catch (error: any) {
      console.error("Error checking payment status:", error);
      setPaymentStatusData({
        status: false,
        order_id: orderId,
        amount: "0.00",
        payment_status: "error",
        message: error.response?.data?.message || "Failed to fetch payment status",
      });
      onError?.("Failed to verify payment status");
    } finally {
      setPaymentStatusLoading(false);
    }
  };

  const handleViewOrder = () => {
    if (currentOrderId) {
      setShowPaymentStatusModal(false);
      onClose();
      router.push(`/order/${currentOrderId}`);
    }
  };

  const handlePaymentStatusModalClose = () => {
    setShowPaymentStatusModal(false);
    setPaymentStatusData(null);
    setPaymentStatusLoading(false);

    if (paymentStatusData?.status) {
      const paymentStatus = paymentStatusData.payment_status?.toLowerCase();
      if (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed") {
        onClose();
      }
    }
  };

  // ✅ Check if response is for Razorpay payment
  const isRazorpayPayment = (response: CreateOrderResponse): boolean => {
    return !!(response.razorpay_id && response.razorpay_order_id);
  };

  // ✅ Check if response is for redirect-based payment (VilvaPay, etc.)
  const isRedirectPayment = (response: CreateOrderResponse): boolean => {
    return !!(response.redirect_url && !response.razorpay_id && !response.razorpay_order_id);
  };

  const handleProceed = async () => {
    if (localCart.length === 0) {
      onError?.("Your cart is empty!");
      return;
    }
    if (!validateForm()) return;

    setLoading(true);

    try {
      const userCode = DEFAULT_USER_CODE;

      // ═══════════════════════════════════════════════════════════════════════
      // STEP 1: Fetch Shipping
      // ═══════════════════════════════════════════════════════════════════════
      setLoadingStep("Calculating shipping...");

      const shippingPayload: FetchShippingPayload = {
        code: userCode,
        state_id: Number(formData.state_id),
        pincode: formData.pincode.trim(),
        products: localCart.map((item) => ({
          id: Number(item.id),
          qty: item.quantity,
        })),
      };

      const shippingResponse: FetchShippingResponse = await fetchShipping(shippingPayload);

      if (!shippingResponse.status) {
        throw new Error(shippingResponse.message || "Failed to calculate shipping");
      }

      const realShippingAmount = shippingResponse.shipping_amount;
      setShippingAmount(realShippingAmount);

      const productAmount = calculateProductAmount();
      const finalTotal = (
        parseFloat(productAmount) + parseFloat(realShippingAmount)
      ).toFixed(2);

      const selectedState = indianStates.find((s) => s.id === Number(formData.state_id));

      // ═══════════════════════════════════════════════════════════════════════
      // STEP 2: Create Order
      // ═══════════════════════════════════════════════════════════════════════
      setLoadingStep("Creating order...");

      const orderPayload: CreateOrderPayload = {
        code: userCode,
        gateway_id: selectedPaymentGateway!,
        state_id: Number(formData.state_id),
        shipping_amount: realShippingAmount,
        product_amount: productAmount,
        total_amount: finalTotal,
        address: {
          name: formData.name.trim(),
          email: formData.email.trim() || "",
          mobile: formData.mobile.trim(),
          address1: formData.address1.trim(),
          address2: formData.address2.trim() || "",
          city: formData.city.trim(),
          state: selectedState?.name || "",
          state_id: Number(formData.state_id),
          pincode: formData.pincode.trim(),
        },
        products: localCart.map((item) => ({
          id: Number(item.id),
          qty: item.quantity,
          name: item.name,
          price: parseFloat(item.price.replace("₹", "").trim()).toFixed(2),
          weight_kg: getProductWeight(item.id),
        })),
      };

      const orderResponse: CreateOrderResponse = await createOrder(orderPayload);

      // console.log("Order response:", orderResponse);

      if (!orderResponse.status) {
        throw new Error(orderResponse.message || "Failed to create order");
      }

      const orderId = orderResponse.order_id;
      setCurrentOrderId(orderId);

      // console.log("✅ Order created successfully:");
      // console.log("  - Order ID:", orderId);
      // console.log("  - Gateway ID:", selectedPaymentGateway);

      // ═══════════════════════════════════════════════════════════════════════
      // STEP 3: Handle Payment Based on Gateway Type
      // ═══════════════════════════════════════════════════════════════════════

      // ✅ CASE 1: Redirect-based payment (VilvaPay, etc.)
      if (isRedirectPayment(orderResponse)) {
        // console.log("📌 Redirect Payment Gateway detected (VilvaPay)");
        // console.log("  - Redirect URL:", orderResponse.redirect_url);

        setLoadingStep("Redirecting to payment gateway...");

        // Clear cart before redirect
        onUpdateCart([]);
        
        // Redirect to payment gateway URL
        window.location.href = orderResponse.redirect_url;
        return;
      }

      // ✅ CASE 2: Razorpay payment
      if (isRazorpayPayment(orderResponse)) {
        const razorpayOrderId = orderResponse.razorpay_order_id!;
        const razorpayKey = orderResponse.razorpay_id!;

        // console.log("📌 Razorpay Payment Gateway detected");
        // console.log("  - Razorpay Order ID:", razorpayOrderId);
        // console.log("  - Razorpay Key:", razorpayKey);

        // Validate Razorpay response
        if (!razorpayOrderId.startsWith("order_")) {
          throw new Error("Invalid Razorpay order ID received from server");
        }

        if (!razorpayKey.startsWith("rzp_")) {
          throw new Error("Invalid Razorpay key received from server");
        }

        setLoadingStep("Initializing payment...");

        const razorpayOptions = {
          key: razorpayKey,
          order_id: razorpayOrderId,
          name: "Thingal Essential",
          description: `Order Payment - ${orderId}`,
          handler: async function (response: any) {
            // console.log("✅ Payment successful!", response);
            setLoading(false);
            setLoadingStep("");
            
            // Clear cart and redirect to order page
            onUpdateCart([]);
            onSuccess?.("Payment completed successfully!");
            onClose();
            router.push(`/order/${orderId}`);
          },
          prefill: {
            name: formData.name.trim(),
            email: formData.email.trim() || "",
            contact: formData.mobile.trim(),
          },
          notes: {
            order_id: orderId,
            customer_code: userCode,
          },
          theme: {
            color: "#639A28",
          },
          modal: {
            ondismiss: async function () {
              // console.log("⚠️ Razorpay modal dismissed");
              setLoading(false);
              setLoadingStep("");
              await checkPaymentStatus(orderId);
            },
          },
        };

        if (typeof window !== "undefined" && window.Razorpay) {
          const rzp = new window.Razorpay(razorpayOptions);

          rzp.on("payment.failed", async function (response: { error: any }) {
            console.error("❌ Payment failed!", response.error);
            setLoading(false);
            setLoadingStep("");
            await checkPaymentStatus(orderId);
          });

          rzp.open();
        } else {
          throw new Error("Razorpay SDK not loaded. Please refresh the page.");
        }

        return;
      }

      // ✅ CASE 3: Unknown payment gateway - fallback to redirect if available
      if (orderResponse.redirect_url) {
        // console.log("📌 Unknown gateway - falling back to redirect");
        // console.log("  - Redirect URL:", orderResponse.redirect_url);

        setLoadingStep("Redirecting to payment...");
        onUpdateCart([]);
        window.location.href = orderResponse.redirect_url;
        return;
      }

      // No valid payment method found
      throw new Error("No valid payment method found in server response");

    } catch (error: any) {
      console.error("❌ Checkout error:", error);

      let errorMessage = "An error occurred during checkout. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      onError?.(errorMessage);
      setLoading(false);
      setLoadingStep("");
    }
  };

  if (!isOpen) return null;

  const productAmount = calculateProductAmount();
  const totalAmount = calculateTotalAmount();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-primary">Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
              disabled={loading}
            >
              <CircleX size={28} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form */}
              <form className="w-full lg:w-1/2 order-1">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number *"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength={10}
                        disabled={loading}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary ${
                          errors.mobile ? "border-red-500" : "border-gray-300"
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      />
                      {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode *"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        disabled={loading}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary ${
                          errors.pincode ? "border-red-500" : "border-gray-300"
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="address1"
                        placeholder="Address Line 1 *"
                        value={formData.address1}
                        onChange={handleChange}
                        disabled={loading}
                        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary ${
                          errors.address1 ? "border-red-500" : "border-gray-300"
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      />
                      {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="address2"
                        placeholder="Address Line 2 (optional)"
                        value={formData.address2}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="city"
                          placeholder="City *"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={loading}
                          className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <select
                          name="state_id"
                          value={formData.state_id}
                          onChange={handleChange}
                          disabled={loading}
                          className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary bg-white ${
                            errors.state_id ? "border-red-500" : "border-gray-300"
                          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                        >
                          <option value="">Select State *</option>
                          {indianStates.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                        {errors.state_id && (
                          <p className="text-red-500 text-sm mt-1">{errors.state_id}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                    <div className="space-y-3">
                      {paymentGateways.length > 0 ? (
                        paymentGateways.map((gateway) => (
                          <label
                            key={gateway.id}
                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                              selectedPaymentGateway === gateway.id
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                          >
                            <div className="flex-shrink-0">
                              <input
                                type="radio"
                                name="payment_gateway"
                                value={gateway.id}
                                checked={selectedPaymentGateway === gateway.id}
                                onChange={() => handlePaymentGatewayChange(gateway.id)}
                                disabled={loading}
                                className="w-5 h-5 text-primary border-gray-300 cursor-pointer"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900">{gateway.name}</p>
                              <p className="text-sm text-gray-500 mt-0.5">{gateway.description}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <PaymentGatewayIcon name={gateway.name} />
                            </div>
                          </label>
                        ))
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                          <p>Loading payment methods...</p>
                        </div>
                      )}
                    </div>
                    {errors.payment_gateway && (
                      <p className="text-red-500 text-sm mt-2">{errors.payment_gateway}</p>
                    )}
                  </div>
                </div>
              </form>

              {/* Your Order */}
              <div className="w-full lg:w-1/2 order-2">
                <h3 className="text-lg font-semibold mb-4">Your Order</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {localCart.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                  ) : (
                    localCart.map((item) => {
                      const product = products.find((p) => p.id === item.id);
                      const itemTotal =
                        parseFloat(item.price.replace("₹", "").trim() || "0") * item.quantity;
                      return (
                        <div key={item.id} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                          {(product?.image || item.image) && (
                            <div className="w-20 h-20 flex-shrink-0">
                              <img
                                src={product?.image || item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={loading}
                                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                −
                              </button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={loading}
                                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                +
                              </button>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                disabled={loading}
                                className="ml-auto text-red-500 text-sm hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Remove
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {item.price} × {item.quantity} ={" "}
                              <span className="font-bold">₹{itemTotal.toFixed(2)}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Total & Button */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <div className="space-y-1">
                <p className="text-gray-600">
                  Product Total:{" "}
                  <span className="font-semibold text-gray-900">₹{productAmount}</span>
                </p>
                <p className="text-gray-600">
                  Shipping:{" "}
                  <span className="font-semibold text-gray-900">₹{shippingAmount}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-primary">₹{totalAmount}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleProceed}
              disabled={loading || localCart.length === 0}
              className="w-full bg-primary text-white font-semibold py-4 rounded-lg hover:bg-[#4a7520] disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{loadingStep || "Processing..."}</span>
                </>
              ) : (
                "Proceed to Pay"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Status Modal */}
      <PaymentStatusModal
        isOpen={showPaymentStatusModal}
        onClose={handlePaymentStatusModalClose}
        orderData={paymentStatusData}
        isLoading={paymentStatusLoading}
        onViewOrder={handleViewOrder}
      />
    </>
  );
}