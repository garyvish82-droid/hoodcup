-- Update handle_new_user to also create the client record
-- This runs as SECURITY DEFINER so it bypasses RLS completely
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _phone TEXT;
  _name  TEXT;
BEGIN
  _phone := NEW.raw_user_meta_data->>'phone';
  _name  := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Guest');

  -- Create profile (ignore if already exists)
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, _name)
  ON CONFLICT (user_id) DO NOTHING;

  -- Assign client role (ignore if already exists)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client')
  ON CONFLICT (user_id, role) DO NOTHING;

  -- Create client loyalty record if phone provided
  IF _phone IS NOT NULL AND _phone <> '' THEN
    INSERT INTO public.clients (user_id, name, phone)
    VALUES (NEW.id, _name, _phone)
    ON CONFLICT (phone) DO UPDATE
      SET user_id = EXCLUDED.user_id,
          name    = EXCLUDED.name;
  END IF;

  RETURN NEW;
END;
$$;
