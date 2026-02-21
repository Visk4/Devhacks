import React from 'react';
import { HelpCircle } from 'lucide-react';

const HelpButton = () => {
  return (
    <button className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium shadow-lg shadow-blue-900/20 transition-colors z-50">
      <HelpCircle className="w-4 h-4" />
      Help
    </button>
  );
};

export default HelpButton;