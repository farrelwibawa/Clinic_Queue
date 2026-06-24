import React from 'react';
import { ClipboardList } from 'lucide-react';
import { QueueCardTheme } from './QueueCard';

export interface QueueTableData {
  id: string;
  queueNumber: string;
  patientName: string;
  destinationName: string;
}

interface QueueTableProps {
  theme: Extract<QueueCardTheme, 'green' | 'teal' | 'blue'>; // Currently only green, teal, blue
  title: string;
  queues: QueueTableData[];
}

const themeStyles = {
  green: {
    border: 'border-green-100',
    iconBg: 'bg-green-100',
    iconText: 'text-green-700',
    headerText: 'text-green-800',
    thBg: 'bg-green-700',
    rowHover: 'hover:bg-green-50/50',
    queueText: 'text-green-700',
  },
  teal: {
    border: 'border-teal-100',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-700',
    headerText: 'text-teal-800',
    thBg: 'bg-teal-700',
    rowHover: 'hover:bg-teal-50/50',
    queueText: 'text-teal-700',
  },
  blue: {
    border: 'border-blue-100',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-700',
    headerText: 'text-blue-800',
    thBg: 'bg-blue-700',
    rowHover: 'hover:bg-blue-50/50',
    queueText: 'text-blue-700',
  },
};

export const QueueTable: React.FC<QueueTableProps> = ({ theme, title, queues }) => {
  const styles = themeStyles[theme];

  return (
    <div className={`bg-white rounded-3xl shadow-lg border ${styles.border} overflow-hidden h-full flex flex-col min-h-0`}>
      <div className="p-4 lg:p-6 border-b border-gray-100 flex items-center space-x-3 bg-white relative z-10">
        <div className={`${styles.iconBg} p-2 rounded-xl`}>
          <ClipboardList className={`w-6 h-6 ${styles.iconText}`} />
        </div>
        <h2 className={`text-xl font-bold ${styles.headerText} tracking-wide`}>{title}</h2>
      </div>

      <div className="flex-1 overflow-auto px-4 lg:px-6 pb-4 lg:pb-6 pt-0 min-h-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`${styles.thBg} text-white`}>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider rounded-tl-xl rounded-bl-xl w-1/4">Nomor Antrian</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider w-1/2">Nama Pasien</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider rounded-tr-xl rounded-br-xl w-1/4">Destinasi Poli</th>
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
              queues.map((q, idx) => (
                <tr 
                  key={q.id} 
                  className={`border-b border-gray-50 ${styles.rowHover} transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className={`py-3 px-4 font-bold ${styles.queueText} text-lg`}>{q.queueNumber}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{q.patientName}</td>
                  <td className="py-3 px-4 text-gray-600 font-medium">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {q.destinationName}
                    </span>
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
