// HomeMain.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import banner from "@/public/images/banner.webp";
import heroleft from "@/public/images/heroleft.webp";
import img1 from "@/public/images/img1.webp";
import img2 from "@/public/images/img2.webp";
import img3 from "@/public/images/img3.webp";
import bgwave from "@/public/images/bgwave.png";

import Image from "next/image";
import SvgIcons from "./SvgIcon";
import CheckoutModal from "./CheckoutModal";
import { ToastContainer, useToast } from "./Toast";

// ── Types ─────────────────────────────────────────────────────────────────────
type Product = {
  id: string;
  name: string;
  price: string;
  mrp?: string;
  description?: string;
  image?: string;
  sku?: string;
  quantity?: number;
  weight_kg?: string;
  sort_order?: number;
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

// ── Contact Form Payload Type ─────────────────────────────────────────────────
type ContactFormPayload = {
  name: string;
  mobile: string;
  store_name: string;
  message: string;
};

// ── API Response Type ─────────────────────────────────────────────────────────
type ContactApiResponse = {
  status: "success" | "error";
  message: string;
};

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full">
      <Image src={banner} alt="" />
      <div className="absolute lg:-bottom-[100px] md:-bottom-[60px] sm:-bottom-[55px] -bottom-[40px] lg:left-[10%] md:left-[6%] left-[5%] z-10 ">
        <Image className="lg:w-[200px] md:w-[180px] sm:w-[120px] w-[80px]" src={heroleft} alt="" />
      </div>
    </section>
  );
}

