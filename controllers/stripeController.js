// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { user_id, products } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: `Product ${item.id}` },
        unit_amount: 2000,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    metadata: {
      products: JSON.stringify(products),
      user_id: user_id,
    },
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ url: session.url });
};
