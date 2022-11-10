-- Table: public.deal_log

-- DROP TABLE IF EXISTS public.deal_log;

CREATE TABLE IF NOT EXISTS public.deal_log
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    type character varying(4) COLLATE pg_catalog."default" NOT NULL,
    trader_id bigint NOT NULL,
    create_time timestamp without time zone NOT NULL DEFAULT now(),
    update_time timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT deal_log_pkey PRIMARY KEY (id, user_id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.deal_log
    OWNER to postgres;