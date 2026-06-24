import { FarmasiQueueResponse, FarmasiQueueTicket } from '../types';

export const fetchFarmasiQueues = async (): Promise<FarmasiQueueTicket[]> => {
  try {
    // Calling the Next.js API route we just created
    const response = await fetch('/api/farmasi', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch: ${response.status} - ${errorText}`);
    }

    const json = await response.json() as FarmasiQueueResponse;
    
    if (!json.data) {
      return [];
    }

    return json.data;
  } catch (error) {
    console.error('Error fetching farmasi queues:', error);
    throw error;
  }
};
