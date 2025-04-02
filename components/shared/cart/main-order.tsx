"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderList from "./order-list";
import { clearCart, getProductsFromCart } from "@/lib/actions/cart.action";
import sendTelegramMessage from "@/lib/actions/notification.action";
import { PhoneInput } from "./phone-input";
import { redirect } from "next/navigation";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Вкажіть ПІБ повністю" }),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Вкажіть правильний номер телефону"),
  city: z.string().min(1, "Потрібно вказати місто"),
  warehouse: z.string().min(1, "Потрібно вказати відділення"),
  payment: z.string(),
});

const MainOrder = () => {
  const [cities, setCities] = useState<{ name: string; ref: string }[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [cityRef, setCityRef] = useState<string | null>(null);

  const [warehouses, setWarehouses] = useState<string[]>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false);
  const [showWarehouseDropdown, setShowWarehouseDropdown] = useState(false);

  const [showBankDetails, setShowBankDetails] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      city: "",
      warehouse: "",
      payment: "Оплата при отриманні",
    },
  });

  useEffect(() => {
    const paymentMethod = form.watch("payment");
    setShowBankDetails(paymentMethod === "Безготівковий розрахунок");
  }, [form.watch("payment")]);

  useEffect(() => {
    const cityValue = form.watch("city");

    if (cityValue.length < 3 || isCitySelected) {
      setCities([]);
      setShowCityDropdown(false);
      return;
    }

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: "54cbbe70c8420736332bb9cbc2ed321c",
            modelName: "AddressGeneral",
            calledMethod: "searchSettlements",
            methodProperties: { CityName: cityValue, Limit: "50", Page: "1" },
          }),
        });
        const data = await response.json();
        const cityList =
          data.data[0]?.["Addresses"]?.map((city: any) => ({
            name: city.Present,
            ref: city.DeliveryCity,
          })) || [];
        setCities(cityList);
        setShowCityDropdown(true);
      } catch (error) {
        console.error("Помилка завантаження міст:", error);
      }
      setLoadingCities(false);
    };

    const timeout = setTimeout(fetchCities, 500);
    return () => clearTimeout(timeout);
  }, [form.watch("city"), isCitySelected]);

  const fetchWarehouses = async (searchQuery = "") => {
    if (!cityRef) return;

    setLoadingWarehouses(true);
    try {
      const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: "54cbbe70c8420736332bb9cbc2ed321c",
          modelName: "AddressGeneral",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityRef: cityRef,
            Limit: "50",
            Page: "1",
            ...(searchQuery ? { FindByString: searchQuery } : {}),
          },
        }),
      });
      const data = await response.json();
      if (data.success && data.data) {
        setWarehouses(data.data.map((wh: any) => wh.Description));
        setShowWarehouseDropdown(true);
      } else {
        setWarehouses([]);
      }
    } catch (error) {
      console.error("Помилка завантаження відділень:", error);
      setWarehouses([]);
    }
    setLoadingWarehouses(false);
  };

  useEffect(() => {
    if (!cityRef) return;
    fetchWarehouses();
    return () => setWarehouses([]);
  }, [cityRef]);

  useEffect(() => {
    const warehouseValue = form.watch("warehouse");

    if (cityRef && warehouseValue && !isWarehouseSelected) {
      const timeout = setTimeout(() => {
        fetchWarehouses(warehouseValue);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [form.watch("warehouse")]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const productsInCart = await getProductsFromCart();

    if (!productsInCart) return;

    const body = {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      city: values.city,
      warehouse: values.warehouse,
      products: productsInCart,
    };

    const response = await sendTelegramMessage(body, true);

    if (response) {
      await clearCart();
      redirect("/success");
    }
  };

  return (
    <div className="flex gap-4">
      <div className="w-1/2 p-4 border rounded-lg relative">
        <h2 className="text-lg font-bold mb-4">Форма замовлення</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ПІБ</FormLabel>
                  <Input placeholder="Прізвище, ім'я, по батькові" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <PhoneInput {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              Доставка здійснюється <b>Новою Поштою</b>
            </div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Місто</FormLabel>
                  <Input
                    placeholder="Почніть вводити..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setIsCitySelected(false);
                      if (e.target.value.length >= 3) {
                        setShowCityDropdown(true);
                      }
                    }}
                  />
                  {showCityDropdown && cities.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border mt-1 rounded-lg shadow-lg z-10 max-h-40 overflow-auto">
                      {cities.map(({ name, ref }, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            form.setValue("city", name);
                            setCityRef(ref);
                            setShowCityDropdown(false);
                            setIsCitySelected(true);
                            form.setValue("warehouse", "");
                          }}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {loadingCities && (
                    <div className="text-sm text-gray-500 mt-1">
                      Завантаження міст...
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="warehouse"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Відділення</FormLabel>
                  <Input
                    placeholder={
                      cityRef
                        ? "Почніть вводити для пошуку..."
                        : "Спочатку оберіть місто"
                    }
                    {...field}
                    disabled={!cityRef}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      if (cityRef) {
                        setShowWarehouseDropdown(true);
                      }
                    }}
                  />
                  {showWarehouseDropdown && warehouses.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border mt-1 rounded-lg shadow-lg z-10 max-h-40 overflow-auto">
                      {warehouses.map((wh, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            form.setValue("warehouse", wh);
                            setIsWarehouseSelected(true);
                            setShowWarehouseDropdown(false);
                          }}
                        >
                          {wh}
                        </li>
                      ))}
                    </ul>
                  )}
                  {loadingWarehouses && (
                    <div className="text-sm text-gray-500 mt-1">
                      Завантаження відділень...
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Спосіб оплати</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть спосіб оплати" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Оплата при отриманні">
                        Оплата при отриманні
                      </SelectItem>
                      <SelectItem value="Безготівковий розрахунок">
                        Безготівковий розрахунок
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showBankDetails && (
              <div className="p-3 bg-gray-50 rounded-md border">
                <h3 className="font-medium mb-2 text-sm">
                  Реквізити для оплати:
                </h3>
                <div className="text-sm space-y-1">
                  <p>IBAN: UA213223130000026007233566001</p>
                  <p>ЄДРПОУ: 41231456</p>
                  <p>Банк: АТ КБ "ПриватБанк"</p>
                  <p>Отримувач: ТОВ "Назва Компанії"</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Після оплати, надішліть, будь ласка, підтвердження платежу
                    на пошту payments@example.com
                  </p>
                </div>
              </div>
            )}

            <Button type="submit" disabled={loadingCities || loadingWarehouses}>
              Відправити
            </Button>
          </form>
        </Form>
      </div>
      <OrderList className="flex flex-col" />
    </div>
  );
};

export default MainOrder;
