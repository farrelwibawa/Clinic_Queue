export interface RegistrasiTicket {
  name: string;
  queue_number: string;
  patient: string;
  destination_clinic: string;
  status: 'Menunggu' | 'Dipanggil' | 'Selesai';
  modified: string;
}

export interface RegistrasiResponse {
  data: RegistrasiTicket[];
}
