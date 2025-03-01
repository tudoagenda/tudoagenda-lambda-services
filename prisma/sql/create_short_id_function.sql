-- Create a function to generate short alphanumeric IDs
CREATE OR REPLACE FUNCTION gen_short_id()
RETURNS CHAR(8) AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  result CHAR(8) := '';
  i INTEGER := 0;
  chars_length INTEGER := length(chars);
BEGIN
  -- Generate an 8-character random string
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * chars_length)::integer + 1, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql VOLATILE; 