-- Allow a newly signed-up user to create their own client record on join
CREATE POLICY "Users can insert their own client record"
ON public.clients FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own client record (needed for upsert)
CREATE POLICY "Users can update their own client record"
ON public.clients FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);
