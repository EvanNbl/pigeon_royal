import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
 
export default function Page() {

  const router = useRouter();
  const [product, setProduct] = useState({});
  
  // requête api sur api/product?id=
  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/product?id=${router.query.slug}`);
      const data = await response.json();
      if (response.ok) {
        setProduct(data);
      }
    }
    catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [router.query.slug]);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price} {product.currency}</p>
    </div>
  );
}