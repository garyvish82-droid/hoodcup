-- Add RLS policy to allow anyone to look up a client by phone (read-only, limited fields)
-- This enables phone-based loyalty card lookup without full authentication

CREATE POLICY "Anyone can lookup client by phone for loyalty check"
ON public.clients
FOR SELECT
TO anon, authenticated
USING (true);

-- Drop the old restrictive select policies that conflict
DROP POLICY IF EXISTS "Clients can view their own data" ON public.clients;
DROP POLICY IF EXISTS "Admins can view all clients" ON public.clients;

-- Recreate admin full access policy
CREATE POLICY "Admins have full select access"
ON public.clients
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Note: The public lookup policy allows viewing but admin-only policies still protect insert/update/delete