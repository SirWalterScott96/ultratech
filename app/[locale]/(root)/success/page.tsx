import { Button } from "@/components/ui/button";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="wrapper flex-1 space-y-4 my-5">
      <div className="flex flex-col items-center justify-center p-8 space-y-8">
        <h1 className="text-2xl font-bold">Дякуємо за покупку!</h1>
        <div>
          <p className="text-lg text-center">Ваша покупка успішно оформлена.</p>
          <p className="text-md text-center text-gray-500">
            Оператор зв&apos;яжеться з вами в найкоротший час для підтвердження
            та додаткової інформації.
          </p>
        </div>
        <Button asChild>
          <Link href={"/"}>Вернутись на головну</Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
