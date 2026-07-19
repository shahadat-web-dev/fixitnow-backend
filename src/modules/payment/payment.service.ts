import stripe from "../../lib/stripe";
import { prisma } from "../../lib/prisma";
import { PaymentStatus, BookingStatus } from "../../../generated/prisma/enums";
import config from "../../config";



// Done
const createPayment = async (
  customerId: string,
  bookingId: string
) => {

  // booking আছে কিনা
  const booking = await prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
      customerId
    },
    include: {
      service: true,
      payment: true
    }
  });

  // booking accepted?
  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new Error("Booking is not accepted yet.");
  }

  // payment already exists?
  if (booking.payment) {
    throw new Error("Payment already created.");
  }



  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],

    mode: "payment",

    line_items: [

      {

        quantity: 1,

        price_data: {

          currency: "usd",

          unit_amount: booking.service.price * 100,

          product_data: {

            name: booking.service.title,

            description: booking.service.description

          }

        }

      }

    ],

    success_url: "http://localhost:3000/payment-success",

    cancel_url: "http://localhost:3000/payment-cancel"

  });


  const payment = await prisma.payment.create({

    data: {

      bookingId: booking.id,

      customerId,

      amount: booking.service.price,

      provider: "STRIPE",

      transactionId: session.id,

      status: PaymentStatus.PENDING

    }

  });

  return {

    payment,

    checkoutUrl: session.url

  };


};



const confirmPayment = async (
  body: Buffer,
  signature: string
) => {

 console.log("WEBHOOK SECRET:", config.stripe_webhook_secret);
  console.log("SIGNATURE:", signature);
  console.log("IS BUFFER:", Buffer.isBuffer(body));

   const event = stripe.webhooks.constructEvent(
    body,
    signature,
    config.stripe_webhook_secret
  );

  console.log("Webhook Event:", event.type);

  return {
    received: true
  };
};


// Done
const getMyPayments = async (customerId: string) => {
  return prisma.payment.findMany({
    where: {
      customerId,
    },
    include: {
      booking: {
        include: {
          service: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


// Done
const getSinglePayment = async (
  paymentId: string,
  customerId: string
) => {
  return prisma.payment.findFirstOrThrow({
    where: {
      id: paymentId,
      customerId,
    },
    include: {
      booking: {
        include: {
          service: true,
        },
      },
    },
  });
};




export const paymentService = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getSinglePayment,
};