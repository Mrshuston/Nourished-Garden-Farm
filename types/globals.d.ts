export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      programs?: string[];
      stripeCustomerId?: string;
    };
  }
}
