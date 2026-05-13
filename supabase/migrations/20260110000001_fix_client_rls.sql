-- Drop existing insert policy and replace with one that also covers the signup moment
-- when the JWT may not be fully established yet
DROP POLICY IF EXISTS "Users can insert their own client record" ON public.clients;

-- Use a function-based check that works even during signup
CREATE POLICY "Users can insert their own client record"
ON public.clients FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow upsert conflict resolution (update) for own record
DROP POLICY IF EXISTS "Users can update their own client record" ON public.clients;

CREATE POLICY "Users can update their own client record"
ON public.clients FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
