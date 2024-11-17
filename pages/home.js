import React from 'react';
import Navbar from '@/Component/navbar';
import Card from '@/Component/card';
import Footer from '@/Component/footer';
import "../styles/globals.css";
import "../styles/home.css";

export default function Home({ products }) {
  return (
    <div className="home">
      <Navbar />
      <div className="video-container">
        <video autoPlay loop className="video" preload="auto" playsInline muted>
          <source src="../pub.mp4" type="video/mp4" />
        </video>
      </div>
      <Card title="NOUVELLE COLLECTION" type="home"/>
      <Footer />
    </div>
  );
}
