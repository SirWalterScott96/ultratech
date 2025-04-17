"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const ProductFeatures = () => {
  const t = useTranslations("ProductFeatures");
  const [activeTab, setActiveTab] = useState("delivery");

  const tabs = [
    {
      id: "delivery",
      label: parse(t("delivery")),
      content: [
        parse(t("delivery1")),
        parse(t("delivery2")),
        parse(t("delivery3")),
      ],
    },
    {
      id: "payment",
      label: parse(t("payment")),
      content: [
        parse(t("payment1")),
        parse(t("payment2")),
        parse(t("payment3")),
      ],
    },
    {
      id: "warranty",
      label: parse(t("warranty")),
      content: [
        parse(t("warranty1")),
        parse(t("warranty2")),
        parse(t("warranty3")),
      ],
    },
  ];
  return (
    <div className="py-4">
      <div className="border-b-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-bold ${
              activeTab === tab.id
                ? "text-black border-b-2 border-black"
                : "text-gray-400 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        <ul className="list-disc pl-5">
          {tabs
            .find((tab) => tab.id === activeTab)
            ?.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductFeatures;
