import React from 'react';
import { ClipboardList, Activity } from 'lucide-react';
import { QueueTicket } from '../types';

interface UpcomingQueuesTableProps {
  queues: QueueTicket[];
}

export const UpcomingQueuesTable: React.FC<UpcomingQueuesTableProps> = ({ queues }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col min-h-0">
      <div className="p-4 lg:p-6 border-b border-gray-100 flex items-center space-x-3 shrink-0">
        <div className="bg-green-100 p-2 rounded-lg">
          <ClipboardList className="w-6 h-6 text-green-700" />
        </div>
        <h2 className="text-xl font-bold text-green-800 tracking-wide">DAFTAR ANTRIAN SETELAHNYA</h2>
      </div>

      <div className="flex-1 overflow-auto px-4 lg:px-6 pb-4 lg:pb-6 pt-0 min-h-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="py-3 px-4 lg:px-6 rounded-l-xl font-semibold">Nomor Antrian</th>
              <th className="py-3 px-4 lg:px-6 font-semibold">Nama Pasien</th>
              <th className="py-3 px-4 lg:px-6 rounded-r-xl font-semibold">Destinasi Poli</th>
            </tr>
          </thead>
          <tbody>
            {queues.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  Tidak ada antrian selanjutnya.
                </td>
              </tr>
            ) : (
              queues.map((queue, index) => (
                <tr 
                  key={queue.name} 
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="py-3 px-4 lg:px-6 font-bold text-green-700">{queue.queue_number}</td>
                  <td className="py-3 px-4 lg:px-6 text-gray-700 font-medium">{queue.patient}</td>
                  <td className="py-3 px-4 lg:px-6 text-gray-600 flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span>{queue.destination_clinic}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
