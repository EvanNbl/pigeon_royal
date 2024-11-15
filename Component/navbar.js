import React, { useState, useEffect, useRef } from 'react';
import './styles/navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo_2.svg';
import ico_search from '../public/ico_search.svg';
import ico_cart from '../public/ico_cart.svg';

export default function Navbar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Stocke la requête de recherche
  const [searchResults, setSearchResults] = useState([]); // Stocke les résultats de la recherche
  const searchRef = useRef(null);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchActive(false);
      setSearchResults([]); // Clear results when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Fonction pour gérer la saisie dans le champ de recherche
  const handleSearchInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) { // Démarrer la recherche après 3 caractères
      try {
        const response = await fetch(`/api/search?query=${query}&limit=5`);
        const data = await response.json();
        if (response.ok) {
            console.log(data);
          setSearchResults(data);
        } else {
          setSearchResults([]); // Aucun résultat trouvé
        }
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      }
    } else {
      setSearchResults([]); // Réinitialiser les résultats si la recherche est vide
    }
  };

  return (
    <div className="navbar">
      <div className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
        <Link href="#">Collection</Link>
        <Link href="#">Nouveauté</Link>
      </div>
      <Image src={logo} alt="Pigeon Royal Logo" className="navbar-logo" />
      <div className="navbar-icons">
        <div
          ref={searchRef}
          className={`navbar-search ${isSearchActive ? 'active' : ''}`}
          onClick={handleSearchClick}
        >
          <div className="search-icon">
            <Image src={ico_search} alt="Rechercher" width="20" height="20" />
            {isSearchActive && searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((product) => (
                        <div key={product.id} className="search-result-item">
                            <Link href={`/product/${product.id}`}>
                                <div>
                                    <img src={product.images[0]} alt={product.name} width="100" height="100" />
                                    <span>{product.name}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={handleSearchInputChange} // Gérer le changement de saisie
          />
        </div>
        <Link href="#">
          <Image src={ico_cart} alt="Panier" width="20" height="20" />
        </Link>
        <div
          className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
