import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500 pb-2">
        BatikGen AI
      </h1>
      <p className="text-slate-400 mt-2 text-lg">
        Generate stunning Indonesian batik-themed images with a 16:9 landscape ratio.
      </p>
    </header>
  );
};

export default Header;
