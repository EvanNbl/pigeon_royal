import React, { useState, useEffect } from 'react';
import Navbar from '@/Component/navbar';
import Card from '@/Component/card';
import Footer from '@/Component/footer';
import "../styles/globals.css";
import "../styles/home.css";

export default function Home() {
  const [apiStatus, setApiStatus] = useState('🔴');

  const checkApiStatus = async () => {
    try {
      const response = await fetch('/api/status'); 
      if (response.ok) {
        setApiStatus('🟢');
      } else {
        setApiStatus('🔴');
      }
    } catch (error) {
      setApiStatus('🔴');
      console.error("Erreur lors de la vérification de l'API:", error);
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  return (
    <div className="home">
      <div className="home-header">
        <p>Dev Version - Build 0.0.02 112420 | [ version mobile: 🔴, version web: 🟢, api: {apiStatus} ]</p>
      </div>
      <Navbar />
      <div className="video-container">
        <video autoPlay loop className="video" preload="auto" playsInline muted>
          <source src="../pub.mp4" type="video/mp4" />
        </video>
      </div>
      <Card title="NOUVELLE COLLECTION" type="home" card="4" />
      <Footer />
    </div>
  );
}
