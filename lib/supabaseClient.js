// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lrekozijxxfcexvhhdwr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZWtvemlqeHhmY2V4dmhoZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDI2NjQsImV4cCI6MjA2NDA3ODY2NH0.FUWRPix9cFiEySEPv92DWgx20m8wKyPydUi9dfBjETc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
