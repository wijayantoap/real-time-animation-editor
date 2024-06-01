import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://nceofknpobzxqinoaqpu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZW9ma25wb2J6eHFpbm9hcXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNDY4MDIsImV4cCI6MjAzMjgyMjgwMn0.AI9zlTqLNXHUs3fpqrA1aaUYOrgV5ohZTS4qhcFbAUQ',
);

export default supabase;
