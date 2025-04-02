"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "delivery",
    label: "Доставка",
    content: [
      "Самовивіз з нашого магазину",
      `"Новою поштою" по Україні`,
      "Кур'єром до адреси доставки по Україні",
    ],
  },
  {
    id: "payment",
    label: "Оплата",
    content: [
      "Післяплатою при отриманні",
      "Безготівковий розрахунок",
      "Готівкою кур'єру",
    ],
  },
  {
    id: "warranty",
    label: "Гарантія",
    content: [
      "Гарантія від виробника 12 місяців",
      "Можливість повернення товару протягом 14 днів",
      "Обмін у разі заводського браку",
    ],
  },
];

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("delivery");

  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        width={960}
        height={570}
        className="max-w-[500px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              "border-2 mr-2 cursor-pointer hover:border-blue-500 ",
              current === index && "border-blue-500"
            )}
          >
            <Image src={image} alt="image" width={100} height={100} />
          </div>
        ))}
      </div>
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

export default ProductImages;
