//User queries
export const getUserByUsername = `
SELECT
id,
email,
username,
full_name,
password,
user_type,
contact,
created_date,
updated_date,
timeoff_available
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
updated_date,
timeoff_available
FROM users
WHERE id = :id
and is_deleted = 0
LIMIT 1;
`;

export const insertUserQuery = `
INSERT INTO
users (full_name, email, username, password, user_type, contact, created_date, updated_date, timeoff_available, is_deleted)
VALUES (:full_name, :email, :username, :password, :user_type, :contact, NOW(), NOW(), :timeoff_available, 0);
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
SET full_name = :full_name, email = :email, username = :username, password = :password, contact = :contact, is_deleted = 0, updated_date = NOW(), timeoff_available = :timeoff_available
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
address,
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
clients (full_name, email, client_type, contact, address, created_date, updated_date, is_deleted)
VALUES (:full_name, :email, :client_type, :contact,:address, NOW(), NOW(), 0);
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

export const userCheckIn = `
INSERT INTO
working_hours (user_id, checkin_time)
VALUES (:id, NOW());
`;

export const cleanerCheckIn = `
INSERT INTO
working_hours (user_id, client_id, checkin_time)
VALUES (:id, :client_id, NOW());
`;

export const userCheckOut = `
UPDATE working_hours
SET checkout_time = NOW()
WHERE id = :id;
`;

export const cleanerCheckOut = `
UPDATE working_hours
SET checkout_time = NOW()
WHERE id = :id;
`;

export const getCleanerCheckInDetails = `
SELECT * from working_hours where user_id = :id AND client_id = :client_id AND DATE(checkin_time) = CURDATE() AND checkout_time IS NULL LIMIT 1
`;

export const getCheckinDetails = `
SELECT * from working_hours where user_id = :id AND DATE(checkin_time) = CURDATE() AND checkout_time IS NULL LIMIT 1
`;

export const fetchAllCheckinReports = `
SELECT u.full_name , checkin_time, checkout_time,  timediff(checkout_time, checkin_time) as total FROM working_hours
inner join users u on u.id = user_id
where cast(checkin_time as date) >= :start_date and cast(checkin_time as date) <= :end_date
`;

export const fetchCheckinReportsClients = `
SELECT c.full_name as client, u.full_name as cleaner , checkin_time, checkout_time,  timediff(checkout_time, checkin_time) as total FROM working_hours
inner join clients c on c.id = client_id
inner join users u on u.id = user_id
where client_id = :id and cast(checkin_time as date) >= :start_date and cast(checkin_time as date) <= :end_date
`;

//     <<<==== pto(time_off) queries ====>>>
export const getAllPtos = `
SELECT * from time_off
WHERE is_approved = 0
`;
export const getAllCurrentPtos = `
SELECT u.*, t.*
FROM users u
INNER JOIN (
  SELECT * FROM time_off
  WHERE is_approved = 1 AND end_date >= :date AND start_date <= :date
) t ON u.id = t.user_id;
`;

export const insertPtoQuery = `
INSERT INTO
time_off (user_id, type, comment, days_requested, is_approved, created_date, start_date, end_date)
VALUES (:user_id, :type, :comment, :days_requested, :is_approved, NOW(),  :start_date, :end_date);
`;

export const getPtoByUserId = `
SELECT
id,
user_id,
type,
comment,
created_date,
start_date,
end_date
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

export const updatePtoStatus = `
UPDATE time_off SET is_approved= :is_approved WHERE id= :id;
`;
export const updatePto = `
UPDATE users SET timeoff_available = :timeOffAvailableStr WHERE id = :uid
`;

//     <<<==== notifications(Notifications) queries ====>>>
export const getAllNotifications = `
SELECT * from notifications
`;

export const insertNotificationQuery = `
INSERT INTO
notifications (affair_id, time_off_id, created_date, message )
VALUES (:affair_id, :time_off_id, NOW(), :message);
`;

//     <<<==== pto(time_off) queries ====>>>

export const getPtoById = `
SELECT time_off.user_id, time_off.*, users.*
FROM time_off
INNER JOIN users ON time_off.user_id = users.id
WHERE time_off.id = :id;
`;

// select u.id, u.full_name, u.timeoff_available, t.start_date, t.end_date, DATEDIFF(t.end_date, t.start_date) as req_date, t.is_approved from time_off t inner join users u on t.user_id = u.id where t.user_id = 2
// contract queries
// export const insertContractQuery = `
// `;
//contract queries
export const insertContractQuery = `
INSERT INTO
contracts (client_id, contract_details, created_by, signed_date, end_date, created_date)
VALUES (:client_id, :contract_details, :created_by, :signed_date, :end_date, NOW());
`;

