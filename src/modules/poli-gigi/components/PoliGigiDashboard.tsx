'use client';

import React, { useEffect, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { Volume2, VolumeX, ArrowLeft, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { poliGigiMachine } from '../machines/poliGigiMachine';
import { usePoliGigiAnnouncer } from '../hooks/usePoliGigiAnnouncer';
import { HeaderClock } from '../../shared/components/HeaderClock';
import { QueueCard } from '../../shared/components/QueueCard';
import { QueueTable } from '../../shared/components/QueueTable';

export const PoliGigiDashboard = () => {
  const [state, send] = useMachine(poliGigiMachine);

  useEffect(() => {
    if (state.matches('idle')) {
      send({ type: 'FETCH' });
    }
  }, [state, send]);

  const queues = state.context.queues;

  const { currentQueue, nextQueue, upcomingQueues } = useMemo(() => {
    const current = queues
      .filter((q) => q.status === 'Dipanggil')
      .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())[0] || null;

    const waiting = queues
      .filter((q) => q.status === 'Menunggu')
      .sort((a, b) => {
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

  const { isSoundEnabled, toggleSound } = usePoliGigiAnnouncer(currentQueue);

  return (
    <div className="h-screen bg-slate-50 p-4 lg:p-6 flex flex-col font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-100 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50 rounded-full blur-[100px] opacity-60 translate-y-1/3 -translate-x-1/4 pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center mb-4 lg:mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-teal-600 p-3 rounded-2xl shadow-lg shadow-teal-200">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Klinik <span className="text-teal-700">SatuSehat</span>
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
                ? 'bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200' 
                : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
            }`}
            title={isSoundEnabled ? 'Matikan Suara Panggilan' : 'Aktifkan Suara Panggilan'}
          >
            {isSoundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
          <HeaderClock theme="teal" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-4 lg:gap-5 h-full min-h-0">
          <QueueCard
            variant="current"
            theme="teal"
            title="ANTRIAN SEMUA POLI"
            icon={Stethoscope}
            queueNumber={currentQueue?.queue_number || null}
            patientName={currentQueue?.patient_name || null}
            destinationName={currentQueue?.clinic_room || null}
          />
          <QueueCard
            variant="next"
            theme="cyan"
            title="ANTRIAN BERIKUTNYA"
            icon={Stethoscope}
            queueNumber={nextQueue?.queue_number || null}
            patientName={nextQueue?.patient_name || null}
            destinationName={nextQueue?.clinic_room || null}
          />
        </div>

        {/* Right Column */}
        <div className="h-full bg-white/50 rounded-3xl p-1 shadow-sm backdrop-blur-sm border border-white min-h-0">
          <QueueTable
            theme="teal"
            title="DAFTAR ANTRIAN SETELAHNYA"
            queues={upcomingQueues.map(q => ({
              id: q.name,
              queueNumber: q.queue_number,
              patientName: q.patient_name,
              destinationName: q.clinic_room
            }))}
          />
        </div>
      </main>
    </div>
  );
};
