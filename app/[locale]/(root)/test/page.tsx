"use client";

import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { submitOrderForm } from "@/lib/actions/notification.action";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  required = true,
}) => {
  return (
    <PatternFormat
      format="+380 (##) ###-##-##"
      allowEmptyFormatting
      mask="_"
      value={value}
      onValueChange={(v) => {
        onChange(v.formattedValue);
      }}
      type="tel"
      required={required}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="+380 (00) 000-00-00"
    />
  );
};

export const OrderForm = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState<{
    success?: boolean;
    error?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Remove formatting for submission
    const cleanPhone = phone.replace(/\D/g, "");

    // Create FormData object
    const formData = new FormData();
    formData.append("tel1", cleanPhone);
    formData.append("name1", name);
    formData.append("sub1", product);

    try {
      const result = await submitOrderForm(formData);

      if (result.success) {
        setStatus({ success: true });
        // Reset form
        setPhone("");
        setName("");
        setProduct("");
      } else {
        setStatus({
          error: result.errors?.general || "Помилка надсилання",
        });
      }
    } catch (error) {
      setStatus({
        error: "Сталася непередбачена помилка",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Телефон
          </label>
          <PhoneInput value={phone} onChange={setPhone} />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Ваше ім'я
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Введіть ваше ім'я"
          />
        </div>

        <div>
          <label
            htmlFor="product"
            className="block text-sm font-medium text-gray-700"
          >
            Товар
          </label>
          <input
            type="text"
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Назва товару"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Надіслати
        </button>

        {status.success && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
            Замовлення успішно надіслано!
          </div>
        )}

        {status.error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
            {status.error}
          </div>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
