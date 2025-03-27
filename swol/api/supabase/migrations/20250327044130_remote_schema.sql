

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "nflweeklypicks";


ALTER SCHEMA "nflweeklypicks" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";








ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$$;


ALTER FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$$;


ALTER FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_claims"("uid" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select raw_app_meta_data from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$$;


ALTER FUNCTION "public"."get_claims"("uid" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_my_claim"("claim" "text") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$$;


ALTER FUNCTION "public"."get_my_claim"("claim" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_my_claims"() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$$;


ALTER FUNCTION "public"."get_my_claims"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.user_profile (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_claims_admin"() RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
  BEGIN
    IF session_user = 'authenticator' THEN
      --------------------------------------------
      -- To disallow any authenticated app users
      -- from editing claims, delete the following
      -- block of code and replace it with:
      -- RETURN FALSE;
      --------------------------------------------
      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        return false; -- jwt expired
      END IF;
      If current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role' THEN
        RETURN true; -- service role users have admin rights
      END IF;
      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true
      ELSE
        return false; -- user does NOT have claims_admin set to true
      END IF;
      --------------------------------------------
      -- End of block 
      --------------------------------------------
    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$$;


ALTER FUNCTION "public"."is_claims_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data || 
            json_build_object(claim, value)::jsonb where id = uid;
        return 'OK';
      END IF;
    END;
$$;


ALTER FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "nflweeklypicks"."games" (
    "id" bigint NOT NULL,
    "away_team_id" bigint NOT NULL,
    "home_team_id" bigint NOT NULL,
    "away_team_score" "text",
    "home_team_score" "text",
    "winner_team_id" bigint,
    "weekly_schedule_id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "start_date" timestamp with time zone NOT NULL,
    "short_name" "text" NOT NULL
);


ALTER TABLE "nflweeklypicks"."games" OWNER TO "postgres";


ALTER TABLE "nflweeklypicks"."games" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "nflweeklypicks"."game_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "nflweeklypicks"."teams" (
    "id" bigint NOT NULL,
    "name" character varying NOT NULL,
    "external_id" bigint NOT NULL
);


ALTER TABLE "nflweeklypicks"."teams" OWNER TO "postgres";


ALTER TABLE "nflweeklypicks"."teams" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "nflweeklypicks"."teams_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "nflweeklypicks"."weekly_schedules" (
    "id" bigint NOT NULL,
    "week_number" "text" NOT NULL,
    "open_date" timestamp with time zone,
    "close_date" timestamp with time zone
);


ALTER TABLE "nflweeklypicks"."weekly_schedules" OWNER TO "postgres";


ALTER TABLE "nflweeklypicks"."weekly_schedules" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "nflweeklypicks"."weekly_schedules_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."gym_checkin" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "user_id" "uuid" NOT NULL,
    "checkin_date" timestamp with time zone NOT NULL
);


ALTER TABLE "public"."gym_checkin" OWNER TO "postgres";


ALTER TABLE "public"."gym_checkin" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."gym_checkin_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."user_profile" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "user_id" "uuid" NOT NULL,
    "email" character varying NOT NULL,
    "full_name" character varying,
    "avatar_url" character varying,
    "picture_url" character varying,
    "username" character varying,
    "updated_at" timestamp with time zone,
    "synced_profile" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."user_profile" OWNER TO "postgres";


ALTER TABLE "public"."user_profile" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."user_profile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "nflweeklypicks"."games"
    ADD CONSTRAINT "game_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "nflweeklypicks"."teams"
    ADD CONSTRAINT "teams_external_id_key" UNIQUE ("external_id");



ALTER TABLE ONLY "nflweeklypicks"."teams"
    ADD CONSTRAINT "teams_name_key" UNIQUE ("name");



ALTER TABLE ONLY "nflweeklypicks"."teams"
    ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "nflweeklypicks"."weekly_schedules"
    ADD CONSTRAINT "weekly_schedules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."gym_checkin"
    ADD CONSTRAINT "gym_checkin_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "nflweeklypicks"."games"
    ADD CONSTRAINT "games_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "nflweeklypicks"."teams"("external_id");



