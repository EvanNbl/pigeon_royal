import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
        <div className="cards">
          <div className="card">
            <div className="card-content">
              <div className="card-content-img-loading" />
              <div className="card-content-div-text">
                <div className="card-content-title-loading" />
                <div className="card-content-prix-loading" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-content-img-loading" />
              <div className="card-content-div-text">
                <div className="card-content-title-loading" />
                <div className="card-content-prix-loading" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-content-img-loading" />
              <div className="card-content-div-text">
                <div className="card-content-title-loading" />
                <div className="card-content-prix-loading" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-content-img-loading" />
              <div className="card-content-div-text">
                <div className="card-content-title-loading" />
                <div className="card-content-prix-loading" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cards">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Link href={"/product/" + product.id} key={index} className="card">
                <div className="card-content">
                  <img className="card-content-img" src={product.images[0]} alt={product.name} />
                  <div className="card-content-div-text">
                    <h2 className="card-content-title">{product.name}</h2>
                    <p className="card-content-prix">{product.price} €</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}
