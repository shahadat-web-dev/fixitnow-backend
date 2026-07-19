import { PaymentProvider } from "../../../generated/prisma/enums.js";

export interface CreatePaymentPayload {
  bookingId: string;
  provider: PaymentProvider;
}