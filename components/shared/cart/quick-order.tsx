"use client";
import { Product } from "@/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useTranslations } from "next-intl";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const QuickOrder = ({
  product,
  className = "",
}: {
  product: Product;
  className: string;
}) => {
  const t = useTranslations("Forms");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();

  const formSchema = z.object({
    fullName: z.string().min(1, { message: t("firstAndSecondNameError") }),
    phoneNumber: z.string().regex(phoneRegex, t("phoneNumberError")),
  });

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
      fullName: value.fullName,
      phoneNumber: value.phoneNumber,
      product: product.fullName,
      price: String(product.price),
    };

    const response = await sendTelegramMessage(rawMessage);

    if (response) {
      setStatus("success");
      router.push("/success");
      // form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          {parse(t("quickBuy"))}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-2xl">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    {parse(t("firstAndSecondName"))}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={parse(t("fullName")) as string}
                      {...field}
                    />
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
                  <FormLabel className="text-xl">
                    {parse(t("phoneNumber"))}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={status === "success"}>
                {parse(t("submitOrder"))}
              </Button>
              {status === "success" && (
                <span
                  className="text-green-600 font-medium transition-opacity duration-500"
                  style={{ opacity, transition: "opacity 0.7s ease-in" }}
                >
                  {parse(t("successSubmit"))}
                </span>
              )}
              {status === "error" && (
                <span
                  className="text-red-600 font-medium transition-opacity duration-500"
                  style={{ opacity, transition: "opacity 0.7s ease-in" }}
                >
                  {parse(t("errorSubmit"))}
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
