import React from 'react';
import { Megaphone } from 'lucide-react';

export const InformationBox = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 lg:p-6 flex items-start space-x-4">
      <div className="bg-green-50 p-3 rounded-full flex-shrink-0">
        <Megaphone className="w-8 h-8 text-green-600" />
      </div>
      <div>
        <h3 className="text-green-800 font-bold text-lg mb-1">Informasi</h3>
        <p className="text-gray-600 leading-snug">
          Terima kasih telah mempercayakan kesehatan Anda kepada kami.
        </p>
      </div>
    </div>
  );
};
