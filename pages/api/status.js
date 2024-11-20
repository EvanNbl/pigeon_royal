export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  }
  