import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ Initialize Supabase using environment variables (server-safe)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const category = formData.get("category") as string;
    const email = formData.get("email") as string;

    if (!category || !email) {
      return NextResponse.json({ error: "Missing category or email" }, { status: 400 });
    }

    // ⚠️ TODO: Add PayU hash verification here for security (optional)

    // ✅ Fetch user by email
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Calculate subscription duration (1 month)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    // ✅ Insert subscription record
    const { error: insertError } = await supabase.from("subscriptions").insert({
      user_id: userData.id,
      category,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    });

    if (insertError) {
      console.error("Subscription insert error:", insertError);
      return NextResponse.json({ error: "Failed to add subscription" }, { status: 500 });
    }

    // ✅ Redirect to success page
    return NextResponse.redirect("http://localhost:3000/payment/success");
  } catch (err) {
    console.error("Payment success route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
