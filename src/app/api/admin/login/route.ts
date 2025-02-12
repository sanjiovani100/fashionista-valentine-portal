import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // For development, we'll use a simple check
    // In production, you would verify against a database
    if (data.email === 'events@socialmediaville.ca' && data.password === 'admin123') {
      // Set the admin token cookie
      cookies().set('admin_token', 'development_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
} 


