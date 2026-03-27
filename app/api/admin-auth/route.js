import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { password } = await request.json();

    // Senha definida na variável de ambiente ADMIN_PASSWORD
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: 'Senha de admin não configurada.' }, { status: 500 });
    }

    if (password !== adminPassword) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
    }

    // Busca todos os leads ordenados do mais recente
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ leads: data }, { status: 200 });

  } catch (err) {
    console.error('Erro no admin-auth:', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
