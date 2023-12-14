CREATE TABLE servers (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    img TEXT
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE server_category (
    server_id INTEGER REFERENCES servers(id),
    category_id INTEGER REFERENCES categories(id),
    PRIMARY KEY (server_id, category_id)
);
