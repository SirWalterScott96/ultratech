"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const Success = () => {
  const t = useTranslations("SuccessPage");
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // This effect will run on component mount and when pathname changes to this specific page
  useEffect(() => {
    // Make sure this is the Success page
    if (!pathname.includes("/success")) {
      return;
    }

    // Skip the initial render effect when the component first mounts
    // This ensures the actions only run when the page is navigated to, not on initial load
    if (isFirstRender.current) {
      isFirstRender.current = false;

      // Run the actions on initial load as well
      handleSuccessActions();
      return;
    }

    // Run when navigating to this page
    handleSuccessActions();
  }, [pathname]);

  const handleSuccessActions = async () => {
    try {
      console.log("Running success actions on Success page load...");

      // Call the Facebook Lead API route
      const fbResponse = await fetch("/api/facebook-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!fbResponse.ok) {
        console.error("Facebook lead event failed:", await fbResponse.text());
      }

      // Call the Clear Cart API route
      const clearCartResponse = await fetch("/api/clear-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!clearCartResponse.ok) {
        console.error("Clear cart failed:", await clearCartResponse.text());
      }
    } catch (error) {
      console.error("Error in success actions:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">{parse(t("h1"))}</h1>
      <div>
        <p className="text-lg text-center">{parse(t("success_order"))}</p>
        <p className="text-md text-center text-gray-500">
          {parse(t("description"))}
        </p>
      </div>
      <Button asChild>
        <Link href={"/"}>{parse(t("back_to_home"))}</Link>
      </Button>
    </>
  );
};

export default Success;
