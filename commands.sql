-- docker exec -it 82914 psql -U postgres postgres
-- docker start 82914b

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs (author, url, title) values ('Matti Leinonen', 'www.programmingworld.com/react', 'Learning React');
insert into blogs (author, url, title) values ('Liisa Lappalainen', 'www.programmingworld.com/docker', 'Docker');
insert into blogs (author, url, title) values ('Matti Leinonen', 'www.programmingworld.com/python', 'About Python');