ALTER TABLE ONLY "nflweeklypicks"."games"
    ADD CONSTRAINT "games_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "nflweeklypicks"."teams"("external_id");



ALTER TABLE ONLY "nflweeklypicks"."games"
    ADD CONSTRAINT "games_weekly_schedule_id_fkey" FOREIGN KEY ("weekly_schedule_id") REFERENCES "nflweeklypicks"."weekly_schedules"("id");



ALTER TABLE ONLY "nflweeklypicks"."games"
    ADD CONSTRAINT "games_winner_team_id_fkey" FOREIGN KEY ("winner_team_id") REFERENCES "nflweeklypicks"."teams"("external_id");



ALTER TABLE ONLY "public"."gym_checkin"
    ADD CONSTRAINT "gym_checkin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."user_profile"
    ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



CREATE POLICY "Enable read access for all users" ON "nflweeklypicks"."teams" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable read for authenticated users only" ON "nflweeklypicks"."games" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable read for authenticated users only" ON "nflweeklypicks"."weekly_schedules" FOR SELECT TO "authenticated" USING (true);



ALTER TABLE "nflweeklypicks"."games" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "nflweeklypicks"."teams" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "nflweeklypicks"."weekly_schedules" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Disable delete" ON "public"."user_profile" FOR DELETE USING (false);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."gym_checkin" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."gym_checkin" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable select for users based on user_id" ON "public"."gym_checkin" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Enable select for users based on user_id" ON "public"."user_profile" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."gym_checkin" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Enable update for users based on user_id" ON "public"."user_profile" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."gym_checkin" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_profile" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "nflweeklypicks" TO "anon";
GRANT USAGE ON SCHEMA "nflweeklypicks" TO "authenticated";
GRANT USAGE ON SCHEMA "nflweeklypicks" TO "service_role";



REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";























































































































































































GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_claim"("uid" "uuid", "claim" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_claim"("uid" "uuid", "claim" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_claims"("uid" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_my_claim"("claim" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_my_claims"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_claims_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_claim"("uid" "uuid", "claim" "text", "value" "jsonb") TO "service_role";









GRANT ALL ON TABLE "nflweeklypicks"."games" TO "anon";
GRANT ALL ON TABLE "nflweeklypicks"."games" TO "authenticated";
GRANT ALL ON TABLE "nflweeklypicks"."games" TO "service_role";



GRANT ALL ON SEQUENCE "nflweeklypicks"."game_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "nflweeklypicks"."game_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "nflweeklypicks"."game_id_seq" TO "service_role";



GRANT ALL ON TABLE "nflweeklypicks"."teams" TO "anon";
GRANT ALL ON TABLE "nflweeklypicks"."teams" TO "authenticated";
GRANT ALL ON TABLE "nflweeklypicks"."teams" TO "service_role";



GRANT ALL ON SEQUENCE "nflweeklypicks"."teams_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "nflweeklypicks"."teams_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "nflweeklypicks"."teams_id_seq" TO "service_role";



GRANT ALL ON TABLE "nflweeklypicks"."weekly_schedules" TO "anon";
GRANT ALL ON TABLE "nflweeklypicks"."weekly_schedules" TO "authenticated";
GRANT ALL ON TABLE "nflweeklypicks"."weekly_schedules" TO "service_role";



GRANT ALL ON SEQUENCE "nflweeklypicks"."weekly_schedules_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "nflweeklypicks"."weekly_schedules_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "nflweeklypicks"."weekly_schedules_id_seq" TO "service_role";















GRANT ALL ON TABLE "public"."gym_checkin" TO "anon";
GRANT ALL ON TABLE "public"."gym_checkin" TO "authenticated";
GRANT ALL ON TABLE "public"."gym_checkin" TO "service_role";



GRANT ALL ON SEQUENCE "public"."gym_checkin_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."gym_checkin_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."gym_checkin_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_profile" TO "anon";
GRANT ALL ON TABLE "public"."user_profile" TO "authenticated";
GRANT ALL ON TABLE "public"."user_profile" TO "service_role";



GRANT ALL ON SEQUENCE "public"."user_profile_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_profile_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_profile_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON SEQUENCES  TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON FUNCTIONS  TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "nflweeklypicks" GRANT ALL ON TABLES  TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
