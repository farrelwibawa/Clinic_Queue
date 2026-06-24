import Link from 'next/link';
import { Activity, Users, Stethoscope, Pill } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="z-10 mb-12 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-green-600 p-3 rounded-2xl shadow-lg shadow-green-600/30">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">Klinik SatuSehat</h1>
        </div>
        <p className="text-gray-500 text-lg font-medium">Pilih modul antrian yang ingin ditampilkan</p>
      </div>

      {/* Cards Container */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl">
        
        {/* Card 1: Registrasi */}
        <Link href="/registrasi" className="group">
          <div className="bg-white rounded-3xl p-8 shadow-md border border-green-100 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-green-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-green-400 group-hover:h-3 transition-all" />
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-100 transition-colors">
              <Users className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Antrian Registrasi</h2>
            <p className="text-gray-500">Monitor antrian pendaftaran pasien secara real-time.</p>
          </div>
        </Link>

        {/* Card 2: Semua Poli */}
        <Link href="/semua-poli" className="group">
          <div className="bg-white rounded-3xl p-8 shadow-md border border-teal-100 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-600 to-teal-400 group-hover:h-3 transition-all" />
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 text-teal-600 group-hover:bg-teal-100 transition-colors">
              <Stethoscope className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Antrian Semua Poli</h2>
            <p className="text-gray-500">Panggilan antrian untuk semua ruangan poli.</p>
          </div>
        </Link>

        {/* Card 3: Farmasi */}
        <Link href="/farmasi" className="group">
          <div className="bg-white rounded-3xl p-8 shadow-md border border-blue-100 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:h-3 transition-all" />
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-100 transition-colors">
              <Pill className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Antrian Farmasi</h2>
            <p className="text-gray-500">Layanan antrian pengambilan obat di farmasi.</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
