"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

const ProductReviewForm = () => {
  const t = useTranslations("Forms");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const formSchema = z.object({
    fullName: z.string().min(1, { message: t("fullNameError") }),
    email: z
      .string()
      .min(1, { message: t("emailError") })
      .email({ message: t("isEmailError") }),
    body: z.string().min(1, { message: t("reviewError") }),
  });

  // Handle animation when isSubmitted changes
  useEffect(() => {
    if (isSubmitted) {
      // Start animation by changing opacity
      setTimeout(() => setOpacity(1), 10);
    } else {
      setOpacity(0);
    }
  }, [isSubmitted]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      body: "",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    console.log(value);
    setIsSubmitted(true);
    // Optional: you might want to reset the form after submission
    // form.reset();
  }

  return (
    <div className="border p-4 mt-8 shadow-md rounded-xl space-y-3">
      <div className="font-bold">{parse(t("title"))}</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t("fullName")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t("email")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={t("message")}
                    {...field}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              className="w-full md:w-fit"
              disabled={isSubmitted}
            >
              {t("send")}
            </Button>
            {isSubmitted && (
              <span
                className="text-green-600 font-medium transition-opacity duration-500"
                style={{ opacity, transition: "opacity 0.7s ease-in" }}
              >
                {t("successReview")}
              </span>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductReviewForm;
