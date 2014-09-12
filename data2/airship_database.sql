/*
 Navicat PostgreSQL Backup

 Source Server         : airship
 Source Server Version : 90305
 Source Host           : localhost
 Source Database       : steve
 Source Schema         : public

 Target Server Version : 90305
 File Encoding         : utf-8

 Date: 09/12/2014 15:14:30 PM
*/

-- ----------------------------
--  Sequence structure for context_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "context_id_seq" CASCADE;
CREATE SEQUENCE "context_id_seq" INCREMENT 1 START 48 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "context_id_seq" OWNER TO "steve";

-- ----------------------------
--  Sequence structure for entity_field_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "entity_field_id_seq" CASCADE;
CREATE SEQUENCE "entity_field_id_seq" INCREMENT 1 START 11 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "entity_field_id_seq" OWNER TO "steve";

-- ----------------------------
--  Sequence structure for entity_screen_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "entity_screen_id_seq" CASCADE;
CREATE SEQUENCE "entity_screen_id_seq" INCREMENT 1 START 2 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "entity_screen_id_seq" OWNER TO "steve";

-- ----------------------------
--  Sequence structure for record_data_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "record_data_id_seq" CASCADE;
CREATE SEQUENCE "record_data_id_seq" INCREMENT 1 START 4 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "record_data_id_seq" OWNER TO "steve";

-- ----------------------------
--  Sequence structure for record_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "record_id_seq" CASCADE;
CREATE SEQUENCE "record_id_seq" INCREMENT 1 START 2 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "record_id_seq" OWNER TO "steve";

-- ----------------------------
--  Sequence structure for roles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "roles_id_seq" CASCADE;
CREATE SEQUENCE "roles_id_seq" INCREMENT 1 START 3 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "roles_id_seq" OWNER TO "steve";

-- ----------------------------
--  Sequence structure for user_roles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "user_roles_id_seq" CASCADE;
CREATE SEQUENCE "user_roles_id_seq" INCREMENT 1 START 4 MAXVALUE 9223372036854775807 MINVALUE 1 CACHE 1;
ALTER TABLE "user_roles_id_seq" OWNER TO "steve";

