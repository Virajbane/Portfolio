// pages/api/review.js
import { createClient } from '@supabase/supabase-js';

// ⚠️ Use environment variables safely
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch reviews error:', error);
        return res.status(500).json({ message: 'Error fetching reviews', details: error.message });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Exception fetching reviews:', error);
      return res.status(500).json({ message: 'Unexpected error', details: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, comment, rating } = req.body;

      if (!name || !comment || typeof rating !== 'number') {
        return res.status(400).json({ message: 'Invalid input' });
      }

      const avatar = name.charAt(0).toUpperCase();

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ name, comment, rating, avatar }])
        .select()
        .single();

      if (error) {
        console.error('Insert error:', error);
        return res.status(500).json({ message: 'Failed to insert review' });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Insert exception:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // ❌ Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
