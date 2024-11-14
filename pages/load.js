// pages/maintenance.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Maintenance() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code === process.env.NEXT_PUBLIC_ACCESS_CODE) {
      document.cookie = "access_granted=true; path=/; SameSite=Lax";
      router.push('/home');
    } else {
      setError("Code incorrect. Veuillez réessayer.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1>Site en Maintenance</h1>
      <p>Entrez le code d'accès pour continuer.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="password" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="Code d'accès" 
          style={{ padding: '10px', fontSize: '16px' }} 
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}>
          Accéder
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
