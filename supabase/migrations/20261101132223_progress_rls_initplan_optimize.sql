DROP POLICY IF EXISTS progress_select_own ON app_progress;
DROP POLICY IF EXISTS progress_insert_own ON app_progress;
DROP POLICY IF EXISTS progress_update_own ON app_progress;
DROP POLICY IF EXISTS progress_delete_own ON app_progress;

CREATE POLICY progress_select_own ON app_progress FOR SELECT TO authenticated
  USING (user_id IS NOT NULL AND user_id = (select auth.uid()));
CREATE POLICY progress_insert_own ON app_progress FOR INSERT TO authenticated
  WITH CHECK (user_id IS NOT NULL AND user_id = (select auth.uid()));
CREATE POLICY progress_update_own ON app_progress FOR UPDATE TO authenticated
  USING (user_id IS NOT NULL AND user_id = (select auth.uid()))
  WITH CHECK (user_id IS NOT NULL AND user_id = (select auth.uid()));
CREATE POLICY progress_delete_own ON app_progress FOR DELETE TO authenticated
  USING (user_id IS NOT NULL AND user_id = (select auth.uid()));
