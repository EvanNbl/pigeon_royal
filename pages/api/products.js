import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const limit = parseInt(req.query.limit) || 3;
      const sort = req.query.sort || 'asc'; // Valeur par défaut : 'asc' pour ascendant

      const products = await stripe.products.list({
        limit,
      });

      const productsWithPrices = await Promise.all(
        products.data.map(async (product) => {
          const price = await stripe.prices.retrieve(product.default_price);

          return {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            price: price.unit_amount / 100,
            currency: price.currency,
            created: product.created,
          };
        })
      );

      // Tri des produits par date
      productsWithPrices.sort((a, b) => {
        if (sort === 'asc') {
          return a.created - b.created;
        } else if (sort === 'desc') {
          return b.created - a.created;
        } else {
          return 0;
        }
      });

      res.status(200).json(productsWithPrices);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits Stripe:", error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
