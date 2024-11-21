import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// search product by id

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const product = await stripe.products.retrieve(req.query.id);
            const price = await stripe.prices.retrieve(product.default_price);

            res.status(200).json({
                id: product.id,
                name: product.name,
                description: product.description,
                images: product.images,
                price: price.unit_amount / 100,
                currency: price.currency,
                created: product.created,
            });
        } catch (error) {
            res.status(404);
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
