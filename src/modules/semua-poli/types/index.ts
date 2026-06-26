export interface SemuaPoliQueueTicket {
  name: string;
  queue_number: string;
  patient_name: string;
  clinic_room: string;
  status: 'Menunggu' | 'Dipanggil' | 'Selesai';
  modified: string;
}

export interface SemuaPoliQueueResponse {
  data: SemuaPoliQueueTicket[];
}
