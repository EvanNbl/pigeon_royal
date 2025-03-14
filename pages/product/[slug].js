import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/Component/navbar';
import Footer from '@/Component/footer';
import '../../styles/globals.css';
import '../../styles/product.css';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Fetch product data when slug is available
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/product?id=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        console.error('Error fetching product data');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!product) return;
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });
      
      const { url } = await response.json();
      
      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  if (loading) {
    return (
      <div className="product-page">
        <Navbar />
        <div className="product-loading">
          <div className="product-loading-image"></div>
          <div className="product-loading-details">
            <div className="product-loading-title"></div>
            <div className="product-loading-price"></div>
            <div className="product-loading-description"></div>
            <div className="product-loading-button"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <Navbar />
        <div className="product-not-found">
          <h1>Produit non trouvé</h1>
          <p>Le produit que vous recherchez n'existe pas.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-page">
      <Navbar />
      <div className="product-container">
        <div className="product-images">
          <div className="product-main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="product-thumbnails">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`product-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} - view ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price} €</p>
          <div className="product-description">
            {product.description}
          </div>
          <button className="buy-button" onClick={handleCheckout}>
            Acheter
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}