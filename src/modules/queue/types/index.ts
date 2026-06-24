export interface QueueTicket {
  name: string;
  queue_number: string;
  patient: string;
  destination_clinic: string;
  status: string;
}

export interface QueueResponse {
  data: QueueTicket[];
}
