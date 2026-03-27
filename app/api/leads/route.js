import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact, need } = body;

    // Validação básica
    if (!name || !contact) {
      return NextResponse.json(
        { error: 'Nome e WhatsApp são obrigatórios.' },
        { status: 400 }
      );
    }

    // Insere no Supabase
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          nome:        name,
          contato:     contact,
          necessidade: need || 'Contato via Site',
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error('Erro ao salvar lead:', err);
    return NextResponse.json(
      { error: 'Erro interno ao salvar lead.' },
      { status: 500 }
    );
  }
}

