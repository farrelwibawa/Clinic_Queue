import { QueueTicket, QueueResponse } from '../types';

export const fetchQueues = async (): Promise<QueueTicket[]> => {
  try {
    const response = await fetch('/api/queue', {
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

    const json = await response.json() as QueueResponse;
    return json.data || [];
  } catch (error) {
    console.error('Error fetching queues:', error);
    throw error;
  }
};
