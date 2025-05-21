import React from 'react';
import { FileText } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <FileText className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold">Fee Letter Generator</h1>
        </div>
      </div>
    </header>
  );
};
