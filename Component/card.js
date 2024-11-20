import React, { useState, useEffect } from 'react';
import './styles/card.css';

export default function Card({ title, card }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?limit=${card}&tri=asc`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        console.error('Erreur lors de la récupération des produits:', data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [card]);

  return (
    <div className="card-container">
      <h1 className="card-title">{title}</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="cards">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <img className="card-content-img" src={product.images[0]} alt={product.name} />
                  <h2 className="card-content-title">{product.name}</h2>
                  <p className="card-content-desc">{product.description}</p>
                  <p className="card-content-prix">{product.price} €</p>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}
