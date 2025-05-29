import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, comment, rating } = req.body;

    if (!name || !comment || typeof rating !== 'number') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const avatar = name.charAt(0).toUpperCase(); // 👈 Generate avatar from name

    const { data, error } = await supabase
      .from('reviews')
      .insert([{ name, comment, rating, avatar }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: 'Failed to insert review' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
