import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.redirect(new URL("/", request.url));
  //return NextResponse.redirect(new URL("/powerSupplyId", request.url));
}

export const config = {
  matcher: "/power-supply"
}