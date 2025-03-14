import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/Component/navbar';
import Footer from '@/Component/footer';
import '../styles/globals.css';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/home');
    }, 5000);

    setLoading(false);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <Navbar />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '20px'
      }}>
        <h1 style={{ 
          fontSize: '3em', 
          fontFamily: '"allotrope", sans-serif',
          marginBottom: '20px'
        }}>
          Paiement réussi !
        </h1>
        <p style={{ 
          fontSize: '1.2em', 
          fontFamily: '"acumin-variable", sans-serif',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          Merci pour votre achat. Vous allez recevoir un e-mail de confirmation.
        </p>
        <p style={{ 
          fontSize: '1em', 
          fontFamily: '"acumin-variable", sans-serif',
          marginTop: '30px'
        }}>
          Vous serez redirigé vers la page d'accueil dans quelques secondes...
        </p>
      </div>
      <Footer />
    </div>
  );
}