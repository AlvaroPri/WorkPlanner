// SupabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gzaimljsjrzcamhdwwjr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YWltbGpzanJ6Y2FtaGR3d2pyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDgwOTAzOSwiZXhwIjoyMDI2Mzg1MDM5fQ.7Gik0B0Sj0oQrU-UNYkH8RhSUO66CCEifQPowlVuVfU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
