"use client";
import { Product } from "@/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "./phone-input";
import sendTelegramMessage from "@/lib/actions/notification.action";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Вкажіть ПІБ" }),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Вкажіть правильний номер телефону"),
});

const QuickOrder = ({ product }: { product: Product }) => {
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (status) {
      setTimeout(() => setOpacity(1), 10);
    } else {
      setOpacity(0);
    }
  }, [status]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    setStatus(null);
    const rawMessage = {
      fullname: value.fullName,
      phoneNumber: value.phoneNumber,
      product: product.fullName,
      price: product.price,
    };

    const response = await sendTelegramMessage(rawMessage);

    if (response) {
      setStatus("success");
      // form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Замовити швидко</Button>
      </DialogTrigger>
      <DialogContent className="min-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ПІБ</FormLabel>
                  <FormControl>
                    <Input placeholder="Ім'я та прізвище" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефону</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={status === "success"}>
                Оформити замовлення
              </Button>
              {status === "success" && (
                <span
                  className="text-green-600 font-medium transition-opacity duration-500"
                  style={{ opacity, transition: "opacity 0.7s ease-in" }}
                >
                  Ваше замовлення надіслане
                </span>
              )}
              {status === "error" && (
                <span
                  className="text-red-600 font-medium transition-opacity duration-500"
                  style={{ opacity, transition: "opacity 0.7s ease-in" }}
                >
                  Помилка при надсиланні, спробуйте ще раз
                </span>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickOrder;