export const getContractById = `
SELECT *
FROM contracts
WHERE id = :id limit 1;
`;

export const updateContractQuery = `
UPDATE contracts
SET client_id = :client_id, contract_details = :contract_details, signed_date = :signed_date, end_date = :end_date
WHERE id = :id;
`;

export const fetchAllContracts = `
SELECT * FROM contracts
`;

export const deleteContract = `
DELETE FROM contracts WHERE id = :id;
`;

export const checkContractExistence = `
SELECT * FROM contracts WHERE client_id = :client_id AND signed_date = :signed_date AND end_date = :end_date limit 1;
`;

//Affair Queries
export const insertAffairQuery = `
INSERT INTO
affairs (client_id, contract_id, affair_type, affair_limit, affair_description, start_date, end_date, address, status, created_date, price, pass_type, qr_code)
VALUES (:client_id, :contract_id, :affair_type, :affair_limit, :affair_description, :start_date, :end_date, :address, :status, now(), :price, :pass_type, :qr_code);
`;

export const getAffairById = `
SELECT *
FROM affairs
WHERE id = :id limit 1;
`;

export const getAffairByQrCode = `
SELECT *
FROM affairs
WHERE qr_code = :qr_code limit 1;
`;

export const updateAffairQuery = `
UPDATE affairs
SET affair_type = :affair_type, affair_limit = :affair_limit, affair_description = :affair_description, start_date = :start_date, end_date = :end_date, address = :address, status = :status, price = :price, pass_type = :pass_type, qr_code = :qr_code
WHERE id = :id;
`;

export const fetchAllAffairs = `
SELECT * FROM affairs
`;

// export const fetchAllUrgenciesBetweenDates = `
// SELECT * FROM affairs
// WHERE start_date BETWEEN 'start_date' AND 'end_date';
// `;

export const deleteAffair = `
DELETE FROM affairs WHERE id = :id;
`;

export const passCountQuery = `
SELECT count(DISTINCT date) as count FROM passes WHERE affair_id = :id and check_out is not null;
`;

export const checkAffairExistence = `
SELECT * FROM affairs WHERE client_id = :client_id AND contract_id = :contract_id AND affair_type = :affair_type AND affair_limit = :affair_limit AND affair_description = :affair_description limit 1;
`;

//Passes Queries
export const passCheckIn = `
INSERT INTO
passes (user_id, affair_id, check_in, is_confirmed, date)
VALUES (:user_id, :affair_id, NOW(), 0, :date);
`;

export const passCheckInBAU = `
INSERT INTO
passes (user_id, affair_id, check_in, check_out, is_confirmed, date)
VALUES (:user_id, :affair_id, NOW(), NOW(), 1, :date);
`;

export const passCheckOut = `
UPDATE passes
SET check_out = NOW()
WHERE id = :id;
`;

export const passConfirm = `
UPDATE passes
SET is_confirmed = 1
WHERE id = :id;
`;

export const getPassById = `
SELECT *
FROM passes
WHERE id = :id limit 1;
`;

export const fetchAllPasses = `
SELECT * FROM passes
`;

export const fetchAllReportsPasses = `
SELECT a.*, p.*
FROM affairs a
INNER JOIN (
  SELECT * FROM passes
  WHERE check_in BETWEEN :start_date AND :end_date
) p ON p.affair_id = a.id ;
`;

export const fetchPassByAffairId = `
SELECT * FROM passes
WHERE affair_id = :affair_id;
`;

export const fetchPassByUserId = `
SELECT * FROM passes
WHERE user_id = :user_id;
`;

export const deletePass = `
DELETE FROM passes WHERE id = :id;
`;

export const fetchAllUrgencies = `SELECT * FROM urgencies WHERE status = 0`;

export const insertUrgencyQuery = `
INSERT INTO
urgencies (urgency_description, address, price, status, created_date,employee_type)
VALUES (:urgency_description, :address, :price, 0 , NOW(), :employee_type);
`;

export const getUrgencyById = `
SELECT *
FROM urgencies
WHERE id = :id limit 1;
`;

export const updateUrgencyQuery = `
UPDATE urgencies
SET urgency_description = :urgency_description, address = :address, price = :price
WHERE id = :id;
`;

export const deleteUrgency = `
DELETE FROM urgencies WHERE id = :id;
`;

export const passCheckInUregency = `
UPDATE urgencies
SET start_date = NOW(), end_date = NOW(), status = 1
WHERE id = :urgencyId;
`;

export const fetchAllUrgenciesPasses = `SELECT * FROM urgencies WHERE status = 1`;
