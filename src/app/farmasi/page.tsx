import { FarmasiDashboard } from '../../modules/farmasi/components/FarmasiDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Antrian Farmasi | Klinik SatuSehat',
  description: 'Sistem Antrian Farmasi Terintegrasi',
};

export default function FarmasiPage() {
  return <FarmasiDashboard />;
}
