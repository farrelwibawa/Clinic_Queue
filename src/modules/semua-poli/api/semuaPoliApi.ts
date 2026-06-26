import { SemuaPoliQueueTicket, SemuaPoliQueueResponse } from '../types';

export const fetchSemuaPoliQueues = async (): Promise<SemuaPoliQueueTicket[]> => {
  try {
    const response = await fetch('/api/semua-poli', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch: ${response.status} - ${errorText}`);
    }

    const json = await response.json() as SemuaPoliQueueResponse;
    return json.data || [];
  } catch (error) {
    console.error('Error fetching Semua Poli queues:', error);
    throw error;
  }
};
