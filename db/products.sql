CREATE TABLE public.products
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    user_id bigint NOT NULL,
    name text NOT NULL,
    amount bigint NOT NULL,
    location integer[] NOT NULL,
    create_time timestamp without time zone NOT NULL,
    update_time timestamp without time zone NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;