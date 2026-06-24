export interface FarmasiQueueTicket {
  name: string;
  queue_number: string;
  patient_name: string;
  handed_counter: string;
  status: 'Menunggu' | 'Dipanggil' | 'Selesai' | string;
  modified: string;
}

export interface FarmasiQueueResponse {
  data: FarmasiQueueTicket[];
}
