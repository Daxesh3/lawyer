import React from 'react';
import FeeLetter from './components/FeeLetter';
import { HeaderLogo } from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLogo />
      <main className="container mx-auto px-4 py-8">
        <FeeLetter />
      </main>
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Fee Letter Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;