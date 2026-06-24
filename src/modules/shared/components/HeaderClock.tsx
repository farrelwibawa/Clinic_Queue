'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { QueueCardTheme } from './QueueCard';

interface HeaderClockProps {
  theme: Extract<QueueCardTheme, 'green' | 'teal'>;
}

const themeStyles = {
  green: {
    border: 'border-green-50',
    iconText: 'text-green-600',
    timeText: 'text-green-800',
    wibBg: 'bg-green-100',
    wibText: 'text-green-600',
  },
  teal: {
    border: 'border-teal-100',
    iconText: 'text-teal-600',
    timeText: 'text-teal-800',
    wibBg: 'bg-teal-100',
    wibText: 'text-teal-600',
  },
};

export const HeaderClock: React.FC<HeaderClockProps> = ({ theme }) => {
  const [time, setTime] = useState<Date | null>(null);
  const styles = themeStyles[theme];

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return <div className="h-16 w-64 bg-white/50 animate-pulse rounded-2xl"></div>;
  }

  const dateString = format(time, 'EEEE, dd MMMM yyyy', { locale: id });
  const timeString = format(time, 'HH:mm', { locale: id });

  return (
    <div className={`flex items-center space-x-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border ${styles.border}`}>
      <Calendar className={`w-10 h-10 ${styles.iconText}`} />
      <div className="flex flex-col items-end">
        <span className="text-gray-600 font-medium">{dateString}</span>
        <div className="flex items-baseline space-x-2">
          <span className={`text-4xl font-bold ${styles.timeText} tracking-tight`}>{timeString}</span>
          <span className={`${styles.wibText} font-semibold text-lg ${styles.wibBg} px-2 py-0.5 rounded-md`}>WIB</span>
        </div>
      </div>
    </div>
  );
};
