export const getUserByUsername = `
SELECT
id,
email,
username,
full_name,
password,
user_type,
contact
created_at,
updated_at
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
full_name,
password,
user_type,
contact,
created_at,
updated_at
FROM users
WHERE id = :id
and is_deleted = 0
LIMIT 1;
`;

export const insertUserQuery = `
INSERT INTO
users (full_name, email, username, password, user_type, contact, created_at, updated_at, is_deleted)
VALUES (:full_name, :email, :username, :password, 1, :contact, NOW(), NOW(), 0);
`;

export const updatePasswordQuery = `
UPDATE users
SET password = :password, updated_at = NOW()
WHERE id = :id;
`;

export const fetchAllQuery = `
SELECT * from users where is_deleted = 0
`;

export const updateUserQuery = `
UPDATE users
SET full_name = :full_name, email = :email, username = :username, password = :password, contact = :contact, is_deleted = 0, updated_at = NOW()
WHERE id = :id;
`;

export const deleteUserQuery = `
UPDATE users
SET is_deleted = 1, updated_at = NOW()
WHERE id = :id;
`;

export const checkUserExistenceQuery = `
SELECT * from users where username = :username AND email = :email
LIMIT 1
`;