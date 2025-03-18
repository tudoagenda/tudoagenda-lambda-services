-- Function to generate a short ID for URLs
CREATE OR REPLACE FUNCTION gen_short_id()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INT := 0;
  chars_length INT := length(chars);
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * chars_length) + 1, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql; 