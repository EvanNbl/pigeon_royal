import React from 'react';
import Navbar from '@/Component/navbar';
import "../styles/globals.css";

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?limit=5`);

    // Vérifie que la réponse est OK (code 200)
    if (!res.ok) {
      throw new Error(`Erreur API: ${res.statusText}`);
    }

    const products = await res.json();

    return { props: { products } };
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return { props: { products: [] } }; // Retourne une liste vide si erreur
  }
}

export default function Home({ products }) {
  return (
    <div>
      <Navbar />

      {/* <h1>Nos Produits</h1>

      <div>
        {products.length === 0 ? (
          <p>Aucun produit disponible</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{ marginBottom: '20px' }}>
              <h2>{product.name}</h2>
              <img src={product.images} alt={product.name} style={{ width: '200px', height: '270px' }} />
              <p>{product.description}</p>
              <p>{product.price} EUR</p>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
}
