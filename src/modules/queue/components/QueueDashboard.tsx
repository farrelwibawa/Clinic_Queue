'use client';

import React, { useEffect, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { Activity, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { queueMachine } from '../machines/queueMachine';
import { useQueueAnnouncer } from '../hooks/useQueueAnnouncer';
import { HeaderClock } from '../../shared/components/HeaderClock';
import { QueueCard } from '../../shared/components/QueueCard';
import { QueueTable } from '../../shared/components/QueueTable';

export const QueueDashboard = () => {
  const [state, send] = useMachine(queueMachine);

  // Send initial FETCH event on mount if idle
  useEffect(() => {
    if (state.matches('idle')) {
      send({ type: 'FETCH' });
    }
  }, [state, send]);

  const queues = state.context.queues;

  const { currentQueue, nextQueue, upcomingQueues } = useMemo(() => {
    // Current queue: status "Dipanggil", picked by the latest modification
    const current = queues
      .filter((q) => q.status === 'Dipanggil')
      .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())[0] || null;

    // Menunggu queues
    const waiting = queues
      .filter((q) => q.status === 'Menunggu')
      .sort((a, b) => {
        // Basic string sort is usually fine for P001, P002
        // But let's handle it safely
        return a.queue_number.localeCompare(b.queue_number, undefined, { numeric: true });
      });

    const next = waiting.length > 0 ? waiting[0] : null;
    const upcoming = waiting.length > 1 ? waiting.slice(1) : [];

    return {
      currentQueue: current,
      nextQueue: next,
      upcomingQueues: upcoming,
    };
  }, [queues]);

  const { isSoundEnabled, toggleSound } = useQueueAnnouncer(currentQueue);

  return (
    <div className="h-screen bg-slate-50 p-4 lg:p-6 flex flex-col font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-100 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 translate-y-1/3 -translate-x-1/4 pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center mb-4 lg:mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-green-600 p-3 rounded-2xl shadow-lg shadow-green-200">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Klinik <span className="text-green-700">SatuSehat</span>
            </h1>
            <p className="text-gray-500 font-medium">Sehat Anda, Prioritas Kami</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 lg:space-x-4">
          <Link
            href="/"
            className="p-3 rounded-full shadow-sm transition-colors border bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </Link>
          <button
            onClick={toggleSound}
            className={`p-3 rounded-full shadow-sm transition-colors border ${
              isSoundEnabled 
                ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
            }`}
            title={isSoundEnabled ? 'Matikan Suara Panggilan' : 'Aktifkan Suara Panggilan'}
          >
            {isSoundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
          <HeaderClock theme="green" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-4 lg:gap-5 h-full min-h-0">
          <QueueCard
            variant="current"
            theme="green"
            title="ANTRIAN REGISTRASI"
            icon={Activity}
            queueNumber={currentQueue?.queue_number || null}
            patientName={currentQueue?.patient || null}
            destinationName={currentQueue?.destination_clinic || null}
          />
          <QueueCard
            variant="next"
            theme="blue"
            title="ANTRIAN SELANJUTNYA"
            icon={Activity}
            queueNumber={nextQueue?.queue_number || null}
            patientName={nextQueue?.patient || null}
            destinationName={nextQueue?.destination_clinic || null}
          />
        </div>

        {/* Right Column */}
        <div className="h-full bg-white/50 rounded-3xl p-1 shadow-sm backdrop-blur-sm border border-white min-h-0">
          <QueueTable
            theme="green"
            title="DAFTAR ANTRIAN SETELAHNYA"
            queues={upcomingQueues.map(q => ({
              id: q.name,
              queueNumber: q.queue_number,
              patientName: q.patient,
              destinationName: q.destination_clinic
            }))}
          />
        </div>
      </main>
    </div>
  );
};
