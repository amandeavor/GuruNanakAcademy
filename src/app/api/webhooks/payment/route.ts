import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // 1. Read the raw text body to prevent verification mismatches
    const rawPayload = await req.text();
    const signatureHeader = req.headers.get("X-Signature-Header");
    const endpointSecret = process.env.TRANSACTION_WEBHOOK_SECRET || "mock_secret_key";

    if (!signatureHeader) {
      return NextResponse.json({ error: "No transaction signature detected." }, { status: 400 });
    }

    // 2. Validate using SHA-256 HMAC encryption algorithms
    const localHmac = crypto
      .createHmac("sha256", endpointSecret)
      .update(rawPayload)
      .digest("hex");

    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(signatureHeader, "hex"),
      Buffer.from(localHmac, "hex")
    );

    if (!isAuthentic) {
      return NextResponse.json({ error: "Cryptographic check failed." }, { status: 403 });
    }

    // 3. Process parsed JSON objects safely after validation is complete
    const webhookData = JSON.parse(rawPayload);
    const eventId = req.headers.get("X-Event-Id") || webhookData.id || `evt_${crypto.randomUUID()}`;

    // Check duplicate event occurrences to prevent replay attacks
    const isAlreadyProcessed = await checkDuplicateTransactionId(eventId);
    if (isAlreadyProcessed) {
      return NextResponse.json({ processed: true, message: "Duplicate transaction skipped." });
    }

    await executeDatabasePaymentSync(webhookData);

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("Webhook state synchronization failure:", err);
    return NextResponse.json({ error: "Internal payment handler error." }, { status: 500 });
  }
}

async function checkDuplicateTransactionId(id: string): Promise<boolean> {
  // Queries redis or database instance for event validation checks
  console.log(`Checking duplicate event: ${id}`);
  return false;
}

async function executeDatabasePaymentSync(data: any) {
  // Syncs dynamic user transaction status
  console.log("Syncing database with webhook payment data:", data);
}
