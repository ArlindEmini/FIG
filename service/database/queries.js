//User queries
export const getUserByUsername = `
SELECT
id,
email,
username,
full_name,
password,
user_type,
contact
created_date,
updated_date
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
created_date,
updated_date
FROM users
WHERE id = :id
and is_deleted = 0
LIMIT 1;
`;

export const insertUserQuery = `
INSERT INTO
users (full_name, email, username, password, user_type, contact, created_date, updated_date, is_deleted)
VALUES (:full_name, :email, :username, :password, :user_type, :contact, NOW(), NOW(), 0);
`;

export const updatePasswordQuery = `
UPDATE users
SET password = :password, updated_date = NOW()
WHERE id = :id;
`;

export const fetchAllQuery = `
SELECT * from users where is_deleted = 0
`;

export const updateUserQuery = `
UPDATE users
SET full_name = :full_name, email = :email, username = :username, password = :password, contact = :contact, is_deleted = 0, updated_date = NOW()
WHERE id = :id;
`;

export const deleteUserQuery = `
UPDATE users
SET is_deleted = 1, updated_date = NOW()
WHERE id = :id;
`;

export const checkUserExistenceQuery = `
SELECT * from users where username = :username AND email = :email
LIMIT 1
`;

//Client queries
export const getclientByEmail = `
SELECT
id,
email,
full_name,
client_type,
contact,
created_date,
updated_date
FROM clients
WHERE email = :email
and is_deleted = 0
LIMIT 1;
`;

export const getClientById = `
SELECT
id,
email,
full_name,
client_type,
contact,
created_date,
updated_date
FROM clients
WHERE id = :id
and is_deleted = 0
LIMIT 1;
`;

export const insertClientQuery = `
INSERT INTO
clients (full_name, email, client_type, contact, created_date, updated_date, is_deleted)
VALUES (:full_name, :email, :client_type, :contact, NOW(), NOW(), 0);
`;

export const fetchAllClients = `
SELECT * from clients where is_deleted = 0
`;

export const updateClientQuery = `
UPDATE clients
SET full_name = :full_name, email = :email, contact = :contact, is_deleted = 0, updated_date = NOW()
WHERE id = :id;
`;

export const deleteClientQuery = `
UPDATE clients
SET is_deleted = 1, updated_date = NOW()
WHERE id = :id;
`;

export const checkClientExistenceQuery = `
SELECT * from clients where full_name = :full_name AND email = :email
LIMIT 1
`;


//contract queries
export const insertContractQuery = `
INSERT INTO
contracts (client_id, contract_details, created_by, affair_limit, signed_date, end_date, created_date)
VALUES (:client_id, :contract_details, :created_by, :affair_limit, :signed_date, :end_date, NOW());
`;

export const getContractById = `
SELECT *
FROM contracts
WHERE id = :id limit 1;
`;

export const updateContractQuery = `
UPDATE contracts
SET client_id = :client_id, contract_details = :contract_details, affair_limit = :affair_limit, signed_date = :signed_date, end_date = :end_date, updated_date = NOW()
WHERE id = :id;
`;

export const fetchAllContracts = `
SELECT * FROM contracts
`;

export const deleteContract = `
DELETE FROM contracts WHERE id = :id;
`;

export const checkContractExistence = `
SELECT * FROM contracts WHERE client_id = :client_id AND signed_date = :signed_date AND end_date = :end_date AND affair_limit = :affair_limit limit 1;
`;