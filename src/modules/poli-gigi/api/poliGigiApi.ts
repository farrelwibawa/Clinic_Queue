import { PoliGigiQueueTicket, PoliGigiQueueResponse } from '../types';

export const fetchPoliGigiQueues = async (): Promise<PoliGigiQueueTicket[]> => {
  try {
    const response = await fetch('/api/poli-gigi', {
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

    const json = await response.json() as PoliGigiQueueResponse;
    return json.data || [];
  } catch (error) {
    console.error('Error fetching Poli Gigi queues:', error);
    throw error;
  }
};
