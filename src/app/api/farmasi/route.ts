import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const BASE_URL = process.env.ERP_BASE_URL;
    
    // Login to get session cookie (mocking for simplicity, just copy login logic from queue/route)
    const loginData = new URLSearchParams();
    loginData.append('usr', process.env.ERP_USERNAME || '');
    loginData.append('pwd', process.env.ERP_PASSWORD || '');
    
    const loginResponse = await fetch(`${BASE_URL}/api/method/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginData.toString(),
    });

    const cookieHeader = loginResponse.headers.get('set-cookie');
    const systemCookies = cookieHeader 
      ? cookieHeader.split(',').map(c => c.split(';')[0]).join('; ') 
      : '';

    let url = new URL(`${BASE_URL}/api/resource/Pharmacy Queue Ticket`);
    url.searchParams.append('fields', JSON.stringify(['name', 'queue_number', 'patient_name', 'handed_counter', 'status', 'modified']));
    url.searchParams.append('limit_page_length', '0');

    let response = await fetch(url.toString(), {
      headers: {
        'Cookie': systemCookies,
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();

    if (data && data.data && Array.isArray(data.data)) {
      data.data = data.data.map((item: any) => {
        if (item.name) {
          const parts = item.name.split('-');
          item.queue_number = parts[parts.length - 1];
        }
        return item;
      });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
