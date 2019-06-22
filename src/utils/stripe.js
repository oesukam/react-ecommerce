const stripe = window.Stripe(process.env.STRIPE_PUBLISHER_KEY);

export default stripe;