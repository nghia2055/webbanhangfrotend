import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refresh_Token = cookieStore.get("refresh_Token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/dashboardorder`, {
      headers: {
        Authorization: "Bearer " + accessToken,
        refreshtoken: `${refresh_Token}`,
      },
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
  }
}
