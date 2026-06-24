import React from 'react';
import { User, Activity, Bell } from 'lucide-react';
import { QueueTicket } from '../types';

interface NextQueueCardProps {
  queue: QueueTicket | null;
}

export const NextQueueCard: React.FC<NextQueueCardProps> = ({ queue }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden relative flex-1 flex flex-col justify-center">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-3 px-6 rounded-br-full w-max absolute top-0 left-0 shadow-md">
        <div className="flex items-center space-x-2 text-white">
          <Bell className="w-5 h-5 fill-current" />
          <span className="font-bold tracking-wider text-sm">ANTRIAN SELANJUTNYA</span>
        </div>
      </div>

      <div className="pt-14 pb-4 px-6 lg:px-8 relative overflow-hidden">
        {/* Background Bell Icon */}
        <Bell className="absolute -right-6 top-10 w-40 h-40 text-blue-50 opacity-50 z-0 fill-current" />
        
        <div className="relative z-10">
          <h2 className="text-blue-800 font-bold uppercase tracking-wider text-xs mb-1">
            ANTRIAN BERIKUTNYA
          </h2>
          
          <div className="text-[70px] lg:text-[80px] leading-none font-bold text-blue-800 mb-4 tracking-tighter">
            {queue?.queue_number || '-'}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-4 bg-gray-50/50 p-2 rounded-xl">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-6 h-6 text-blue-700" />
              </div>
              <div className="grid grid-cols-[140px_10px_1fr] flex-1 text-gray-700 items-center">
                <span className="font-medium">Nama Pasien</span>
                <span>:</span>
                <span className="font-bold text-gray-900">{queue?.patient || '-'}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50/50 p-2 rounded-xl">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-blue-700" />
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
