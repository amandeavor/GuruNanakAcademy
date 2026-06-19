import { loadStripe, Stripe } from "@stripe/stripe-js";

let cachedStripeInstance: Promise<Stripe | null>;

export const getStripeEngine = (): Promise<Stripe | null> => {
  if (!cachedStripeInstance) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_mock_stripe_key_123456789";
    cachedStripeInstance = loadStripe(key);
  }
  return cachedStripeInstance;
};
