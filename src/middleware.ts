
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*",
    "/products/:path*",
    "/news/:path*",
    "/cart/:path*",
    "/checkout/:path*",],
};
