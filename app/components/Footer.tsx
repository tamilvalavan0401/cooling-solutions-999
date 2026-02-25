// Footer.tsx
"use client";
import React, { useCallback } from "react";
import SvgIcons from "./SvgIcon";

export default function Footer() {
  // Download Handler
  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/images/heroleft.webp";
    link.download = "Cooling-Solutions.webp";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Share Handler
  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Thingal Essential Natural Products",
      text: "Check out Thingal Essential Natural Products!",
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
      alert("Link copied to clipboard!");
    } catch (err) {
      prompt("Copy this link:", window.location.href);
    }
  }, []);

  // QR Handler
  const handleQr = useCallback(() => {
    // You can emit an event or use a global state to open QR modal
    // For now, we'll open a new window with QR code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`;
    window.open(qrUrl, '_blank', 'width=400,height=400');
  }, []);

  return (
    <footer className="bg-white w-full">
      {/* Top Footer Links */}
      <div className="bg-secondary py-[20px]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Privacy & Terms */}
          <div className="flex items-center gap-4">
            <a href="privacy-policy" className="text-white/60 text-[14px] hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="terms-conditions" className="text-white/60 text-[14px] hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
          </div>

          {/* Right: Download Card / QR / Share buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 py-[12px] px-[24px] text-white text-[16px] font-500 rounded-[8px] bg-[#FFFFFF]/10 hover:bg-primary/80 transition-all duration-300 hover:scale-105"
            >
              <span>Download Card</span>
              <SvgIcons.Download/>
            </button>
            <button
              onClick={handleQr}
              className="p-[10px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF]/10 hover:bg-primary/80 transition-all duration-300 hover:scale-105"
            >
              <SvgIcons.Qr/>
            </button>
            <button
              onClick={handleShare}
              className="p-[10px] flex items-center justify-center rounded-[8px] bg-[#FFFFFF]/10 hover:bg-primary/80 transition-all duration-300 hover:scale-105"
            >
              <SvgIcons.Share/>
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/20 py-[24px] text-center">
        <p className="text-[#000000]/60 text-[14px]">
          © 2016 - {new Date().getFullYear()} Cooling Solutions. All Rights Reserved -
          Powered by{" "}
          <span>
            <a
              href="https://vilvabusiness.com/"
              className="hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⚡Vilva
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}