-- ----------------------------
--  Table structure for account_roles
-- ----------------------------
DROP TABLE IF EXISTS "account_roles" CASCADE;
CREATE TABLE "account_roles" (
	"id" int4 NOT NULL DEFAULT nextval('user_roles_id_seq'::regclass),
	"role_id" int4 NOT NULL,
	"account_id" uuid NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "account_roles" OWNER TO "steve";

-- ----------------------------
--  Records of account_roles
-- ----------------------------
BEGIN;
INSERT INTO "account_roles" VALUES ('3', '1', 'bed4f63f-1d64-47c6-a1e9-c9af7002e5ac');
INSERT INTO "account_roles" VALUES ('4', '2', 'bed4f63f-1d64-47c6-a1e9-c9af7002e5ac');
COMMIT;

-- ----------------------------
--  Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "role" CASCADE;
CREATE TABLE "role" (
	"id" int4 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
	"name" varchar(50) NOT NULL COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "role" OWNER TO "steve";

-- ----------------------------
--  Records of role
-- ----------------------------
BEGIN;
INSERT INTO "role" VALUES ('1', 'admin');
INSERT INTO "role" VALUES ('2', 'user');
INSERT INTO "role" VALUES ('3', 'observer');
COMMIT;

-- ----------------------------
--  Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS "account" CASCADE;
CREATE TABLE "account" (
	"id" uuid NOT NULL,
	"username" varchar(50) NOT NULL COLLATE "default",
	"salt" varchar(255) NOT NULL COLLATE "default",
	"hashed_pwd" varchar(255) NOT NULL COLLATE "default",
	"display_name" varchar(100) NOT NULL COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "account" OWNER TO "steve";

-- ----------------------------
--  Records of account
-- ----------------------------
BEGIN;
INSERT INTO "account" VALUES ('bed4f63f-1d64-47c6-a1e9-c9af7002e5ac', 'a', 'l9bTjV4/GRnVwQZU+Dz5vcaJRZXkrjrnIi1yQUYqw5wsQT/4AxbZfFNMnEPySBrz5Och+YnGEuKfpW9Nj3tlol+woPXXpL9NJGSUESncMplWukEw3gcn5cmLDclQXC7NQWJKOT7st4anrbUc0F7IgWSnaV0CxoY2tpOV4aijP+4=', '1a07e544a243cbd323ebd3df415bfb210eb61d5a', 'Admin User');
COMMIT;

-- ----------------------------
--  Table structure for context
-- ----------------------------
DROP TABLE IF EXISTS "context" CASCADE;
CREATE TABLE "context" (
	"id" int4 NOT NULL DEFAULT nextval('context_id_seq'::regclass),
	"account_id" uuid NOT NULL,
	"entity_name" varchar(30) NOT NULL COLLATE "default",
	"employee_ids" int4[],
	"name" varchar(50) NOT NULL COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "context" OWNER TO "steve";

-- ----------------------------
--  Records of context
-- ----------------------------
BEGIN;
INSERT INTO "context" VALUES ('48', 'bed4f63f-1d64-47c6-a1e9-c9af7002e5ac', 'employee', '{1,2}', 'Search Results');
COMMIT;

-- ----------------------------
--  Table structure for entity
-- ----------------------------
DROP TABLE IF EXISTS "entity" CASCADE;
CREATE TABLE "entity" (
	"id" int4 NOT NULL,
	"name" varchar(30) NOT NULL COLLATE "default"
)
WITH (OIDS=FALSE);
ALTER TABLE "entity" OWNER TO "steve";

-- ----------------------------
--  Records of entity
-- ----------------------------
BEGIN;
INSERT INTO "entity" VALUES ('1', 'employee');
INSERT INTO "entity" VALUES ('2', 'post');
COMMIT;

-- ----------------------------
--  Table structure for entity_screen
-- ----------------------------
DROP TABLE IF EXISTS "entity_screen" CASCADE;
CREATE TABLE "entity_screen" (
	"id" int4 NOT NULL DEFAULT nextval('entity_screen_id_seq'::regclass),
	"name" varchar(30) NOT NULL COLLATE "default",
	"type" "screen_type" NOT NULL,
	"entity_id" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "entity_screen" OWNER TO "steve";

-- ----------------------------
--  Records of entity_screen
-- ----------------------------
BEGIN;
INSERT INTO "entity_screen" VALUES ('1', 'General', 'single', '1');
INSERT INTO "entity_screen" VALUES ('2', 'Home Address', 'single', '1');
COMMIT;

-- ----------------------------
--  Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS "record" CASCADE;
CREATE TABLE "record" (
	"id" int4 NOT NULL DEFAULT nextval('record_id_seq'::regclass),
	"entity_id" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "record" OWNER TO "steve";

-- ----------------------------
--  Records of record
-- ----------------------------
BEGIN;
INSERT INTO "record" VALUES ('1', '1');
INSERT INTO "record" VALUES ('2', '1');
COMMIT;

-- ----------------------------
--  Table structure for record_data
-- ----------------------------
DROP TABLE IF EXISTS "record_data" CASCADE;
CREATE TABLE "record_data" (
	"id" int4 NOT NULL DEFAULT nextval('record_data_id_seq'::regclass),
	"record_id" int4 NOT NULL,
	"entity_screen_id" int4 NOT NULL,
	"data" json NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "record_data" OWNER TO "steve";

-- ----------------------------
--  Records of record_data
-- ----------------------------
BEGIN;
INSERT INTO "record_data" VALUES ('1', '1', '1', '{"id": "320", "firstName": "Will", "surname": "Ferrell", "dateOfBirth": "1965-04-12"}');
INSERT INTO "record_data" VALUES ('2', '2', '1', '{"id": "79", "firstName": "Corey", "surname": "Feldman", "dateOfBirth": "1971-10-30"}');
INSERT INTO "record_data" VALUES ('3', '1', '2', '{"addressLine1": "65", "addressLine2": "Great Love Street", "addressLine3": "Jarrow", "addressLine4": "Tyne & Wear", "postCode": "NE43 3RE"}');
INSERT INTO "record_data" VALUES ('4', '2', '2', '{"addressLine1": "3", "addressLine2": "Kexby Avenue", "addressLine3": "Prudhoe", "addressLine4": "Tyne & Wear", "postCode": "NE4 8TY"}');
COMMIT;

-- ----------------------------
--  Table structure for entity_field
-- ----------------------------
DROP TABLE IF EXISTS "entity_field" CASCADE;
CREATE TABLE "entity_field" (
	"id" int4 NOT NULL DEFAULT nextval('entity_field_id_seq'::regclass),
	"entity_screen_id" int4 NOT NULL,
	"name" varchar(50) NOT NULL COLLATE "default",
	"label" varchar(100) NOT NULL COLLATE "default",
	"type" "field_type" NOT NULL,
	"ref_data_id" int4,
	"list_view" bool NOT NULL,
	"field_order" int4 NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "entity_field" OWNER TO "steve";

-- ----------------------------
--  Records of entity_field
-- ----------------------------
BEGIN;
INSERT INTO "entity_field" VALUES ('1', '1', 'id', 'Id', 'text', null, 't', '1');
INSERT INTO "entity_field" VALUES ('2', '1', 'firstName', 'Forename', 'text', null, 't', '2');
INSERT INTO "entity_field" VALUES ('3', '1', 'surname', 'Surname', 'text', null, 't', '3');
INSERT INTO "entity_field" VALUES ('4', '1', 'dateOfBirth', 'Date of Birth', 'date', null, 't', '4');
INSERT INTO "entity_field" VALUES ('5', '1', 'maritalStatus', 'Marital Status', 'ref_data', null, 't', '5');
INSERT INTO "entity_field" VALUES ('6', '1', 'nationality', 'Nationality', 'ref_data', null, 't', '6');
INSERT INTO "entity_field" VALUES ('7', '2', 'addressLine1', 'Number or Name', 'text', null, 't', '1');
INSERT INTO "entity_field" VALUES ('8', '2', 'addressLine1', 'Street', 'text', null, 't', '2');
INSERT INTO "entity_field" VALUES ('9', '2', 'addressLine1', 'City', 'text', null, 't', '3');
INSERT INTO "entity_field" VALUES ('10', '2', 'addressLine1', 'County', 'text', null, 't', '4');
INSERT INTO "entity_field" VALUES ('11', '2', 'postCode', 'Post Code', 'text', null, 't', '5');
COMMIT;

-- ----------------------------
--  Function structure for uuid_nil()
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_nil"() CASCADE;
CREATE FUNCTION "uuid_nil"() RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_nil'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	IMMUTABLE;
ALTER FUNCTION "uuid_nil"() OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_ns_dns()
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_ns_dns"() CASCADE;
CREATE FUNCTION "uuid_ns_dns"() RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_ns_dns'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	IMMUTABLE;
ALTER FUNCTION "uuid_ns_dns"() OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_ns_url()
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_ns_url"() CASCADE;
CREATE FUNCTION "uuid_ns_url"() RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_ns_url'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	IMMUTABLE;
ALTER FUNCTION "uuid_ns_url"() OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_ns_oid()
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_ns_oid"() CASCADE;
CREATE FUNCTION "uuid_ns_oid"() RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_ns_oid'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	IMMUTABLE;
ALTER FUNCTION "uuid_ns_oid"() OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_ns_x500()
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_ns_x500"() CASCADE;
CREATE FUNCTION "uuid_ns_x500"() RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_ns_x500'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	IMMUTABLE;
ALTER FUNCTION "uuid_ns_x500"() OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_generate_v1()
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_generate_v1"() CASCADE;
CREATE FUNCTION "uuid_generate_v1"() RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_generate_v1'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	VOLATILE;
ALTER FUNCTION "uuid_generate_v1"() OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_generate_v1mc()
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_generate_v1mc"() CASCADE;
CREATE FUNCTION "uuid_generate_v1mc"() RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_generate_v1mc'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	VOLATILE;
ALTER FUNCTION "uuid_generate_v1mc"() OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_generate_v3(uuid, text)
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_generate_v3"(uuid, text) CASCADE;
CREATE FUNCTION "uuid_generate_v3"(IN "namespace" uuid, IN "name" text) RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_generate_v3'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	IMMUTABLE;
ALTER FUNCTION "uuid_generate_v3"(IN "namespace" uuid, IN "name" text) OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_generate_v4()
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_generate_v4"() CASCADE;
CREATE FUNCTION "uuid_generate_v4"() RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_generate_v4'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	VOLATILE;
ALTER FUNCTION "uuid_generate_v4"() OWNER TO "steve";

-- ----------------------------
--  Function structure for uuid_generate_v5(uuid, text)
-- ----------------------------
DROP FUNCTION IF EXISTS "uuid_generate_v5"(uuid, text) CASCADE;
CREATE FUNCTION "uuid_generate_v5"(IN "namespace" uuid, IN "name" text) RETURNS "uuid" 
	AS '$libdir/uuid-ossp','uuid_generate_v5'
	LANGUAGE c
	COST 1
	STRICT
	SECURITY INVOKER
	IMMUTABLE;
ALTER FUNCTION "uuid_generate_v5"(IN "namespace" uuid, IN "name" text) OWNER TO "steve";

-- ----------------------------
--  Function structure for get_account(varchar, uuid)
-- ----------------------------
DROP FUNCTION IF EXISTS "get_account"(varchar, uuid) CASCADE;
CREATE FUNCTION "get_account"(IN param_username varchar, IN param_id uuid)
 RETURNS TABLE("id" uuid, username varchar, salt varchar, hashed_pwd varchar, display_name varchar, roles _varchar) AS
$BODY$
SELECT a.id, a.username, a.salt, a.hashed_pwd, a.display_name, array_agg(r.name) as roles
FROM account a
INNER JOIN account_roles ar ON a.id = ar.account_id
INNER JOIN role r ON ar.role_id = r.id
WHERE a.username = param_username OR a.id = param_id
GROUP BY a.id;
$BODY$
	LANGUAGE sql
	COST 100
	ROWS 1000
	CALLED ON NULL INPUT
	SECURITY INVOKER
	STABLE;
ALTER FUNCTION "get_account"(IN param_username varchar, IN param_id uuid) OWNER TO "steve";

-- ----------------------------
--  Function structure for set_context(uuid, varchar, varchar, _int4)
-- ----------------------------
DROP FUNCTION IF EXISTS "set_context"(uuid, varchar, varchar, _int4) CASCADE;
CREATE FUNCTION "set_context"(IN param_account_id uuid, IN param_entity_name varchar, IN param_name varchar, IN param_employee_ids _int4) RETURNS "int4" 
	AS $BODY$
INSERT INTO context (account_id, entity_name, name, employee_ids)
VALUES (param_account_id, param_entity_name, param_name, param_employee_ids)
RETURNING id
$BODY$
	LANGUAGE sql
	COST 100
	CALLED ON NULL INPUT
	SECURITY INVOKER
	VOLATILE;
ALTER FUNCTION "set_context"(IN param_account_id uuid, IN param_entity_name varchar, IN param_name varchar, IN param_employee_ids _int4) OWNER TO "steve";

-- ----------------------------
--  Function structure for get_context(uuid, varchar)
-- ----------------------------
DROP FUNCTION IF EXISTS "get_context"(uuid, varchar) CASCADE;
CREATE FUNCTION "get_context"(IN param_account_id uuid, IN param_entity_name varchar) RETURNS SETOF "public"."context" 
	AS $BODY$
SELECT * FROM context WHERE account_id = param_account_id AND entity_name = param_entity_name;
$BODY$
	LANGUAGE sql
	COST 100
	ROWS 1000
	CALLED ON NULL INPUT
	SECURITY INVOKER
	STABLE;
ALTER FUNCTION "get_context"(IN param_account_id uuid, IN param_entity_name varchar) OWNER TO "steve";

-- ----------------------------
--  Function structure for delete_context(uuid, varchar)
-- ----------------------------
DROP FUNCTION IF EXISTS "delete_context"(uuid, varchar) CASCADE;
CREATE FUNCTION "delete_context"(IN param_account_id uuid, IN param_entity_name varchar) RETURNS "void" 
	AS $BODY$
DELETE FROM context WHERE account_id = param_account_id AND entity_name = param_entity_name;
$BODY$
	LANGUAGE sql
	COST 100
	CALLED ON NULL INPUT
	SECURITY INVOKER
	VOLATILE;
ALTER FUNCTION "delete_context"(IN param_account_id uuid, IN param_entity_name varchar) OWNER TO "steve";

-- ----------------------------
--  Function structure for get_record(varchar, varchar)
-- ----------------------------
DROP FUNCTION IF EXISTS "get_record"(varchar, varchar) CASCADE;
CREATE FUNCTION "get_record"(IN param_entity_name varchar, IN param_screen_name varchar)
 RETURNS TABLE(record_id int4, field_name varchar, field_label varchar, "type" "public"."field_type", "value" text) AS
$BODY$
SELECT r.id, f.name, f.label, f.type, d.data->>(f.name) as value
FROM entity e
INNER JOIN entity_screen s ON e.id = s.entity_id
INNER JOIN entity_field f ON s.id = f.entity_screen_id
INNER JOIN record_data d ON d.entity_screen_id = s.id
INNER JOIN record r ON d.record_id = r.id
WHERE e.name = 'employee' and s.name = 'General';
$BODY$
	LANGUAGE sql
	COST 100
	ROWS 1000
	CALLED ON NULL INPUT
	SECURITY INVOKER
	STABLE;
ALTER FUNCTION "get_record"(IN param_entity_name varchar, IN param_screen_name varchar) OWNER TO "steve";

-- ----------------------------
--  Function structure for get_screens(varchar)
-- ----------------------------
DROP FUNCTION IF EXISTS "get_screens"(varchar) CASCADE;
CREATE FUNCTION "get_screens"(IN param_entity varchar)
 RETURNS TABLE("name" varchar, "type" "public"."screen_type") AS
$BODY$
SELECT s.name, s.type
FROM entity_screen s
INNER JOIN entity e ON s.entity_id = e.id
WHERE e.name = param_entity
$BODY$
	LANGUAGE sql
	COST 100
	ROWS 1000
	CALLED ON NULL INPUT
	SECURITY INVOKER
	STABLE;
ALTER FUNCTION "get_screens"(IN param_entity varchar) OWNER TO "steve";

-- ----------------------------
--  Function structure for get_record_ids_from_search(varchar, _varchar)
-- ----------------------------
DROP FUNCTION IF EXISTS "get_record_ids_from_search"(varchar, _varchar) CASCADE;
CREATE FUNCTION "get_record_ids_from_search"(IN param_search_text varchar, IN param_search_fields _varchar)
 RETURNS TABLE(record_id int4) AS
$BODY$
SELECT distinct d.record_id 
FROM record_data d
INNER JOIN entity_screen s ON d.entity_screen_id = s.id
INNER JOIN entity_field f ON f.entity_screen_id = s.id
WHERE f.name = ANY(param_search_fields) AND d.data->>(f.name) ILIKE '%' || param_search_text || '%'
$BODY$
	LANGUAGE sql
	COST 100
	ROWS 1000
	CALLED ON NULL INPUT
	SECURITY INVOKER
	STABLE;
ALTER FUNCTION "get_record_ids_from_search"(IN param_search_text varchar, IN param_search_fields _varchar) OWNER TO "steve";

-- ----------------------------
--  Function structure for set_context_from_search(uuid, varchar, varchar, _varchar)
-- ----------------------------
DROP FUNCTION IF EXISTS "set_context_from_search"(uuid, varchar, varchar, _varchar) CASCADE;
CREATE FUNCTION "set_context_from_search"(IN param_account_id uuid, IN param_entity_name varchar, IN param_search_text varchar, IN param_search_fields _varchar) RETURNS "void" 
	AS $BODY$
DELETE FROM context WHERE account_id = param_account_id AND entity_name = param_entity_name;
INSERT INTO context (account_id, entity_name, employee_ids, name)
SELECT param_account_id, param_entity_name, array_agg(record_id), 'Search Results'
FROM get_record_ids_from_search(param_search_text, param_search_fields);
$BODY$
	LANGUAGE sql
	COST 100
	CALLED ON NULL INPUT
	SECURITY INVOKER
	VOLATILE;
ALTER FUNCTION "set_context_from_search"(IN param_account_id uuid, IN param_entity_name varchar, IN param_search_text varchar, IN param_search_fields _varchar) OWNER TO "steve";

-- ----------------------------
--  Function structure for get_record_data_for_user_context(uuid, varchar, varchar)
-- ----------------------------
DROP FUNCTION IF EXISTS "get_record_data_for_user_context"(uuid, varchar, varchar) CASCADE;
CREATE FUNCTION "get_record_data_for_user_context"(IN param_account_id uuid, IN param_entity varchar, IN param_entity_screen varchar)
 RETURNS TABLE(record_id int4, "data" json) AS
$BODY$ 
SELECT d.record_id, d.data
FROM record_data d
INNER JOIN context c ON d.record_id = ANY(c.employee_ids)
INNER JOIN entity_screen s ON d.entity_screen_id = s.id
INNER JOIN entity e ON s.entity_id = e.id
WHERE e.name = param_entity AND s.name = param_entity_screen AND c.account_id = param_account_id;
$BODY$
	LANGUAGE sql
	COST 100
	ROWS 1000
	CALLED ON NULL INPUT
	SECURITY INVOKER
	STABLE;
ALTER FUNCTION "get_record_data_for_user_context"(IN param_account_id uuid, IN param_entity varchar, IN param_entity_screen varchar) OWNER TO "steve";

-- ----------------------------
--  Function structure for get_screen(varchar, varchar)
-- ----------------------------
DROP FUNCTION IF EXISTS "get_screen"(varchar, varchar) CASCADE;
CREATE FUNCTION "get_screen"(IN param_entity varchar, IN param_entity_screen varchar) RETURNS SETOF "public"."entity_field" 
	AS $BODY$
SELECT f.*
FROM entity_screen s
INNER JOIN entity_field f ON s.id = f.entity_screen_id
INNER JOIN entity e ON s.entity_id = e.id
WHERE e.name = param_entity AND s.name = param_entity_screen
$BODY$
	LANGUAGE sql
	COST 100
	ROWS 1000
	CALLED ON NULL INPUT
	SECURITY INVOKER
	STABLE;
ALTER FUNCTION "get_screen"(IN param_entity varchar, IN param_entity_screen varchar) OWNER TO "steve";


-- ----------------------------
--  Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "context_id_seq" RESTART 49 OWNED BY "context"."id";
ALTER SEQUENCE "entity_field_id_seq" RESTART 12 OWNED BY "entity_field"."id";
ALTER SEQUENCE "entity_screen_id_seq" RESTART 3 OWNED BY "entity_screen"."id";
ALTER SEQUENCE "record_data_id_seq" RESTART 5 OWNED BY "record_data"."id";
ALTER SEQUENCE "record_id_seq" RESTART 3 OWNED BY "record"."id";
ALTER SEQUENCE "roles_id_seq" RESTART 4 OWNED BY "role"."id";
ALTER SEQUENCE "user_roles_id_seq" RESTART 5 OWNED BY "account_roles"."id";
-- ----------------------------
--  Primary key structure for table account_roles
-- ----------------------------
ALTER TABLE "account_roles" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table role
-- ----------------------------
ALTER TABLE "role" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table account
-- ----------------------------
ALTER TABLE "account" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table context
-- ----------------------------
ALTER TABLE "context" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table entity
-- ----------------------------
ALTER TABLE "entity" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table entity_screen
-- ----------------------------
ALTER TABLE "entity_screen" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table record
-- ----------------------------
ALTER TABLE "record" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table record_data
-- ----------------------------
ALTER TABLE "record_data" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Primary key structure for table entity_field
-- ----------------------------
ALTER TABLE "entity_field" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

