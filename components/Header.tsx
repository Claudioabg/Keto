
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8 no-print" style={{ textShadow: '0 0 10px rgba(0, 191, 255, 0.5)' }}>
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-300">Keto</h1>
            <p className="text-lg text-blue-300 mt-2">Tu plan de nutrición keto, con sabor a Paraguay.</p>
        </header>
    );
};

export default Header;