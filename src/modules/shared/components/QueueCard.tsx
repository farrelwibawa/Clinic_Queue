import React from 'react';
import { LucideIcon, User, Activity } from 'lucide-react';

export type QueueCardTheme = 'green' | 'teal' | 'blue' | 'cyan';
export type QueueCardVariant = 'current' | 'next';

interface QueueCardProps {
  variant: QueueCardVariant;
  theme: QueueCardTheme;
  title: string;
  icon: LucideIcon;
  queueNumber: string | null;
  patientName: string | null;
  destinationName: string | null;
  destinationLabel?: string;
}

const themeStyles = {
  green: {
    border: 'border-green-100',
    gradient: 'from-green-700 to-green-500',
    bgLight: 'bg-green-100',
    bgLighter: 'bg-green-50',
    textMain: 'text-green-800',
    textDark: 'text-green-700',
  },
  teal: {
    border: 'border-teal-100',
    gradient: 'from-teal-700 to-teal-500',
    bgLight: 'bg-teal-100',
    bgLighter: 'bg-teal-50',
    textMain: 'text-teal-800',
    textDark: 'text-teal-700',
  },
  blue: {
    border: 'border-blue-100',
    gradient: 'from-blue-700 to-blue-500',
    bgLight: 'bg-blue-100',
    bgLighter: 'bg-blue-50',
    textMain: 'text-blue-800',
    textDark: 'text-blue-700',
  },
  cyan: {
    border: 'border-cyan-100',
    gradient: 'from-cyan-600 to-cyan-400',
    bgLight: 'bg-cyan-100',
    bgLighter: 'bg-cyan-50',
    textMain: 'text-cyan-800',
    textDark: 'text-cyan-700',
  },
};

export const QueueCard: React.FC<QueueCardProps> = ({
  variant,
  theme,
  title,
  icon: Icon,
  queueNumber,
  patientName,
  destinationName,
  destinationLabel,
}) => {
  const styles = themeStyles[theme];

  return (
    <div className={`bg-white rounded-3xl shadow-lg border ${styles.border} overflow-hidden relative flex-1 flex flex-col min-h-0 justify-center`}>
      {/* Top Banner */}
      <div className={`bg-gradient-to-r ${styles.gradient} py-2 px-4 rounded-br-full w-max absolute top-0 left-0 shadow-md`}>
        <div className="flex items-center space-x-2 text-white">
          <Icon className="w-5 h-5 fill-current" />
          <span className="font-bold tracking-wider text-sm">{title}</span>
        </div>
      </div>

      <div className="pt-12 pb-3 px-4 lg:px-6 relative overflow-hidden flex-1 flex flex-col justify-center">
        {/* Background Icon */}
        <Icon className={`absolute -right-6 top-10 w-40 h-40 ${styles.textMain} opacity-[0.03] z-0 ${variant === 'next' ? 'fill-current' : ''}`} strokeWidth={variant === 'current' ? 3 : 2} />
        
        <div className="relative z-10">
          <h2 className={`${styles.textMain} font-bold uppercase tracking-wider text-xs mb-1`}>
            {variant === 'current' ? 'ANTRIAN SEKARANG' : 'ANTRIAN BERIKUTNYA'}
          </h2>
          
          <div className={`${variant === 'current' ? 'text-6xl lg:text-[76px]' : 'text-5xl lg:text-[60px]'} leading-none font-bold ${styles.textMain} mb-2 tracking-tighter`}>
            {queueNumber || '-'}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3 bg-gray-50/50 p-1.5 rounded-xl">
              <div className={`${styles.bgLight} p-1.5 rounded-lg`}>
                <User className={`w-5 h-5 ${styles.textDark}`} />
              </div>
              <div className="grid grid-cols-[140px_10px_1fr] flex-1 text-gray-700 items-center">
                <span className="font-medium">Nama Pasien</span>
                <span>:</span>
                <span className="font-bold text-gray-900">{patientName || '-'}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-50/50 p-1.5 rounded-xl">
              <div className={`${styles.bgLight} p-1.5 rounded-lg`}>
                <Activity className={`w-5 h-5 ${styles.textDark}`} />
              </div>
              <div className="grid grid-cols-[140px_10px_1fr] flex-1 text-gray-700 items-center">
                <span className="font-medium">{destinationLabel || 'Destinasi Poli'}</span>
                <span>:</span>
                <span className="font-bold text-gray-900">{destinationName || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
