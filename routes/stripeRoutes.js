const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createCheckoutSession } = require("../controllers/stripeController");
const { processOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    if (process.env.NODE_ENV !== "production") {
      event = req.body; // Skip signature check
    } else {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"], //sig
        process.env.STRIPE_WEBHOOK_SECRET
      );
    }
    if (event.type === "checkout.session.completed") {
      processOrder(event.data.object);
    }
    res.json({ received: true });
  }
);

module.exports = router;
