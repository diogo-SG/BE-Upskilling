CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    username VARCHAR(255)
) TABLESPACE pg_default;
ALTER TABLE "user" OWNER TO postgres;
CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER
) TABLESPACE pg_default;
ALTER TABLE "order" OWNER TO postgres;