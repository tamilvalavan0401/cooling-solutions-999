import React from "react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Terms &amp; Conditions
        </h1>
       

        {/* Section 1 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Agreement to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using Thingal Essential Natural Products website, you accept and agree to be bound by these terms and conditions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you do not agree with any part of these terms, please do not use our website or services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Products and Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All products and services are subject to availability. We reserve the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Discontinue any product at any time</li>
            <li>Change prices without prior notice</li>
            <li>Limit quantities available for purchase</li>
            <li>Refuse or cancel any order</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Product descriptions and images are as accurate as possible, but we do not guarantee they are error-free.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Orders and Payment
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you place an order with us:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>You agree to provide accurate and complete information</li>
            <li>Payment must be completed before order processing</li>
            <li>We will send order confirmation to your email</li>
            <li>Orders are subject to acceptance and verification</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We accept major credit cards, debit cards, and other payment methods as displayed on our website.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Shipping and Delivery
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Shipping terms:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>We ship to the address you provide during checkout</li>
            <li>Delivery times are estimates and not guaranteed</li>
            <li>Shipping costs are calculated at checkout</li>
            <li>Risk of loss passes to you upon delivery to carrier</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Please ensure your shipping address is correct. We are not responsible for delays caused by incorrect addresses.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Returns and Refunds
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our return policy:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Returns accepted within 30 days of purchase</li>
            <li>Products must be unused and in original packaging</li>
            <li>Original receipt or proof of purchase required</li>
            <li>Refunds processed within 7-10 business days</li>
            <li>Shipping costs are non-refundable</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Certain products may not be eligible for return due to hygiene or safety reasons.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Thingal Essential Natural Products shall not be liable for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Indirect or consequential damages</li>
            <li>Loss of profits or revenue</li>
            <li>Product performance issues beyond our control</li>
            <li>Delays caused by third-party services</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this website, including text, images, logos, and designs, is the property of Thingal Essential Natural Products and protected by copyright laws. You may not reproduce, distribute, or use any content without written permission.
          </p>
        </div>

        {/* Section 8 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of modified terms.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            For questions about these Terms &amp; Conditions:
          </p>
          <p className="text-gray-700">
            Email: <a href="mailto:sales@thingalessentials.com" className="text-primary hover:underline">sales@thingalessentials.com</a>
          </p>
          <p className="text-gray-700">
            Phone: <a href="tel:+919445547445" className="text-primary hover:underline">+91 9445547445</a>
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-8 pt-6 border-t">
          <a href="/" className="text-primary hover:text-[#2B5200] font-medium">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}