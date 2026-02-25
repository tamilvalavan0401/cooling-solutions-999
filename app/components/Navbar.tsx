"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [visitorCount, setVisitorCount] = useState(32);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prevCount) => {
        // Random increment of 1, 2, 3, or 4
        const increment = Math.floor(Math.random() * 4) + 1;
        let newCount = prevCount + increment;
        
        // If exceeds 99, reset to random number between 10 and 30
        if (newCount > 99) {
          newCount = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        }
        
        // Ensure minimum is 10
        if (newCount < 10) {
          newCount = 10;
        }
        
        return newCount;
      });
    }, 240000); // 4 minutes = 240000 milliseconds

    return () => clearInterval(interval);
  }, []);

  const handleSmoothScroll = (e: any, targetId: any) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="bg-primary w-full sticky top-0 z-50">
      <style>
        {`
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }
          
          .blink-dot {
            animation: blink 1.5s ease-in-out infinite, pulse 1.5s ease-in-out infinite;
          }
          
          .visitor-count {
            transition: all 0.5s ease-in-out;
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:space-y-[0px] space-y-[16px] items-center justify-between py-[14px]">
        {/* Desktop Nav Links */}

        <div className="visible sm:invisible bg-[#E0FEE5] rounded-[32px] border-2 border-[#16AE2E] px-[12px] py-[4px] flex items-center gap-2 ">
          <div className="bg-[#16AE2E] rounded-full p-[6px] w-fit h-fit blink-dot">
            <div className="bg-white w-[6px] h-[6px] rounded-full"></div>
          </div>
          <p className="text-[#16AE2E] whitespace-nowrap visitor-count text-[14px ]">
            <span className="inline-block min-w-[20px] text-center">
              {visitorCount}
            </span>{" "}
            Live Visitors
          </p>
        </div>

        <div className="flex items-center gap-8 w-full justify-center">
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "#about")}
            className="text-white text-sm font-medium hover:text-yellow-200 transition-colors"
          >
            About
          </a>
          <div className="bg-[#FFFFFF]/20 h-[20px] w-[2px] "></div>
          <a
            href="#products"
            onClick={(e) => handleSmoothScroll(e, "#products")}
            className="text-white text-sm font-medium hover:text-yellow-200 transition-colors"
          >
            Our Products
          </a>
          <div className="bg-[#FFFFFF]/20 h-[20px] w-[2px] "></div>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="text-white text-sm font-medium hover:text-yellow-200 transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="sm:visible invisible hidden bg-[#E0FEE5] rounded-[32px] border-2 border-[#16AE2E] px-[12px] py-[4px] md:flex items-center gap-2 ">
          <div className="bg-[#16AE2E] rounded-full p-[6px] w-fit h-fit blink-dot">
            <div className="bg-white w-[6px] h-[6px] rounded-full"></div>
          </div>
          <p className="text-[#16AE2E] whitespace-nowrap visitor-count text-[14px ]">
            <span className="inline-block min-w-[20px] text-center">
              {visitorCount}
            </span>{" "}
            Live Visitors
          </p>
        </div>
      </div>
    </nav>
  );
}