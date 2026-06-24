import React from 'react';
import { User, Activity, Plus } from 'lucide-react';
import { QueueTicket } from '../types';

interface CurrentQueueCardProps {
  queue: QueueTicket | null;
}

export const CurrentQueueCard: React.FC<CurrentQueueCardProps> = ({ queue }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-green-100 overflow-hidden relative">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 py-3 px-6 rounded-br-full w-max absolute top-0 left-0 shadow-md">
        <div className="flex items-center space-x-2 text-white">
          <User className="w-5 h-5 fill-current" />
          <span className="font-bold tracking-wider text-sm">ANTRIAN REGISTRASI</span>
        </div>
      </div>

      <div className="pt-14 pb-4 px-6 lg:px-8 relative overflow-hidden flex-1 flex flex-col justify-center">
        {/* Background Plus Icon */}
        <Plus className="absolute -right-6 top-10 w-40 h-40 text-green-50 opacity-50 z-0" strokeWidth={3} />
        
        <div className="relative z-10">
          <h2 className="text-green-800 font-bold uppercase tracking-wider text-xs mb-1">
            ANTRIAN SEKARANG
          </h2>
          
          <div className="text-[80px] lg:text-[100px] leading-none font-bold text-green-800 mb-4 tracking-tighter">
            {queue?.queue_number || '-'}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-4 bg-gray-50/50 p-2 rounded-xl">
              <div className="bg-green-100 p-2 rounded-lg">
                <User className="w-6 h-6 text-green-700" />
              </div>
              <div className="grid grid-cols-[140px_10px_1fr] flex-1 text-gray-700 items-center">
                <span className="font-medium">Nama Pasien</span>
                <span>:</span>
                <span className="font-bold text-gray-900">{queue?.patient || '-'}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50/50 p-2 rounded-xl">
              <div className="bg-green-100 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-green-700" />
              </div>
              <div className="grid grid-cols-[140px_10px_1fr] flex-1 text-gray-700 items-center">
                <span className="font-medium">Destinasi Poli</span>
                <span>:</span>
                <span className="font-bold text-gray-900">{queue?.destination_clinic || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
