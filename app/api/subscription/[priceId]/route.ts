// import { NextRequest, NextResponse } from "next/server";
// import initStripe from "stripe"
// import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerCliient";





// export async function GET(
//     req: NextRequest,
//     { params }: { params: { priceId: string } }
// ) {



//     const supabase = supabaseRouteHandlerClient();
//     const { data } = await supabase.auth.getUser();
//     const user = data.user;



//     if (!user) {
//         return NextResponse.json("Unauthorized", { status: 401 });
//     }

//     const { data: stripe_customer_data } = await supabase
//         .from("profile")
//         .select("stripe_customer")
//         .eq("id", user?.id)
//         .single();
//     const priceId = params.priceId;
//     const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
//     // const stripeCustomer = stripe_customer_data?.stripe_customer;

//     // if (!stripeCustomer) {
//     //     // エラーハンドリング: stripe_customer が無効な場合の処理
//     //     return NextResponse.json({ error: "Invalid customer data" }, { status: 400 });
//     // }

//     const session = await stripe.checkout.sessions.create({
//         customer: stripe_customer_data?.stripe_customer!, // 安全に stripeCustomer を使用
//         mode: "subscription",
//         payment_method_types: ["card"],
//         line_items: [{
//             price: priceId, quantity: 1
//         }],
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
//     });

//     return NextResponse.json({
//         id: session.id
//     });









// }












// import { NextRequest, NextResponse } from "next/server";
// import initStripe from "stripe";
// import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerCliient";

// export async function GET(
//     _req: NextRequest, // reqを使用しない場合は _req
//     { params }: { params: { priceId: string } }
// ) {
//     const supabase = supabaseRouteHandlerClient();
//     const { data } = await supabase.auth.getUser();
//     const user = data.user;

//     if (!user) {
//         return NextResponse.json("Unauthorized", { status: 401 });
//     }

//     const { data: stripe_customer_data } = await supabase
//         .from("profile")
//         .select("stripe_customer")
//         .eq("id", user.id) // user?.idをuser.idに変更
//         .single();

//     if (!stripe_customer_data || !stripe_customer_data.stripe_customer) {
//         // エラーハンドリング: stripe_customer が無効な場合の処理
//         return NextResponse.json({ error: "Invalid customer data" }, { status: 400 });
//     }

//     const priceId = params.priceId;
//     const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

//     const session = await stripe.checkout.sessions.create({
//         customer: stripe_customer_data.stripe_customer, // 非Nullアサーションを削除
//         mode: "subscription",
//         payment_method_types: ["card"],
//         line_items: [{
//             price: priceId,
//             quantity: 1
//         }],
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
//     });

//     return NextResponse.json({
//         id: session.id
//     });
// }









import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerCliient";

export async function GET(
    _req: NextRequest,
    { params }: { params: { priceId: string } }
) {
    const supabase = supabaseRouteHandlerClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { data: stripe_customer_data, error: customerError } = await supabase
        .from("profile")
        .select("stripe_customer")
        .eq("id", user.id)
        .single();

    if (customerError || !stripe_customer_data || !stripe_customer_data.stripe_customer) {
        console.error("Customer data retrieval error:", customerError);
        return NextResponse.json({ error: "Invalid customer data" }, { status: 400 });
    }

    const priceId = params.priceId;
    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

    const session = await stripe.checkout.sessions.create({
        customer: stripe_customer_data.stripe_customer,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{
            price: priceId,
            quantity: 1
        }],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
    });

    return NextResponse.json({
        id: session.id
    });
}

