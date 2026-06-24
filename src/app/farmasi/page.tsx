import Link from 'next/link';
import { ArrowLeft, Pill } from 'lucide-react';

export default function FarmasiPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-700 shadow-sm">
          <Pill className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">Antrian Farmasi</h1>
        <p className="text-gray-500 mb-8 text-lg">
          Halaman antrian Farmasi sedang dalam tahap pengembangan. Segera hadir!
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
