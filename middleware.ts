import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const url = request.nextUrl;
  if (url.searchParams.get("fbpixel")) {
    const paramsToStore = ["fbpixel", "token", "fbclid", "sub1"];

    paramsToStore.forEach((param) => {
      const value = url.searchParams.get(param);
      if (value) {
        response.cookies.set(param, value, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }
    });
  }
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
