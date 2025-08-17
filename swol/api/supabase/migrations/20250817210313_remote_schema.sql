revoke delete on table "public"."activity" from "anon";

revoke insert on table "public"."activity" from "anon";

revoke references on table "public"."activity" from "anon";

revoke select on table "public"."activity" from "anon";

revoke trigger on table "public"."activity" from "anon";

revoke truncate on table "public"."activity" from "anon";

revoke update on table "public"."activity" from "anon";

revoke delete on table "public"."activity" from "authenticated";

revoke insert on table "public"."activity" from "authenticated";

revoke references on table "public"."activity" from "authenticated";

revoke select on table "public"."activity" from "authenticated";

revoke trigger on table "public"."activity" from "authenticated";

revoke truncate on table "public"."activity" from "authenticated";

revoke update on table "public"."activity" from "authenticated";

revoke delete on table "public"."activity" from "service_role";

revoke insert on table "public"."activity" from "service_role";

revoke references on table "public"."activity" from "service_role";

revoke select on table "public"."activity" from "service_role";

revoke trigger on table "public"."activity" from "service_role";

revoke truncate on table "public"."activity" from "service_role";

revoke update on table "public"."activity" from "service_role";

revoke delete on table "public"."gym_checkin" from "anon";

revoke insert on table "public"."gym_checkin" from "anon";

revoke references on table "public"."gym_checkin" from "anon";

revoke select on table "public"."gym_checkin" from "anon";

revoke trigger on table "public"."gym_checkin" from "anon";

revoke truncate on table "public"."gym_checkin" from "anon";

revoke update on table "public"."gym_checkin" from "anon";

revoke delete on table "public"."gym_checkin" from "authenticated";

revoke insert on table "public"."gym_checkin" from "authenticated";

revoke references on table "public"."gym_checkin" from "authenticated";

revoke select on table "public"."gym_checkin" from "authenticated";

revoke trigger on table "public"."gym_checkin" from "authenticated";

revoke truncate on table "public"."gym_checkin" from "authenticated";

revoke update on table "public"."gym_checkin" from "authenticated";

revoke delete on table "public"."gym_checkin" from "service_role";

revoke insert on table "public"."gym_checkin" from "service_role";

revoke references on table "public"."gym_checkin" from "service_role";

revoke select on table "public"."gym_checkin" from "service_role";

revoke trigger on table "public"."gym_checkin" from "service_role";

revoke truncate on table "public"."gym_checkin" from "service_role";

revoke update on table "public"."gym_checkin" from "service_role";

revoke delete on table "public"."programs" from "anon";

revoke insert on table "public"."programs" from "anon";

revoke references on table "public"."programs" from "anon";

revoke select on table "public"."programs" from "anon";

revoke trigger on table "public"."programs" from "anon";

revoke truncate on table "public"."programs" from "anon";

revoke update on table "public"."programs" from "anon";

revoke delete on table "public"."programs" from "authenticated";

revoke insert on table "public"."programs" from "authenticated";

revoke references on table "public"."programs" from "authenticated";

revoke select on table "public"."programs" from "authenticated";

revoke trigger on table "public"."programs" from "authenticated";

revoke truncate on table "public"."programs" from "authenticated";

revoke update on table "public"."programs" from "authenticated";

revoke delete on table "public"."programs" from "service_role";

revoke insert on table "public"."programs" from "service_role";

revoke references on table "public"."programs" from "service_role";

revoke select on table "public"."programs" from "service_role";

revoke trigger on table "public"."programs" from "service_role";

revoke truncate on table "public"."programs" from "service_role";

revoke update on table "public"."programs" from "service_role";

revoke delete on table "public"."user_profile" from "anon";

revoke insert on table "public"."user_profile" from "anon";

revoke references on table "public"."user_profile" from "anon";

revoke select on table "public"."user_profile" from "anon";

revoke trigger on table "public"."user_profile" from "anon";

revoke truncate on table "public"."user_profile" from "anon";

revoke update on table "public"."user_profile" from "anon";

revoke delete on table "public"."user_profile" from "authenticated";

revoke insert on table "public"."user_profile" from "authenticated";

revoke references on table "public"."user_profile" from "authenticated";

revoke select on table "public"."user_profile" from "authenticated";

revoke trigger on table "public"."user_profile" from "authenticated";

revoke truncate on table "public"."user_profile" from "authenticated";

revoke update on table "public"."user_profile" from "authenticated";

revoke delete on table "public"."user_profile" from "service_role";

revoke insert on table "public"."user_profile" from "service_role";

revoke references on table "public"."user_profile" from "service_role";

revoke select on table "public"."user_profile" from "service_role";

revoke trigger on table "public"."user_profile" from "service_role";

revoke truncate on table "public"."user_profile" from "service_role";

revoke update on table "public"."user_profile" from "service_role";

alter table "public"."gym_checkin" drop constraint "gym_checkin_activity_id_fkey";

alter table "public"."gym_checkin" add column "notes" text;

alter table "public"."gym_checkin" add column "program_id" bigint;

alter table "public"."gym_checkin" add constraint "gym_checkin_program_id_fkey" FOREIGN KEY (program_id) REFERENCES public.programs(id) not valid;

alter table "public"."gym_checkin" validate constraint "gym_checkin_program_id_fkey";

alter table "public"."gym_checkin" add constraint "gym_checkin_activity_id_fkey" FOREIGN KEY (activity_id) REFERENCES public.activity(id) not valid;

alter table "public"."gym_checkin" validate constraint "gym_checkin_activity_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_claim(uid uuid, claim text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_claim(uid uuid, claim text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_claims(uid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select raw_app_meta_data from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_claim(claim text)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_claims()
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.user_profile (user_id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_claims_admin()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.set_claim(uid uuid, claim text, value jsonb)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$
;


