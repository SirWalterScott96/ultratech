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
import { getProductsFromCart } from "@/lib/actions/cart.action";
import sendTelegramMessage from "@/lib/actions/notification.action";
import { PhoneInput } from "./phone-input";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";
import { AlertDescription, AlertTitle, Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Spinner from "../spinner";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const MainOrder = () => {
  const t = useTranslations("Forms");
  const [cities, setCities] = useState<{ name: string; ref: string }[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [cityRef, setCityRef] = useState<string | null>(null);

  const [warehouses, setWarehouses] = useState<string[]>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false);
  const [showWarehouseDropdown, setShowWarehouseDropdown] = useState(false);

  const [ShowDifferentPaymentDetails, setShowDifferentPaymentDetails] =
    useState("");
  const [isCourierDelivery, setIsCourierDelivery] = useState(false);
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const getFormSchema = () => {
    const baseSchema = {
      fullName: z
        .string()
        .min(3, { message: parse(t("firstAndSecondNameError")) as string }),
      phoneNumber: z
        .string()
        .regex(phoneRegex, parse(t("phoneNumberError")) as string),
      payment: z.string(),
    };

    if (isCourierDelivery) {
      return z.object({
        ...baseSchema,
        deliveryAddress: z
          .string()
          .min(
            10,
            parse(
              t("deliveryAddressError") || "Вкажіть повну адресу доставки"
            ) as string
          ),
      });
    }

    return z.object({
      ...baseSchema,
      city: z.string().min(1, parse(t("cityError")) as string),
      warehouse: z.string().min(1, parse(t("warehouseError")) as string),
    });
  };

  const form = useForm<z.infer<ReturnType<typeof getFormSchema>>>({
    resolver: zodResolver(getFormSchema()),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      city: "",
      warehouse: "",
      deliveryAddress: "",
      payment: parse(t("paymentAfterReceiving")) as string,
    },
  });

  useEffect(() => {
    form.clearErrors();
    form.reset(
      { ...form.getValues() },
      {
        keepValues: true,
        keepDirty: true,
        keepIsSubmitted: false,
        keepTouched: false,
      }
    );
  }, [isCourierDelivery]);

  useEffect(() => {
    const paymentMethod = form.watch("payment");
    const isCourier = paymentMethod === parse(t("deliveryCourier"));

    setIsCourierDelivery(isCourier);

    if (paymentMethod === parse(t("cashlessPayment"))) {
      setShowDifferentPaymentDetails(paymentMethod);
    } else if (isCourier) {
      setShowDifferentPaymentDetails(paymentMethod);
    } else {
      setShowDifferentPaymentDetails("");
    }
  }, [form.watch("payment")]);

  useEffect(() => {
    const cityValue = form.watch("city");

    if (cityValue?.length < 3 || isCitySelected || isCourierDelivery) {
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
  }, [form.watch("city"), isCitySelected, isCourierDelivery]);

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
    if (!cityRef || isCourierDelivery) return;
    fetchWarehouses();
    return () => setWarehouses([]);
  }, [cityRef, isCourierDelivery]);

  useEffect(() => {
    const warehouseValue = form.watch("warehouse");

    if (
      cityRef &&
      warehouseValue &&
      !isWarehouseSelected &&
      !isCourierDelivery
    ) {
      const timeout = setTimeout(() => {
        fetchWarehouses(warehouseValue);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [form.watch("warehouse"), isCourierDelivery]);

  const onSubmit = async (values: any) => {
    setIsFormSubmitted(true);
    const productsInCart = await getProductsFromCart();

    if (productsInCart.length == 0) {
      setIsEmptyCart(true);
      return;
    }

    const body = {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      products: productsInCart,
      ...(isCourierDelivery
        ? { deliveryAddress: values.deliveryAddress, deliveryType: "courier" }
        : {
            city: values.city,
            warehouse: values.warehouse,
            deliveryType: "warehouse",
          }),
    };
    const response = await sendTelegramMessage(body, true);

    if (response) {
      redirect("/success");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2 p-4 border rounded-lg relative">
        <h2 className="text-lg font-bold mb-4 text-center md:text-start">
          {parse(t("orderForm"))}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{parse(t("firstAndSecondName"))}</FormLabel>
                  <Input
                    placeholder={parse(t("fullNamePlaceholder")) as string}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{parse(t("phoneNumber"))}</FormLabel>
                  <PhoneInput {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {parse(t("deliveryCarried"))} <b>{parse(t("deliveryCompany"))}</b>
            </div>
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{parse(t("paymentOptions"))}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={parse(t("paymentOptionsChoice"))}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value={parse(t("paymentAfterReceiving")) as string}
                      >
                        {parse(t("paymentAfterReceiving"))}
                      </SelectItem>
                      <SelectItem value={parse(t("cashlessPayment")) as string}>
                        {parse(t("cashlessPayment"))}
                      </SelectItem>
                      <SelectItem value={parse(t("deliveryCourier")) as string}>
                        {parse(t("deliveryCourier"))}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Для кур'єрської доставки показуємо поле адреси */}
            {isCourierDelivery ? (
              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {parse(t("deliveryAddress") || "Адреса доставки")}
                    </FormLabel>
                    <Input
                      placeholder={
                        parse(
                          t("enterFullAddressDelivery") ||
                            "Введіть повну адресу доставки"
                        ) as string
                      }
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              // Інакше показуємо поля для вибору міста та відділення
              <>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>{parse(t("city"))}</FormLabel>
                      <Input
                        placeholder={parse(t("startTyping")) as string}
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
                          {parse(t("cityLoading"))}
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
                      <FormLabel>{parse(t("warehouse"))}</FormLabel>
                      <Input
                        placeholder={
                          cityRef
                            ? (parse(t("startTyping")) as string)
                            : (parse(t("startSelectCity")) as string)
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
                          {parse(t("warehouseLoading"))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {ShowDifferentPaymentDetails === parse(t("cashlessPayment")) && (
              <div className="p-3 bg-gray-50 rounded-md border">
                <h3 className="font-medium mb-2 text-sm">
                  {parse(t("paymentOptions"))}:
                </h3>
                <div className="text-sm space-y-1">
                  <p>IBAN: UA212223130000016007233566102</p>
                  <p>ЄДРПОУ: 41231456</p>
                  <p>Банк: АТ КБ &quot;ПриватБанк&quot;</p>
                  <p>Отримувач: ТОВ &quot;Назва Компанії&quot;</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {parse(t("paymentAfter"))}
                  </p>
                </div>
              </div>
            )}
            {isEmptyCart && (
              <Alert className="w-fit bg-red-100" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle> {parse(t("Error"))}</AlertTitle>
                <AlertDescription>
                  {parse(t("errorEmptyMessage"))}
                </AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col gap-4 md:flex-row items-center">
              <Button
                type="submit"
                className="w-full md:w-fit"
                disabled={loadingCities || loadingWarehouses || isFormSubmitted}
              >
                <div className="flex gap-3 items-center">
                  {parse(t("send"))}
                  {isFormSubmitted && <Spinner />}
                </div>
              </Button>
              {isFormSubmitted && (
                <p className="font-bold text-blue-500">
                  {parse(t("formValidate"))}
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
      <OrderList className="flex flex-col border-2 rounded-md p-3 md:border-0 md:p-0" />
    </div>
  );
};

export default MainOrder;
