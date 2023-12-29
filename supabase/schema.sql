
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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."get_servers_with_channels"() RETURNS TABLE("server_id" integer, "server_label" character varying, "first_category_id" integer, "first_channel_id" integer)
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
  RETURN QUERY SELECT
    servers.id,
    servers.label,
    first_category.id,
    first_channel.id
  FROM
    servers
  LEFT JOIN LATERAL (
    SELECT id
    FROM categories
    WHERE categories.server_id = servers.id
    ORDER BY id ASC
    LIMIT 1
  ) AS first_category ON true
  LEFT JOIN LATERAL (
    SELECT id
    FROM channels
    WHERE channels.category_id = first_category.id
    ORDER BY id ASC
    LIMIT 1
  ) AS first_channel ON true
  ORDER BY
    servers.id;
END;
$$;

ALTER FUNCTION "public"."get_servers_with_channels"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = current_timestamp;
  return new;
end;
$$;

ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" integer NOT NULL,
    "label" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "server_id" integer,
    CONSTRAINT "categories_name_check" CHECK (("length"("label") < 50))
);

ALTER TABLE "public"."categories" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."categories_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."categories_id_seq" OWNED BY "public"."categories"."id";

CREATE TABLE IF NOT EXISTS "public"."channels" (
    "id" integer NOT NULL,
    "category_id" integer,
    "label" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "unread" boolean DEFAULT false,
    "description" "text",
    CONSTRAINT "channels_description_check" CHECK (("length"("description") < 255)),
    CONSTRAINT "channels_label_check" CHECK (("length"("label") < 50))
);

ALTER TABLE "public"."channels" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."channels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."channels_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."channels_id_seq" OWNED BY "public"."channels"."id";

CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" bigint NOT NULL,
    "text" "text",
    "channel_id" integer,
    "profile_id" integer,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."messages" OWNER TO "postgres";

ALTER TABLE "public"."messages" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."messages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "user_id" "uuid" NOT NULL,
    "avatar_url" "text",
    "id" integer NOT NULL,
    "name" character varying(20)
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."profiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."profiles_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."profiles_id_seq" OWNED BY "public"."profiles"."id";

CREATE TABLE IF NOT EXISTS "public"."servers" (
    "id" integer NOT NULL,
    "label" character varying(255) NOT NULL,
    "img" "text",
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."servers" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."servers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."servers_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."servers_id_seq" OWNED BY "public"."servers"."id";

ALTER TABLE ONLY "public"."categories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."categories_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."channels" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."channels_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."profiles" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."profiles_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."servers" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."servers_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."channels"
    ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."servers"
    ADD CONSTRAINT "servers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "unique_user_id" UNIQUE ("user_id");

CREATE OR REPLACE TRIGGER "set_messages_updated_at" BEFORE UPDATE ON "public"."messages" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "public"."servers"("id");

ALTER TABLE ONLY "public"."channels"
    ADD CONSTRAINT "channels_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

CREATE POLICY "Enable read access for all users" ON "public"."categories" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."channels" USING (true) WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."servers" USING (true) WITH CHECK (true);

ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."channels" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."servers" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."get_servers_with_channels"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_servers_with_channels"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_servers_with_channels"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."channels" TO "anon";
GRANT ALL ON TABLE "public"."channels" TO "authenticated";
GRANT ALL ON TABLE "public"."channels" TO "service_role";

GRANT ALL ON SEQUENCE "public"."channels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."channels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."channels_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";

GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."servers" TO "anon";
GRANT ALL ON TABLE "public"."servers" TO "authenticated";
GRANT ALL ON TABLE "public"."servers" TO "service_role";

GRANT ALL ON SEQUENCE "public"."servers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."servers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."servers_id_seq" TO "service_role";

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
