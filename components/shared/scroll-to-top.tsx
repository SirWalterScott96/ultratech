"use client";
import React, { useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

export default function ScrollToTopWrapper() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollToTop
      smooth
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        borderRadius: "50%",
        width: "55px",
        height: "55px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        visibility: isVisible ? "visible" : "hidden",
      }}
      component={<UpArrow />}
    />
  );
}

const UpArrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
