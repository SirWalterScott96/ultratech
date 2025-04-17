import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import type { CartItem } from "@/types";

const ProductModal = ({
  product,
  onQuantityChange,
  onRemove,
  isRemoving,
}: {
  product: CartItem;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
  isRemoving: boolean;
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 border-b pb-4 transition-all duration-300
        ${
          isRemoving
            ? "opacity-0 scale-95 h-0 overflow-hidden"
            : "opacity-100 scale-100 h-auto"
        }
        md:grid md:grid-cols-[70px_1fr_120px_100px] md:items-center
      `}
    >
      {/* Верхня частина: Зображення + Назва + Ціна */}
      <div className="flex gap-4 md:contents">
        {/* Картинка */}
        <div className="w-[70px] relative">
          <Image
            src={product.images[0]}
            alt={product.fullName}
            width={70}
            height={70}
            className="rounded"
          />
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>

        {/* Назва + Ціна */}
        <div className="flex flex-col">
          <Link href={`/product/${product.slug}`}>
            <p className="font-semibold hover:text-blue-500 transition-all duration-500">
              {product.fullName}
            </p>
          </Link>
          {product.oldPrice && (
            <p className="text-gray-400 line-through text-sm">
              {product.oldPrice} грн
            </p>
          )}
          <p className="text-blue-500 font-bold">{product.price} грн</p>
        </div>
      </div>

      {/* Низ: Кнопки зміни кількості + Загальна сума */}
      <div className="flex justify-between items-center gap-4 md:contents">
        {/* Кількість */}
        <div className="flex items-center justify-center border rounded-md px-2 w-full md:w-[120px]">
          <button
            onClick={handleDecrement}
            className="px-3 py-1 text-lg hover:bg-gray-100 rounded"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-3 py-1 text-lg hover:bg-gray-100 rounded"
          >
            +
          </button>
        </div>

        {/* Загальна сума */}
        <p className="font-bold text-right w-full md:w-[100px]">
          {product.price * product.quantity} грн
        </p>
      </div>
    </div>
  );
};

export default ProductModal;
