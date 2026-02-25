import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        
        {/* Section 1 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to Thingal Essential Natural Products. We respect your privacy and are committed to protecting your personal data.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This privacy policy will inform you about how we look after your personal data when you visit our website.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Name and contact information (email, phone, address)</li>
            <li>Payment and billing information</li>
            <li>Order history and preferences</li>
            <li>Communication preferences</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We also automatically collect certain information when you visit our website, such as your IP address, browser type, and pages visited.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Process and deliver your orders</li>
            <li>Send you updates about your orders</li>
            <li>Improve our products and services</li>
            <li>Respond to your questions and requests</li>
            <li>Send promotional emails (with your consent)</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </p>
          <p className="text-gray-700 leading-relaxed">
            However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our website uses cookies to improve your browsing experience. You can control cookies through your browser settings.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="text-gray-700">
            Email: <a href="mailto:privacy@thingalessential.com" className="text-primary hover:underline">privacy@thingalessential.com</a>
          </p>
          <p className="text-gray-700">
            Phone: <a href="tel:+15551234567" className="text-primary hover:underline">+1 (555) 123-4567</a>
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