// api/products/services/api.ts
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

// Base URL
const BASE_URL = "https://clientconnect.vilvabusiness.com/api";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data || config.params);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ContactFormPayload {
  name: string;
  mobile: string;
  store_name: string;
  message: string;
}

export interface ContactFormResponse {
  status: "success" | "error";
  message: string;
}

export interface FetchShippingPayload {
  code: string;
  state_id: number;
  pincode: string;
  products: Array<{
    id: number;
    qty: number;
  }>;
}

export interface FetchShippingResponse {
  status: boolean;
  shipping_amount: string;
  total_qty: number;
  total_weight_kg: number;
  message?: string;
}

export interface CreateOrderPayload {
  code: string;
  gateway_id: number;
  state_id: number;
  shipping_amount: string;
  product_amount: string;
  total_amount: string;
  address: {
    name: string;
    email: string;
    mobile: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    state_id: number;
    pincode: string;
  };
  products: Array<{
    id: number;
    qty: number;
    name: string;
    price: string;
    weight_kg: string;
  }>;
}

// ✅ UPDATED: Support both Razorpay and VilvaPay responses
export interface CreateOrderResponse {
  status: boolean;
  order_id: string;
  redirect_url: string;
  // Razorpay specific fields (optional - only present for Razorpay gateway)
  razorpay_id?: string;
  razorpay_order_id?: string;
  message?: string;
}

export interface GetOrderResponse {
  status: boolean;
  order_id: string;
  amount: string;
  payment_status: string;
  message: string;
}

// ── API Functions ─────────────────────────────────────────────────────────────

// Contact Us - Submit Form Request
export const submitContactForm = async (
  payload: ContactFormPayload
): Promise<ContactFormResponse> => {
  const response = await apiClient.post<ContactFormResponse>(
    "/contact-us/submit-form-request",
    payload
  );
  return response.data;
};

// Digital Cart - Fetch Shipping
export const fetchShipping = async (
  payload: FetchShippingPayload
): Promise<FetchShippingResponse> => {
  const response = await apiClient.post<FetchShippingResponse>(
    "/digital-cart/fetch-shipping",
    payload
  );
  return response.data;
};

// Digital Cart - Create Order
export const createOrder = async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const response = await apiClient.post<CreateOrderResponse>(
    "/digital-cart/create-order",
    payload
  );
  return response.data;
};

// Digital Cart - Get Order (GET with query params)
export const getOrder = async (
  code: string,
  orderId: string
): Promise<GetOrderResponse> => {
  const response = await apiClient.get<GetOrderResponse>(
    "/digital-cart/get-order",
    {
      params: {
        code: code,
        order_id: orderId,
      },
    }
  );
  return response.data;
};

export default apiClient;