// ── Business Card / Profile Section ──────────────────────────────────────────
function ProfileSection({ 
  onDownload, 
  onQrClick, 
  onShare 
}: { 
  onDownload: () => void; 
  onQrClick: () => void; 
  onShare: () => void;
}) {
  return (
    <section id="about" className="bg-white w-full lg:mt-[100px] md:mt-[100px] sm:mt-[70px] mt-[50px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-6 pt-4 pb-6 ">
          <div className="flex-1">
            <div className="mb-1">
              <span className="text-[32px]  text-primary font-[900] mr-4 font-big_noodle_titling tracking-wider uppercase">cooling solutions</span>{" "}
              <span className="text-[20px] font-600 text-[#000000]">Air Moving Products</span>
            </div>
            {/* <p className="text-[16px] text-[#707070] mb-2">
                Founder: {"{Customer Name}"}
              </p> */}
            <p className="text-[16px] text-[#2D2D2D] leading-relaxed mb-4 ">
              Cooling Solutions Chennai is a trusted distributor of high-performance ebmpapst and Hicool cooling fans <br className="hidden md:block" />   and blowers, serving diverse industrial and engineering sectors with reliable thermal management products.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={onDownload}
                className="flex items-center gap-1 py-[12px] px-[24px] text-white text-[16px] font-500 rounded-[8px] bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105"
              >
                <span>Download Card</span>
                <SvgIcons.Download/>
              </button>
              <button
                onClick={onQrClick}
                className=" p-[10px] flex items-center justify-center rounded-[8px] bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105"
              >
                <SvgIcons.Qr/>
              </button>
              <button
                onClick={onShare}
                className=" p-[10px] flex items-center justify-center rounded-[8px] bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105"
              >
                <SvgIcons.Share/>
              </button>
            </div> 
          </div>

          <div className=" flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
              <a href="#" className="transition-transform duration-300 hover:scale-110">
                <SvgIcons.Fb/>
              </a>
              <a href="#" className="transition-transform duration-300 hover:scale-110">
                <SvgIcons.Insta/>
              </a>
              <a href="#" target="blank" className="transition-transform duration-300 hover:scale-110">
                <SvgIcons.Whatsapp/>
              </a>
              <a href="#" className="transition-transform duration-300 hover:scale-110">
                <SvgIcons.Twitter/>
              </a>
            </div>

            <div className="rounded-lg p-[16px] text-sm space-y-2 bg-addresscard ">
              <div className="flex items-start gap-2">
                <div className="w-[24px] h-[24px]">
                <SvgIcons.Location/>
                </div>
                <p className="text-[#000000] text-[14px] font-medium leading-relaxed ">
                  No.3/8, Kalyani Ammal Street, <br /> Varadharajapuram, Ambattur,Chennai - 600 053.<br />
                  Tamil Nadu, India.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SvgIcons.Mail/>
                <a href="mailto:sales@coolingsolutionschennai.com" className="text-[#000000] text-[14px] font-medium leading-relaxed  ">
                  sales@coolingsolutionschennai.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <SvgIcons.Call/>
                <a href="tel:+919444407700" className="text-[#000000] text-[14px] font-medium leading-relaxed  ">
                  +91 94444 07700
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Registered Section ────────────────────────────────────────────────────────
function RegisteredSection() {
  return (
    <section className="bg-white py-8 w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-xl md:text-[42px] text-gray-900 mb-6 tracking-wider  font-[400] font-big_noodle_titling">
          Officially Registered &amp; Recognized
        </h2>
        <div className="relative overflow-hidden">
          <div className=" flex items-center justify-between gap-8 md:gap-16 px-[12px] py-[16px] rounded-[24px] mx-auto  border border-[#FCDDAD] bg-[#FFFBE8]">
           <div className="h-[120px] w-[5px] rounded-[4px] z-20 "
              style={{
                background: "linear-gradient(180deg, #F4AD38 0%, #F26D35 100%)",
              }}
            >
            </div>

            <div className="z-20 flex  justify-center mx-auto items-center lg:gap-x-[100px] md:gap-x-[60px] sm:gap-y-[0px] gap-y-[10px]">
            <Image src={img1} className="sm:w-[150px] w-[100px]" alt="img1" />
            <Image src={img2} className="sm:w-[150px] w-[100px]" alt="img2" />
            <Image src={img3} className="sm:w-[150px] w-[100px]" alt="img3" />
            </div>

            <div className="h-[120px] w-[5px] rounded-[4px] z-20"
              style={{
                background: "linear-gradient(180deg, #F4AD38 0%, #F26D35 100%)",
              }}
            >
            </div>
          </div>
          <div className="absolute sm:top-6 top-[50%] px-[8px] ">
            <Image className="px-[4px]" src={bgwave} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Products Section ──────────────────────────────────────────────────────────
function ProductsSection({
  products,
  loading,
  error,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onCheckout,
}: {
  products: Product[];
  loading: boolean;
  error: string | null;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onCheckout: () => void;
}) {
  const getCartItem = (productId: string): CartItem | undefined => {
    return cart.find((item) => item.id === productId);
  };

  return (
    <section id="products" className=" w-full bg-[#F8F9FC] py-[100px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-[42px] font-[400] tracking-wide font-big_noodle_titling text-gray-900 text-center   mb-[24px]">
          Our Products 
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              Retry Loading
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No products available</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {products.map((product) => {
                const cartItem = getCartItem(product.id.toString());
                return (
                  <div
                    key={product.id}
                    className="bg-productcard p-[16px] rounded-[12px] overflow-hidden transition-shadow"
                  >
                    <div className="w-full h-[350px] overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-[8px] mt-[8px]">
                      <p className="text-[18px] font-medium text-[#000000] leading-snug truncate  ">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[18px] font-bold text-primary">
                            {product.price}
                          </span>
                          {product.mrp && (
                            <span className="text-[18px] text-[#000000]/70 line-through  ">
                              {product.mrp}
                            </span>
                          )}
                        </div>

                        {cartItem ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  product.id.toString(),
                                  cartItem.quantity - 1
                                )
                              }
                              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm hover:bg-gray-100 transition border border-gray-300"
                            >
                              -
                            </button>
                            <span className="font-semibold min-w-[28px] text-center text-sm">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  product.id.toString(),
                                  cartItem.quantity + 1
                                )
                              }
                              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sm hover:bg-gray-100 transition border border-gray-300"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddToCart(product)}
                            className="text-white text-[16px] px-[24px] py-[12px] bg-primary hover:bg-primary/70 rounded-[8px] font-medium transition-all duration-300 hover:scale-105"
                          >
                            Buy Product
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {cart.length > 0 && (
              <div className="flex justify-center mt-12 sticky md:static bottom-4">
                <button
                  onClick={onCheckout}
                  className="bg-primary font-semibold text-white px-8 py-3 rounded-lg hover:bg-opacity-90 hover:scale-105 transition shadow-lg text-lg"
                >
                  Checkout ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
function ContactSection({
  onSuccess,
  onError,
}: {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DEFAULT_STORE_NAME = "sales@coolingsolutionschennai.com";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(form.mobile.trim())) {
      newErrors.mobile = "Enter valid 10-digit mobile";
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const payload: ContactFormPayload = {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        store_name: DEFAULT_STORE_NAME,
        message: form.message.trim(),
      };

      const response = await axios.post<ContactApiResponse>(
        "https://clientconnect.vilvabusiness.com/api/contact-us/submit-form-request",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        onSuccess(response.data.message);
        setForm({ name: "", mobile: "", message: "" });
      } else {
        onError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error("Contact form submission error:", err);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      onError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-12 w-full">
      <div className="max-w-lg mx-auto px-6">
        <h2 className="text-2xl md:text-[42px] font-[400] tracking-wide font-big_noodle_titling text-gray-900 text-center mb-8  ">
          Let&apos;s Talk Business
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[16px] font-semibold text-[#000000] mb-[6px]">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className={`w-full border rounded-[12px] px-[12px] py-[10px] text-[16px] text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/60 transition-colors ${
                errors.name ? "border-red-500" : "border-[#E9E9EC]"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-[#000000] mb-[6px]">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile"
              maxLength={10}
              className={`w-full border rounded-[12px] px-[12px] py-[10px] text-[16px] text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/60 transition-colors ${
                errors.mobile ? "border-red-500" : "border-[#E9E9EC]"
              }`}
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-[#000000] mb-[6px]">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter Message"
              rows={4}
              className={`w-full border rounded-[12px] px-[12px] py-[10px] text-[16px] text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/60 transition-colors resize-none ${
                errors.message ? "border-red-500" : "border-[#E9E9EC]"
              }`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white font-medium py-[10px] rounded-[8px] text-[16px] transition-all duration-300 hover:scale-105 mt-1 bg-primary hover:bg-primary/70 disabled:opacity-60 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

// ── QR Modal ──────────────────────────────────────────────────────────────────
function QRModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg relative max-w-xs">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl leading-none"
        >
          &times;
        </button>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Scan QR Code</h3>
          <div className="w-48 h-48 mx-auto bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">Scan to visit this page</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function HomeMain() {
  const [showQR, setShowQR] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [states, setStates] = useState<State[]>([]);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([]);

  // Toast Hook
  const toast = useToast();

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/products", {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();
        console.log('Fetched products result:', result);
        
        if (result.success && result.data) {
          setProducts(result.data);
          if (result.payment_gateways && Array.isArray(result.payment_gateways)) {
            setPaymentGateways(result.payment_gateways);
          }
        } else {
          setError(result.message || "No products available");
        }
      } catch (err: any) {
        console.error("Products fetch error:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Fetch States for Checkout
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/ecomsaas/redisapi/states.json"
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };
    fetchStates();
  }, []);

  // Download Handler
  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/images/heroleft.webp";
    link.download = "Thaithingal-Card.webp";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Card downloaded successfully!");
  }, [toast]);

  // Share Handler
  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Cooling Solutions",
      text: "Cooling Solutions | Advanced Climate Control Services",
      url: window.location.href,
    };
    
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.warn("Share failed", err);
        }
      }
    }
    
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      prompt("Copy this link:", window.location.href);
    }
  }, [toast]);

  // Add to Cart
  const addToCart = useCallback((product: Product) => {
    const productId = product.id.toString();
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: productId,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]);
    }
    
    toast.success(`${product.name} added to cart!`);
  }, [cart, toast]);

  // Update Quantity
  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart((prev) => {
      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  // Handle Checkout
  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }
    setIsCheckoutModalOpen(true);
  }, [cart, toast]);

  // Contact Form Handlers
  const handleContactSuccess = useCallback((message: string) => {
    toast.success(message);
  }, [toast]);

  const handleContactError = useCallback((message: string) => {
    toast.error(message);
  }, [toast]);

  // Checkout Handlers
  const handleCheckoutSuccess = useCallback((message: string) => {
    toast.success(message);
  }, [toast]);

  const handleCheckoutError = useCallback((message: string) => {
    toast.error(message);
  }, [toast]);

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Toast Container */}
      <ToastContainer
        toasts={toast.toasts}
        onClose={toast.removeToast}
        position="top-right"
      />

      <HeroSection />
      <ProfileSection 
        onDownload={handleDownload}
        onQrClick={() => setShowQR(true)}
        onShare={handleShare}
      />
      <div className="w-full my-[12px] h-[1.5px] bg-[linear-gradient(90deg,_rgba(218,228,252,0)_0%,_#DAE4FC_50%,_rgba(218,228,252,0)_100%)]"></div>
      <RegisteredSection />
      <ProductsSection 
        products={products}
        loading={loading}
        error={error}
        cart={cart}
        onAddToCart={addToCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
      <ContactSection 
        onSuccess={handleContactSuccess}
        onError={handleContactError}
      />

      {/* QR Modal */}
      <QRModal isOpen={showQR} onClose={() => setShowQR(false)} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cart={cart}
        states={states}
        products={products}
        paymentGateways={paymentGateways}
        onUpdateCart={setCart}
        onSuccess={handleCheckoutSuccess}
        onError={handleCheckoutError}
      />
    </main>
  );
}