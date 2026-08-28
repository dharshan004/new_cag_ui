import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface DbOfficer {
  id: string;
  designation_id: number;
  prefix: string;
  full_name_en: string;
  email: string;
  phone: string;
  designation_title: string;
  parent_id: number | null;
  level: number;
}

interface OfficerTree {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  tier: number;
  children: OfficerTree[];
}

export async function GET(req: NextRequest) {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/officers', {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return NextResponse.json(data);
    }
    return NextResponse.json({
      id: '1',
      name: 'Shri K. Sanjay Murthy',
      designation: 'Comptroller & Auditor General of India',
      email: 'cagindia@cag.gov.in',
      phone: '+91-11-23235790',
      tier: 1,
      children: []
    });
  } catch (err: any) {
    return NextResponse.json({
      id: '1',
      name: 'Shri K. Sanjay Murthy',
      designation: 'Comptroller & Auditor General of India',
      email: 'cagindia@cag.gov.in',
      phone: '+91-11-23235790',
      tier: 1,
      children: []
    });
  }
}
