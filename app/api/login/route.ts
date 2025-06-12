import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
  const { email, password } = await req.json();
  console.log("Parsed Email:", email);
  console.log("Parsed Password:", password);

    if (email === "vinaychaware@gmail.com" && password === "12345678") {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
