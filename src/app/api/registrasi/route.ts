import { NextResponse } from 'next/server';

const BASE_URL = process.env.ERP_BASE_URL;
let cachedSid: string | null = null;

async function loginAndGetSid() {
  const response = await fetch(`${BASE_URL}/api/method/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify({
      usr: process.env.ERP_USERNAME,
      pwd: process.env.ERP_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to login to ERPNext');
  }

  // Extract cookies. `set-cookie` header can contain multiple cookies
  // In Next.js App Router API routes, response.headers.get('set-cookie') returns a string.
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    const match = setCookieHeader.match(/sid=([^;]+)/);
    if (match) {
      cachedSid = match[1];
      return cachedSid;
    }
  }
  
  // If we reach here, check if we can get multiple headers
  const cookies = response.headers.getSetCookie ? response.headers.getSetCookie() : [];
  for (const cookie of cookies) {
    if (cookie.startsWith('sid=')) {
      cachedSid = cookie.split(';')[0].split('=')[1];
      return cachedSid;
    }
  }

  throw new Error('No sid found in login response');
}

export async function GET() {
  try {
    if (!cachedSid) {
      await loginAndGetSid();
    }

    let url = new URL(`${BASE_URL}/api/resource/Registration Queue Ticket`);
    url.searchParams.append('fields', JSON.stringify(['name', 'queue_number', 'patient', 'destination_clinic', 'status', 'modified']));
    url.searchParams.append('limit_page_length', '0');

    let response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Cookie': `sid=${cachedSid}`
      },
      cache: 'no-store',
    });

    // If unauthorized or forbidden, try logging in again once
    if (response.status === 401 || response.status === 403) {
      await loginAndGetSid();
      response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Cookie': `sid=${cachedSid}`
        },
        cache: 'no-store',
      });
    }

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API proxy error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
