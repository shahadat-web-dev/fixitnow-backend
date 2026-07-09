import { PaymentProvider } from "../../../generated/prisma/enums";

export interface CreatePaymentPayload {
  bookingId: string;
  provider: PaymentProvider;
}