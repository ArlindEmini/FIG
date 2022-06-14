CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `full_name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `user_type` smallint,
  `contact` varchar(255),
  `created_date` timestamp,
  `updated_date` timestamp,
  `qr_code` varchar(255),
  `timeoff_available` varchar(255),
  `is_deleted` boolean
);

CREATE TABLE `working_hours` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `action_type` int,
  `created_date` timestamp
);

CREATE TABLE `time_off` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `type` int,
  `status` smallint,
  `comment` varchar(255),
  `created_date` timestamp,
  `start_date` timestamp,
  `end_date` timestamp
);

CREATE TABLE `clients` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `email` varchar(255),
  `client_type` int,
  `address` varchar(255),
  `contact` varchar(255),
  `created_date` timestamp,
  `updated_date` timestamp,
  `is_deleted` boolean
);

CREATE TABLE `contracts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `client_id` int,
  `created_by` int,
  `affair_limit` int,
  `created_date` timestamp
);

CREATE TABLE `affairs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `client_id` int,
  `contract_id` int,
  `affair_type` int,
  `comment` varchar(255),
  `start_date` timestamp,
  `end_date` timestamp,
  `address` varchar(255),
  `status` varchar(255),
  `created_date` timestamp
);

CREATE TABLE `user_affairs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `affair_id` int,
  `user_id` int,
  `start_date` timestamp,
  `end_date` timestamp,
  `status` timestamp
);

CREATE TABLE `notifications` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `affair_id` int,
  `time_off_id` int,
  `created_by` int,
  `created_date` timestamp,
  `next_run` timestamp,
  `notification_type` smallint
);

ALTER TABLE `working_hours` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_affairs` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_affairs` ADD FOREIGN KEY (`affair_id`) REFERENCES `affairs` (`id`);

ALTER TABLE `time_off` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `contracts` ADD FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

ALTER TABLE `contracts` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `affairs` ADD FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

ALTER TABLE `affairs` ADD FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`);

ALTER TABLE `notifications` ADD FOREIGN KEY (`affair_id`) REFERENCES `affairs` (`id`);

ALTER TABLE `notifications` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
