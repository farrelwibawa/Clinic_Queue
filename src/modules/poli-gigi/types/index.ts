export interface PoliGigiQueueTicket {
  name: string;
  queue_number: string;
  patient_name: string;
  clinic_room: string;
  status: 'Menunggu' | 'Dipanggil' | string;
}

export interface PoliGigiQueueResponse {
  data: PoliGigiQueueTicket[];
}
