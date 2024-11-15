import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Récupérer le terme de recherche depuis les paramètres de la requête
      const query = req.query.query || '';
      const limit = parseInt(req.query.limit) || 10;

      if (!query) {
        return res.status(400).json({ error: 'Le terme de recherche est requis' });
      }

      // Récupérer les produits correspondant à la recherche
      const products = await stripe.products.list({
        limit: 100,
        active: true, 
      });

      // Filtrer les produits en fonction du nom qui contient le terme de recherche
      const filteredProducts = products.data.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      // Si aucun produit ne correspond à la recherche, retourner un message spécifique
      if (filteredProducts.length === 0) {
        return res.status(404).json({ message: 'Aucun produit trouvé' });
      }

      // Limiter le nombre de produits retournés en fonction du paramètre "limit"
      const limitedProducts = filteredProducts.slice(0, limit);

      // Récupérer les prix pour chaque produit
      const productsWithPrices = await Promise.all(
        limitedProducts.map(async (product) => {
          const price = await stripe.prices.retrieve(product.default_price);

          return {
            id: product.id,
            name: product.name,
            images: product.images,
          };
        })
      );

      // Retourner la liste filtrée des produits avec leurs prix
      res.status(200).json(productsWithPrices);
    } catch (error) {
      console.error("Erreur lors de la recherche des produits Stripe:", error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
