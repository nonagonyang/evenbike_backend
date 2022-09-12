
INSERT INTO eco_levels(level_limit)
VALUES (10),(20),(30),(40),(50),(60),(70),(90),(100);

INSERT INTO active_levels(level_limit)
VALUES (10),(20),(30),(40),(50),(60),(70),(90),(100);

INSERT INTO overall_levels(level_limit)
VALUES (10),(20),(30),(40),(50),(60),(70),(90),(100);

INSERT INTO users (username, password, email, is_admin,weight,height,eco_level,active_level,overall_level)
VALUES ('testuser1',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'testuser1@gmail.com',
        FALSE,
        100,
        160,
        2,
        3,
        4),
        ('testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'testuser2@gmail.com',
        FALSE,
        120,
        170,
        3,
        1,
        2),

       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'admin@gmail.com',
        TRUE,
        200,
        190,
        1,
        1,
        1);



INSERT INTO trips(username,start_dock,end_dock,distance,eco_points,active_points)
VALUES('testuser1',
       'street_x',
       'street_y',
       15.5,
       3,
       6
       ),
       ('testuser1',
       'street_a',
       'street_b',
       8.1,
       2,
       1
       ),
       ('testuser1',
       'street_a',
       'street_b',
       25.8,
       11,
       20
       ),
       ('testuser2',
       'street_m',
       'street_n',
       16.1,
       4,
       2);

