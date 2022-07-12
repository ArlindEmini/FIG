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

//     <<<==== pto(time_off) queries ====>>>

export const insertPtoQuery = `
INSERT INTO
time_off (user_id, type, comment,  created_date, start_date, end_date )
VALUES (:user_id, :type, :comment, NOW(),  :start_date, :end_date);
`;

export const getPtoByUserId = `
SELECT
id,
user_id,
type,
comment,
created_date,
start_date,
end_date,
status
FROM time_off
WHERE user_id = :user_id
`;

export const getUserAndTimeOff = `
select 
u.id,
u.full_name,
u.timeoff_available,
t.start_date,
t.end_date,
DATEDIFF(t.end_date, t.start_date) as req_date_off,
t.is_approved from time_off t 
inner join users u on t.user_id = u.id where t.user_id = :user_id
`;

export const getAvailableTimeOff = `
SELECT
id,
timeoff_available
FROM users
WHERE id = :id
LIMIT 1;
`;

export const updatePtoStatus  = `
UPDATE time_off SET status= :status WHERE id= :id
`

// select u.id, u.full_name, u.timeoff_available, t.start_date, t.end_date, DATEDIFF(t.end_date, t.start_date) as req_date, t.is_approved from time_off t inner join users u on t.user_id = u.id where t.user_id = 2
// contract queries
// export const insertContractQuery = `
// `;

// export const getContractById = `
// `;

// export const updateContractQuery = `
// `;

// export const fetchAllContracts = `
// `;

// export const deleteContract = `
// `;

// export const checkContractExistence = `
// `;

// export const getContractByClientId = `
// `;

// export const getByClientAndUserId = `
// `;

// export const fetchByUserId = `
// `;
