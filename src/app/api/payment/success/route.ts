import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const formData = await req.formData();
  const category = formData.get("category") as string;
  const email = formData.get("email") as string;

  // Validate payment signature here (PayU hash verify)

  const { data: userData } = await supabase
    .from("users") // or your user table if you have
    .select("*")
    .eq("email", email)
    .single();

  if (!userData) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  await supabase.from("subscriptions").insert({
    user_id: userData.id,
    category,
    start_date: startDate,
    end_date: endDate,
  });

  return NextResponse.redirect("http://localhost:3000/payment/success");
}
