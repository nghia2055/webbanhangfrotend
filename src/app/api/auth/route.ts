import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = await request.json();
  const accessToken = token?.accessToken;
  const refresh_Token = token?.refresh_Token;
  if (accessToken && refresh_Token) {
    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
    });

    cookieStore.set({
      name: "refresh_Token",
      value: refresh_Token,
      httpOnly: true,
      path: "/",
    });
    return new Response("Đăng nhập thành công", {
      status: 200,
    });
  }
  return new Response("Lỗi", {
    status: 403,
  });
}
