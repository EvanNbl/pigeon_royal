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
    const searchRef = useRef(null);

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsSearchActive(false);
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
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Rechercher..."
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
