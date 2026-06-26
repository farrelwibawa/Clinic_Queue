import { RegistrasiTicket, RegistrasiResponse } from '../types';

export const fetchRegistrasi = async (): Promise<RegistrasiTicket[]> => {
  try {
    const response = await fetch('/api/registrasi', {
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

    const json = await response.json() as RegistrasiResponse;
    return json.data || [];
  } catch (error) {
    console.error('Error fetching queues:', error);
    throw error;
  }
};
