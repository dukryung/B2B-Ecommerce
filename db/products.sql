-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    amount bigint NOT NULL,
    location integer NOT NULL,
    create_time timestamp without time zone NOT NULL,
    update_time timestamp without time zone NOT NULL,
    bid_time timestamp without time zone,
    end_time timestamp without time zone,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    amount bigint NOT NULL,
    location integer NOT NULL,
    create_time timestamp without time zone NOT NULL,
    update_time timestamp without time zone NOT NULL,
    bid_time timestamp without time zone,
    end_time timestamp without time zone,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    amount bigint NOT NULL,
    location integer NOT NULL,
    create_time timestamp without time zone NOT NULL,
    update_time timestamp without time zone NOT NULL,
    bid_time timestamp without time zone,
    end_time timestamp without time zone,
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

-- Table: public.participation

-- DROP TABLE IF EXISTS public.participation;

CREATE TABLE IF NOT EXISTS public.participation
(
    id bigint NOT NULL,
    product_id bigint NOT NULL,
    participants_id bigint NOT NULL,
    amount bigint NOT NULL,
    create_time timestamp without time zone NOT NULL DEFAULT now(),
    update_time timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT participation_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.participation
    OWNER to postgres;;