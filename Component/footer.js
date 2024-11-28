// footer.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo_white.svg';
import './styles/footer.css';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-logo">
                    <Image src={logo} alt="Logo" />
                    <p>©Pigeon Royal 2024 - V0.0.03 112422 </p>
                </div>
            </div>
        </footer>
    );
}
