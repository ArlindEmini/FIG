export const getUserByUsername = `
SELECT
id,
email,
username,
password,
created_at AS createdAt,
updated_at AS updatedAt
FROM users
WHERE username = :username
and is_deleted = 0
LIMIT 1;
`;

export const getUserById = `
SELECT
id,
email,
username,
password,
created_at AS createdAt,
updated_at AS updatedAt
FROM users
WHERE id = :id
and is_deleted = 0
LIMIT 1;
`;

export const insertUserQuery = `
INSERT INTO
users (username, password, created_at, updated_at, is_deleted)
VALUES (:username, :password, NOW(), NOW(), 0);
`;

export const reInsertUserQuery = `
UPDATE users
SET username = :username, password = :password, updated_at = NOW(), is_deleted = 1
WHERE id = :id
`;

export const updatePasswordQuery = `
UPDATE users
SET password = :password, updated_at = NOW()
WHERE id = :id;
`;

export const fetchAllQuery = `
SELECT * from users
`;
