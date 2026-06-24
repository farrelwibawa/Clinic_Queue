'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar } from 'lucide-react';

export const HeaderClock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return <div className="h-16"></div>;
  }

  const dateString = format(time, 'EEEE, dd MMMM yyyy', { locale: id });
  const timeString = format(time, 'HH:mm', { locale: id });

  return (
    <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-green-50">
      <Calendar className="w-10 h-10 text-green-600" />
      <div className="flex flex-col items-end">
        <span className="text-gray-600 font-medium">{dateString}</span>
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-bold text-green-800 tracking-tight">{timeString}</span>
          <span className="text-green-600 font-semibold text-lg bg-green-100 px-2 py-0.5 rounded-md">WIB</span>
        </div>
      </div>
    </div>
  );
};
