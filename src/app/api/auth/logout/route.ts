import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  try {
    cookieStore.set({
      name: "accessToken",
      value: "",
      httpOnly: true,
      path: "/",
    });
    cookieStore.set({
      name: "refresh_Token",
      value: "",
      httpOnly: true,
      path: "/",
    });
    return NextResponse.json({ messsage: "Đăng xuất thành công" });
  } catch (err) {
    console.log(err);
  }
}
