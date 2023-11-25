// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NtpXqSADMqeVZrCwVbRp7b0f7Eag7h9CiWoE72COOg7Ao8SyghUMdQxbWP0GC8N7P6y4s8cHnvYNVZjsC4ONoMJ00myraCVRR');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3001';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 1,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 3001'));