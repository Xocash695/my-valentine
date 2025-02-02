import { NextResponse } from 'next/server';

export async function POST(request) {
  const { code } = await request.json();
  
  // Update the correct code to match
  const CORRECT_CODE = "1435";
  
  if (code === CORRECT_CODE) {
    return NextResponse.json({ 
      message: "You are loved, you are valued, you are enough. ❤️" 
    });
  }
  
  return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
} 