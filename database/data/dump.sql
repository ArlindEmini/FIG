CREATE DATABASE  IF NOT EXISTS `fig_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fig_db`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: fig_db
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `affairs`
--

DROP TABLE IF EXISTS `affairs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affairs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `contract_id` int DEFAULT NULL,
  `affair_type` int DEFAULT NULL,
  `affair_limit` int DEFAULT NULL,
  `affair_description` varchar(255) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` smallint DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `pass_type` smallint DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `contract_id` (`contract_id`),
  CONSTRAINT `affairs_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `affairs_ibfk_2` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affairs`
--

LOCK TABLES `affairs` WRITE;
/*!40000 ALTER TABLE `affairs` DISABLE KEYS */;
INSERT INTO `affairs` VALUES (2,2,2,1,16,'Mowing the grass','2023-06-08 00:25:24','2024-06-08 00:25:24','Mitrovice, 40000, rrg. Nexhmedin Musliu',2,'2023-01-24 21:07:19','3000',0,'abc123'),(3,2,2,2,11,'cute the grass','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovice, 40000, rrg. Nexhmedin Musliu',1,'2023-01-24 21:07:54','2000',0,NULL),(5,2,2,2,5,'cute the flowers','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovice, 40000, rrg. Zhabar',1,'2023-01-30 13:49:59','2000',0,NULL),(6,2,2,2,8,'cute the flowerssss','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovice, 40000, rrg. shupkofc',1,'2023-01-30 21:45:37','2000',0,NULL),(7,2,2,2,12,'cute the apples','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovice, 40000, rrg. Bajr',1,'2023-01-30 22:19:21','2000',0,NULL),(8,2,2,2,13,'cute the applesss','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovice, 40000, rrg. Bajrii',1,'2023-01-30 22:24:40','2000',0,NULL),(9,2,2,2,12,'cute the applesss','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovice, 40000, rrg. Bajrrii',1,'2023-01-30 22:25:53','2000',0,NULL),(10,2,2,2,16,'cute the apple','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovice, 40000, rrg. Bajrrii2',1,'2023-01-30 22:27:26','2000',0,NULL),(11,2,2,2,18,'cute the apple test','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovice, 4000, rrg. Bajrritesyi2',1,'2023-02-24 21:57:24','2000',0,'0'),(12,2,2,2,4,'cute the  test','2023-05-08 00:25:24','2024-09-08 00:25:24','Mitrovicee, 4000, rrg. Bajrritesyi2',1,'2023-02-24 21:59:29','3000',0,'0'),(13,2,2,2,5,'cute the  test','2023-05-08 00:25:24','2024-09-08 00:25:24','Micee, 4000, rrg. Bajrritesyi2',1,'2023-02-26 17:51:28','4000',0,'0');
/*!40000 ALTER TABLE `affairs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `client_type` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'John','john@mail.com',1,NULL,'+38349800700','2023-01-23 23:41:43','2023-01-23 23:50:58',0),(2,'Tyson','Tyson@mail.com',1,'rrg.Gustav Mayer, Pr, 10000','+38349800700','2023-01-23 23:49:30','2023-01-23 23:49:30',0),(3,'Alen','Alen@mail.com',1,'rrg.Gustav Mayer, Pr, 10000','+38349800700','2023-01-24 17:58:18','2023-01-24 17:58:18',0),(4,'Alejandro','Alejandro@mail.com',0,'rrg.Gustav Mayer, Pr, 10000','+38349800700','2023-01-24 17:58:51','2023-01-24 18:08:01',0);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `contract_details` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `signed_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,2,'{\"price\":1234,\"type\":\"land\"}',1,'2022-06-08 00:25:24','2023-06-08 00:25:24','2023-01-24 19:26:44'),(2,3,'{\"price\":1432,\"type\":\"land\"}',1,'2022-06-08 00:25:24','2023-06-08 00:25:24','2023-01-24 19:32:15');
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `affair_id` int DEFAULT NULL,
  `time_off_id` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (3,NULL,1,'2023-01-24 20:00:35','created new time off request '),(4,1,NULL,'2023-01-24 20:10:54','created new urgency affair '),(5,10,NULL,'2023-01-30 22:27:26','cute the apple');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passes`
--

DROP TABLE IF EXISTS `passes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `affair_id` int DEFAULT NULL,
  `check_in` timestamp NULL DEFAULT NULL,
  `check_out` timestamp NULL DEFAULT NULL,
  `is_confirmed` smallint DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passes`
--

LOCK TABLES `passes` WRITE;
/*!40000 ALTER TABLE `passes` DISABLE KEYS */;
INSERT INTO `passes` VALUES (1,1,1,'2023-01-24 21:17:21',NULL,1,NULL),(2,1,1,'2023-02-18 13:54:46','2023-02-18 13:54:46',1,'2023/2/18'),(3,1,3,'2023-02-18 13:55:33','2023-02-18 13:55:33',1,'2023/2/18'),(4,1,3,'2023-02-18 13:55:35','2023-02-18 13:55:35',1,'2023/2/18'),(5,1,3,'2023-02-18 13:55:36','2023-02-18 13:55:36',1,'2023/2/18'),(6,1,1,'2023-02-18 13:58:24',NULL,1,'2023/2/18'),(7,1,3,'2023-02-18 13:58:50','2023-02-18 13:58:50',1,'2023/2/18'),(8,1,3,'2023-02-18 13:58:51','2023-02-18 13:58:51',1,'2023/2/18'),(9,1,1,'2023-03-04 13:40:29','2023-03-04 13:40:29',1,'2023/3/4'),(10,1,2,'2023-03-04 13:42:54','2023-03-04 13:42:54',1,'2023/3/4'),(11,1,3,'2023-03-04 19:37:23','2023-03-04 19:37:23',1,'2023/3/4'),(12,1,3,'2023-03-05 18:28:51','2023-03-05 18:28:51',1,'2023/3/5'),(13,1,2,'2023-03-05 18:54:41','2023-03-05 18:54:41',1,'2023/3/5'),(14,1,2,'2023-03-05 19:22:42','2023-03-05 19:22:42',1,'2023/3/5'),(15,1,2,'2023-03-05 19:22:43','2023-03-05 19:22:43',1,'2023/3/5'),(16,1,2,'2023-03-05 19:22:43','2023-03-05 19:22:43',1,'2023/3/5');
/*!40000 ALTER TABLE `passes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_off`
--

DROP TABLE IF EXISTS `time_off`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_off` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `is_approved` smallint DEFAULT NULL,
  `days_requested` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `time_off_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_off`
--

LOCK TABLES `time_off` WRITE;
/*!40000 ALTER TABLE `time_off` DISABLE KEYS */;
INSERT INTO `time_off` VALUES (1,2,0,'Pushim dimeror','2023-01-24 20:31:25','2023-01-22 16:48:14','2023-01-25 16:48:14',NULL,'3'),(2,2,0,'Pushim dimeror','2023-01-24 20:48:36','2023-01-22 16:48:14','2023-01-25 16:48:14',1,'3'),(3,2,0,'Pushim dimeror','2023-02-21 18:15:47','2023-01-22 16:48:14','2023-01-25 16:48:14',1,'3'),(4,2,0,'Pushim dimeror','2023-03-02 19:35:56','2023-03-03 16:48:14','2023-03-09 16:48:14',1,'3'),(5,2,0,'Pushim dimeror','2023-03-02 22:15:11','2023-03-03 16:48:14','2023-03-15 16:48:14',0,'3'),(6,2,0,'Pushim dimeror','2023-03-02 22:35:35','2023-03-02 16:48:14','2023-03-15 16:48:14',2,'3'),(7,3,0,'Pushim dimeror','2023-03-14 13:43:12','2023-03-15 16:48:14','2023-03-19 16:48:14',1,'4');
/*!40000 ALTER TABLE `time_off` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urgencies`
--

DROP TABLE IF EXISTS `urgencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `urgencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `urgency_description` varchar(255) NOT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` smallint DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `employee_type` smallint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urgencies`
--

LOCK TABLES `urgencies` WRITE;
/*!40000 ALTER TABLE `urgencies` DISABLE KEYS */;
INSERT INTO `urgencies` VALUES (1,'go and clean the tree that has fallen','2023-02-27 17:23:24','2023-02-27 17:23:24','Micee, 4000, rrg. Bajrritesyi2',1,'2023-02-26 19:02:26','4000',NULL),(3,'go and clean the roads','2023-03-02 18:23:47','2023-03-02 18:23:47','Micee, 4000, rrg. Bajrritesyi2',1,'2023-03-02 18:19:25','2000',0),(4,'go and clean the roads',NULL,NULL,'Micee, 4000, rrg. Bajrritesyi2',0,'2023-03-02 18:21:08','2000',0),(5,'go and clean the roads',NULL,NULL,'Mitrovice',0,'2023-03-02 18:34:31','2000',0),(6,'go and clean the roads',NULL,NULL,'Proshtine',0,'2023-03-02 18:34:35','2000',0);
/*!40000 ALTER TABLE `urgencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_affairs`
--

DROP TABLE IF EXISTS `user_affairs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_affairs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `affair_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `status` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `affair_id` (`affair_id`),
  CONSTRAINT `user_affairs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_affairs_ibfk_2` FOREIGN KEY (`affair_id`) REFERENCES `affairs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_affairs`
--

LOCK TABLES `user_affairs` WRITE;
/*!40000 ALTER TABLE `user_affairs` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_affairs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type` smallint DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT NULL,
  `timeoff_available` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','Admin@mail.com','$2b$10$xwl53hyH53WijmCrsD3dR.LcwMnIuO7kf6rGTkXIVjVo6tge2WDPC',0,NULL,NULL,'2023-03-02 23:01:20','30',0),(2,'lindi','lindi','lindi@mail.com','$2b$10$/a/fvCLPFc695n/5orTLEOKHQb8KbfVktgIv3pGSNJGA5gMaFSnma',1,'+38349800800','2023-01-23 23:22:23','2023-01-23 23:37:47','18',0),(3,'Gaziii','Gaziii','gazi@mail.com','$2b$10$UU3EhvoiExgNnBb9wCp/wey1JPeltD.Q27IkdzFjIEY6OKKPXbG8O',1,'+38349800700','2023-01-23 23:23:49','2023-01-23 23:23:49','26',0),(4,'Ademiii','Ademiii','ademi@mail.com','$2b$10$.b4O3ri9z0WzEsOxyDug5eKDRIYXiIp9jb7MuwswkUPOIOJkwE9L6',1,'+38349800600','2023-01-23 23:24:30','2023-01-23 23:24:30','30',0),(5,'Filanjaaa','Filanjaa','filanja@mail.com','$2b$10$LqCRJJ1hpOoM8GFS1.RYmutRSpD5JtVpWgdx6YIF5ynRjiTYvIiee',2,'+38349800500','2023-01-23 23:25:08','2023-04-06 11:33:05','30',1),(6,'Fistekja','Fistekja45','Fistekja@mail.com','$2b$10$GAHnHwMg8yYou.8l7W.CROqpJxIYqJTRyHVtzYqTsUUQ6vVMiaR4a',2,'+38349800400','2023-01-23 23:25:34','2023-01-23 23:38:59','30',0),(7,'Fistekja45','Fistekja','Fistekja@mail.com','$2b$10$PmG0pH59oO8l/P9MVgQ56em58liKvZTtE4OVHsrUQvDdIKk7TIy/G',2,'+38349800400','2023-01-23 23:39:43','2023-01-23 23:40:03','30',1),(8,'arlindtest','arlindtest','arlind@mail.com','$2b$10$SIjv2qLcsPpFX/gc8zScQuOdYEMaDs.AVUFmSeLb8zHQyPmVEvG12',1,'+38349591212','2023-04-06 11:35:44','2023-05-03 11:04:48','30',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `working_hours`
--

DROP TABLE IF EXISTS `working_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `working_hours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  `checkin_time` timestamp NULL DEFAULT NULL,
  `checkout_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `working_hours_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `working_hours`
--

LOCK TABLES `working_hours` WRITE;
/*!40000 ALTER TABLE `working_hours` DISABLE KEYS */;
INSERT INTO `working_hours` VALUES (15,1,NULL,'2023-04-03 06:10:00','2023-04-03 15:10:35'),(16,1,NULL,'2023-04-02 06:41:43','2023-04-02 15:41:52'),(17,1,2,'2023-04-01 06:10:24','2023-04-01 15:00:27'),(18,1,2,'2023-04-03 14:37:40','2023-04-03 14:38:06'),(19,1,3,'2023-04-03 14:37:47','2023-04-03 14:38:02'),(20,1,2,'2023-04-03 15:09:28','2023-04-03 15:09:29'),(21,1,NULL,'2023-04-03 15:09:35','2023-04-03 15:09:36'),(22,8,NULL,'2023-04-06 11:48:56','2023-04-06 11:48:59'),(23,8,NULL,'2023-04-06 11:50:49','2023-04-06 11:50:50');
/*!40000 ALTER TABLE `working_hours` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 15:30:08
