// src/app/api/payment/start/route.ts

import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabaseServer"; // ✅ Replaces direct createClient

// ✅ Category mapping
const CATEGORY_CONFIG: Record<
  string,
  { amount: string; productinfo: string }
> = {
  nmms: { amount: "26", productinfo: "NMMS Subscription" },
  "gyan-sadhana": { amount: "26", productinfo: "Gyan Sadhana Subscription" },
  pse: { amount: "26", productinfo: "PSE Subscription" },
  cet: { amount: "26", productinfo: "CET Subscription" },
  jnv: { amount: "26", productinfo: "JNV Subscription" },
  "general-knowledge": { amount: "26", productinfo: "General Knowledge Subscription" },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstname = "Customer",
      email = "customer@example.com",
      phone = "9999999999",
      category,
    } = body;

    // ✅ Validate category
    const config = CATEGORY_CONFIG[category];
    if (!config) {
      console.error("Invalid category:", category);
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    // ✅ Generate unique txnid
    const txnid = `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const key = process.env.PAYU_KEY!;
    const salt = process.env.PAYU_SALT!;
    const surl = process.env.PAYU_SUCCESS_URL!;
    const furl = process.env.PAYU_FAILURE_URL!;

    // ✅ Create secure hash
    const hashString = `${key}|${txnid}|${config.amount}|${config.productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    // ✅ Debug log to check all critical values
    console.log("🚀 Payment Debug Log:", {
      category,
      config,
      txnid,
      key,
      salt,
      surl,
      furl,
      hash,
    });

    // ✅ Store transaction in Supabase
    const { error } = await supabase.from("transactions").insert([
      {
        txnid,
        email,
        phone,
        amount: parseFloat(config.amount),
        category,
        status: "pending",
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to store transaction" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      key,
      txnid,
      amount: config.amount,
      productinfo: config.productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      hash,
      service_provider: "payu_paisa",
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
