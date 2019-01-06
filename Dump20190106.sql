-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 34.210.153.98    Database: workhub
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Activations`
--

DROP TABLE IF EXISTS `Activations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Activations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Activations`
--

LOCK TABLES `Activations` WRITE;
/*!40000 ALTER TABLE `Activations` DISABLE KEYS */;
/*!40000 ALTER TABLE `Activations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Web Site Design','2018-12-04 09:01:17','2018-12-04 09:01:17','green'),(2,'Software Development','2018-12-04 09:01:17','2018-12-04 09:01:17','blue'),(3,'Outdoors Work','2018-12-04 09:01:17','2018-12-04 09:01:17','green'),(4,'Arts and Crafts','2018-12-04 09:01:17','2018-12-04 09:01:17','red'),(5,'Linguistics','2018-12-04 09:01:17','2018-12-04 09:01:17','blue'),(6,'Education','2018-12-04 09:01:17','2018-12-04 09:01:17','orange'),(7,'Android','2018-12-04 09:01:17','2018-12-04 09:01:17','orange'),(8,'iOS','2018-12-04 09:01:17','2018-12-04 09:01:17','orange'),(9,'Web','2018-12-04 09:01:17','2018-12-04 09:01:17',NULL),(10,'Gardening','2018-12-04 09:01:17','2018-12-04 09:01:17',NULL),(11,'Traditional Painting/Art Work','2018-12-04 09:01:17','2018-12-04 09:01:17',NULL);
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Freelancer_categories`
--

DROP TABLE IF EXISTS `Freelancer_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Freelancer_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `freelancer_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `freelancer_id` (`freelancer_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `Freelancer_categories_ibfk_1` FOREIGN KEY (`freelancer_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `Freelancer_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Freelancer_categories`
--

LOCK TABLES `Freelancer_categories` WRITE;
/*!40000 ALTER TABLE `Freelancer_categories` DISABLE KEYS */;
INSERT INTO `Freelancer_categories` VALUES (1,5,1,'2019-01-02 14:05:36','2019-01-02 14:05:36'),(8,5,2,'2019-01-02 14:10:30','2019-01-02 14:10:30'),(9,5,3,'2019-01-02 14:10:34','2019-01-02 14:10:34'),(10,5,5,'2019-01-02 14:27:03','2019-01-02 14:27:03'),(11,24,1,'2019-01-02 14:58:17','2019-01-02 14:58:17'),(12,16,5,'2019-01-02 15:00:06','2019-01-02 15:00:06'),(13,16,6,'2019-01-02 15:00:06','2019-01-02 15:00:06'),(14,16,7,'2019-01-02 15:00:06','2019-01-02 15:00:06'),(45,16,3,'2019-01-02 17:01:21','2019-01-02 17:01:21'),(46,16,4,'2019-01-02 17:01:21','2019-01-02 17:01:21'),(47,16,9,'2019-01-02 17:01:21','2019-01-02 17:01:21'),(56,26,10,'2019-01-02 18:23:47','2019-01-02 18:23:47'),(57,26,11,'2019-01-02 18:23:47','2019-01-02 18:23:47'),(67,28,1,'2019-01-06 12:33:14','2019-01-06 12:33:14'),(68,31,1,'2019-01-06 13:37:28','2019-01-06 13:37:28'),(69,31,3,'2019-01-06 13:37:34','2019-01-06 13:37:34'),(70,31,5,'2019-01-06 13:37:38','2019-01-06 13:37:38'),(82,34,3,'2019-01-06 14:03:36','2019-01-06 14:03:36'),(83,34,6,'2019-01-06 14:03:36','2019-01-06 14:03:36');
/*!40000 ALTER TABLE `Freelancer_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Freelancer_jobs`
--

DROP TABLE IF EXISTS `Freelancer_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Freelancer_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `Freelancer_jobs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `Freelancer_jobs_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Freelancer_jobs`
--

LOCK TABLES `Freelancer_jobs` WRITE;
/*!40000 ALTER TABLE `Freelancer_jobs` DISABLE KEYS */;
INSERT INTO `Freelancer_jobs` VALUES (11,26,94,NULL,NULL,'2019-01-02 18:30:54','2019-01-02 18:30:54'),(12,31,100,NULL,NULL,'2019-01-06 13:47:19','2019-01-06 13:47:19'),(13,34,102,NULL,NULL,'2019-01-06 14:01:55','2019-01-06 14:01:55'),(14,39,105,NULL,NULL,'2019-01-06 15:58:42','2019-01-06 15:58:42');
/*!40000 ALTER TABLE `Freelancer_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Job_annotations`
--

DROP TABLE IF EXISTS `Job_annotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Job_annotations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `text` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `position_x` int(11) DEFAULT NULL,
  `position_y` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Job_annotations`
--

LOCK TABLES `Job_annotations` WRITE;
/*!40000 ALTER TABLE `Job_annotations` DISABLE KEYS */;
INSERT INTO `Job_annotations` VALUES (21,87,'World\'s largest freelance services marketplace for lean entrepreneurs to focus on growth & create a successful business at affordable costs.',167,173,'2019-01-02 14:53:48','2019-01-02 14:53:48'),(24,93,'what is called an annotation called annotation',2,13,'2019-01-02 16:30:15','2019-01-02 16:30:15'),(25,94,'We have a sandy soil full of organic materials. Perfect for tulips.',30,36,'2019-01-02 18:26:29','2019-01-02 18:26:29'),(26,94,'82 tulips',84,91,'2019-01-02 18:26:40','2019-01-02 18:26:40'),(27,95,'Okey',48,74,'2019-01-03 15:09:39','2019-01-03 15:09:39'),(28,95,'asdsd',37,59,'2019-01-03 15:09:51','2019-01-03 15:09:51'),(29,95,'asd',11,21,'2019-01-03 15:10:02','2019-01-03 15:10:02'),(30,100,'The brand of the charcoal pencils should be \"Dawner Rowley\"',89,97,'2019-01-06 16:24:29','2019-01-06 16:24:29');
/*!40000 ALTER TABLE `Job_annotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Job_biddings`
--

DROP TABLE IF EXISTS `Job_biddings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Job_biddings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `freelancer_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `freelancer_id` (`freelancer_id`),
  CONSTRAINT `Job_biddings_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`id`),
  CONSTRAINT `Job_biddings_ibfk_2` FOREIGN KEY (`freelancer_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Job_biddings`
--

LOCK TABLES `Job_biddings` WRITE;
/*!40000 ALTER TABLE `Job_biddings` DISABLE KEYS */;
INSERT INTO `Job_biddings` VALUES (31,88,24,1900,'waiting','2019-01-02 14:59:49','2019-01-02 14:59:49','I\'ve designed so many web pages that is used by Alexa top 50 companies. You can see my portfolio from [here](http://ergun.sh)'),(32,94,26,280,'accepted','2019-01-02 18:29:27','2019-01-02 18:30:54','I\'m an experienced farmer that is working on tulips for a long time. You can see my tulips in [here](http://ergun.sh)'),(33,98,28,3500,'waiting','2019-01-06 12:32:55','2019-01-06 12:32:55','Hey, i have 10 years of experience on website design and here is my portfolio\n[sam](github.com/samparker) if you interested text me back.'),(34,95,28,250,'waiting','2019-01-06 12:36:41','2019-01-06 12:36:41','Hello sir, \n   I really like your project and want to be part of the project. You can check my linkedin.\n\n[linkedin](linkedin.com/sam-parker)\n'),(35,88,28,1700,'waiting','2019-01-06 12:41:51','2019-01-06 12:41:51','Hi, i have designed lots of websites you can check them.\n[website1](sahibinden.com)\n[website2](armut.com)\nYou can check my portfolio also.\n[github](github.com/sam-parker)\n\n\n\n'),(36,100,31,250,'accepted','2019-01-06 13:44:59','2019-01-06 13:47:19','Its a little bit hard, it deserves more than 200'),(37,102,34,200,'accepted','2019-01-06 13:58:57','2019-01-06 14:01:55','i am a pretty experinced animator and would be happy to make fun'),(38,105,39,1900,'accepted','2019-01-06 15:54:38','2019-01-06 15:58:42','You can look at my videos on youtube.'),(39,103,40,250,'waiting','2019-01-06 15:55:15','2019-01-06 15:55:15','i am an university studen and like children and have some experience.'),(40,105,41,1700,'waiting','2019-01-06 15:58:15','2019-01-06 15:58:15','You can see me in [here](http://www.thelonelyisland.com/videos/just-2-guyz/)');
/*!40000 ALTER TABLE `Job_biddings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Job_categories`
--

DROP TABLE IF EXISTS `Job_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Job_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `Job_categories_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`id`),
  CONSTRAINT `Job_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Job_categories`
--

LOCK TABLES `Job_categories` WRITE;
/*!40000 ALTER TABLE `Job_categories` DISABLE KEYS */;
INSERT INTO `Job_categories` VALUES (1,58,5,'2018-12-04 09:33:56','2018-12-04 09:33:56'),(13,72,1,'2019-01-01 21:02:10','2019-01-01 21:02:10'),(14,72,2,'2019-01-01 21:02:10','2019-01-01 21:02:10'),(15,72,4,'2019-01-01 21:02:10','2019-01-01 21:02:10'),(76,85,2,'2019-01-02 14:24:01','2019-01-02 14:24:01'),(77,85,5,'2019-01-02 14:24:01','2019-01-02 14:24:01'),(88,87,2,'2019-01-02 14:52:35','2019-01-02 14:52:35'),(89,87,1,'2019-01-02 14:52:35','2019-01-02 14:52:35'),(90,88,1,'2019-01-02 14:56:02','2019-01-02 14:56:02'),(101,90,10,'2019-01-02 16:20:03','2019-01-02 16:20:03'),(102,91,2,'2019-01-02 16:24:52','2019-01-02 16:24:52'),(103,92,4,'2019-01-02 16:25:22','2019-01-02 16:25:22'),(104,94,10,'2019-01-02 18:26:09','2019-01-02 18:26:09'),(105,95,1,'2019-01-03 15:09:25','2019-01-03 15:09:25'),(106,97,6,'2019-01-06 12:21:42','2019-01-06 12:21:42'),(107,98,1,'2019-01-06 12:28:34','2019-01-06 12:28:34'),(108,100,11,'2019-01-06 13:26:07','2019-01-06 13:26:07'),(109,100,4,'2019-01-06 13:26:07','2019-01-06 13:26:07'),(140,104,4,'2019-01-06 15:46:57','2019-01-06 15:46:57'),(141,104,11,'2019-01-06 15:46:57','2019-01-06 15:46:57');
/*!40000 ALTER TABLE `Job_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Job_media_files`
--

DROP TABLE IF EXISTS `Job_media_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Job_media_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `media_file_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `media_file_id` (`media_file_id`),
  CONSTRAINT `Job_media_files_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`id`),
  CONSTRAINT `Job_media_files_ibfk_2` FOREIGN KEY (`media_file_id`) REFERENCES `media_files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Job_media_files`
--

LOCK TABLES `Job_media_files` WRITE;
/*!40000 ALTER TABLE `Job_media_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `Job_media_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Job_updates`
--

DROP TABLE IF EXISTS `Job_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Job_updates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `type` enum('milestone','completion','request') COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Job_updates_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`id`),
  CONSTRAINT `Job_updates_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Job_updates`
--

LOCK TABLES `Job_updates` WRITE;
/*!40000 ALTER TABLE `Job_updates` DISABLE KEYS */;
INSERT INTO `Job_updates` VALUES (1,68,5,'milestone','2019-01-01 18:38:32','2019-01-01 18:38:32','Ben Ergün'),(2,68,5,'completion','2019-01-01 18:48:14','2019-01-01 18:48:14','Complete?'),(3,68,5,'milestone','2019-01-01 18:59:07','2019-01-01 18:59:07','where is my money?'),(4,68,5,'milestone','2019-01-01 18:59:50','2019-01-01 18:59:50','evet'),(5,68,5,'milestone','2019-01-01 19:02:17','2019-01-01 19:02:17','new update coming'),(6,68,5,'milestone','2019-01-01 19:02:44','2019-01-01 19:02:44','asdfasdf'),(7,68,5,'milestone','2019-01-01 19:03:49','2019-01-01 19:03:49','new update came'),(8,68,5,'milestone','2019-01-01 19:04:34','2019-01-01 19:04:34','yes'),(9,68,5,'milestone','2019-01-01 19:05:15','2019-01-01 19:05:15','new update incoming'),(10,68,5,'milestone','2019-01-01 19:06:11','2019-01-01 19:06:11','yes'),(11,68,5,'completion','2019-01-01 19:08:11','2019-01-01 19:08:11','Completed again'),(12,68,5,'milestone','2019-01-01 19:23:46','2019-01-01 19:23:46',' ![code.png](https://s3-us-west-2.amazonaws.com/workhub-image-storage/code.png)'),(13,68,5,'milestone','2019-01-01 19:25:21','2019-01-01 19:25:21','[this is a link](http://google.com) go to here please darling'),(14,71,4,'request','2019-01-01 20:16:30','2019-01-01 20:16:30','What are we on this job?'),(15,71,5,'milestone','2019-01-01 20:17:00','2019-01-01 20:17:00','We are doing great!'),(16,71,5,'milestone','2019-01-01 20:17:13','2019-01-01 20:17:13','Just some enhancements'),(17,71,5,'completion','2019-01-01 20:17:16','2019-01-01 20:17:16','Now finished'),(18,72,4,'request','2019-01-02 11:42:01','2019-01-02 11:42:01','This is the first request for update that you will hear much more.'),(19,72,5,'milestone','2019-01-02 11:43:49','2019-01-02 11:43:49','Hey hey! get well son'),(20,72,5,'milestone','2019-01-02 11:44:26','2019-01-02 11:44:26','Did you like this:  ![Screen Shot 2018-10-18 at 09.07.04.png](https://s3-us-west-2.amazonaws.com/workhub-image-storage/Screen Shot 2018-10-18 at 09.07.04.png)'),(21,72,5,'completion','2019-01-02 11:46:49','2019-01-02 11:46:49','This is so done!'),(22,94,25,'request','2019-01-02 18:31:20','2019-01-02 18:31:20','What is the status of buying fertilizers?'),(23,94,26,'milestone','2019-01-02 18:31:58','2019-01-02 18:31:58','I bought the fertilizers and am ready to start planting.'),(24,94,26,'completion','2019-01-02 18:32:21','2019-01-02 18:32:21','They were great flowers!'),(25,100,33,'request','2019-01-06 13:58:35','2019-01-06 13:58:35','I am sorry, I uploaded wrong photo, I want to updata '),(26,102,16,'request','2019-01-06 14:02:01','2019-01-06 14:02:01',NULL),(27,100,31,'completion','2019-01-06 14:02:08','2019-01-06 14:02:08',' The job is completed!'),(28,102,34,'milestone','2019-01-06 14:02:55','2019-01-06 14:02:55',NULL);
/*!40000 ALTER TABLE `Job_updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Jobs`
--

DROP TABLE IF EXISTS `Jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `header` varchar(100) DEFAULT NULL,
  `description` varchar(4096) DEFAULT NULL,
  `duedate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `price` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `bidding_status` enum('open','closed') DEFAULT NULL,
  `status` enum('bidding','in-progress','waiting-payment','completed') DEFAULT 'bidding',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Jobs`
--

LOCK TABLES `Jobs` WRITE;
/*!40000 ALTER TABLE `Jobs` DISABLE KEYS */;
INSERT INTO `Jobs` VALUES (56,2,'i want a brochure Envelope and visiting card design','i want a brochure for my business along with visiting card and a Envelope',NULL,'2018-12-04 09:28:50','2018-12-04 09:45:28',100,2,'closed','bidding'),(57,2,'OCR PDF using Google Cloud Vision API and Node.js','I want you to show me how to extract information from invoices (PDF) using Google Cloud Vision API and Node.js. I am a developer but I am not experienced with this exactly. Let me know if you have followings.\n\n1. Experiences with PDF OCR using Google Cloud Vision API\n\n2. Node.js\n\n3. Google cloud account\n\nBudget: $50~100, Time: 1 day\n\nCheers!',NULL,'2018-12-04 11:17:34','2018-12-04 11:17:34',100,1,'open','bidding'),(58,2,'Edit exercise videos','Online health and fitness company. I have 176 exercises that need individual tutorial videos',NULL,'2018-12-04 11:21:22','2018-12-04 11:21:22',1000,21,'open','bidding'),(59,8,'Build me a website','Build a functioning real estate site, using Themeforest Real Estate 7 theme.\n\nAs we previously had a quote from a bogus \'webdesigner\', please only quote if you have expertise with this theme, thanks.',NULL,'2018-12-04 11:29:19','2018-12-04 11:29:19',1000,15,'open','bidding'),(60,8,'Do some excel work','I have some work, in an Excel spreadsheet.',NULL,'2018-12-04 11:29:58','2018-12-04 11:29:58',120,12,'open','bidding'),(61,9,'Urgent Amazon Listing Translation English to German and Spanish','We need an translator for English to German or Spanish for an ongoing Job.\n\nWe need different physical product descriptions translated about 5000-10000 words per week\n\nYou need to be Nativ Speaker German Speaker !\n\nWe will pay $2 per Listing',NULL,'2018-12-04 11:35:16','2018-12-04 11:35:16',1200,20,'open','bidding'),(62,8,'Create a freelancer platform for web','As a school project we were expected to create a freelancer problem with annotations. We need a good frontend developer to create our first version of the web app.','2019-01-07 12:14:13','2018-12-04 12:16:35','2018-12-04 12:16:35',10000,360,'open','bidding'),(63,8,'Gardening Project','I want a gardener to plant some tulips to my garden of 25 acres',NULL,'2018-12-04 12:41:11','2018-12-04 12:49:07',100,25,'closed','bidding'),(64,11,'Looking for a clown','I am looking for a clown for my son\'s birthday party.','2018-12-29 10:01:43','2018-12-06 10:03:11','2018-12-06 10:03:11',200,1,'open','bidding'),(87,25,'Self-service Platform for Web, iOS and Android','We would like to build a self-service platform for seller to post their services online and buyer can review and confirm project online. The project idea similar with Fiverr but we are not such complicated.\n\nWe required Full Source Code for the Project including;\n\n- Front-end Website\n\n- Front-end Mobile iOS and Android\n\n- Admin Site\n\nWe do not accept auto-bidding or standard bidding message. We will directly ignore those bidder. Please bid the project includes the following\n\nBidding Project Requirement\n\n- List out Proposed platform, e.g. .net / PHP / Java\n\n- How many resource in this project\n\n- Proposed Payment Schedule, by %\n\n- Similar Project Reference, if any\n\n- Project Management Tools, if any\n\nSee: [Freelancer Web](https://www.freelancer.com/projects/php/Self-service-Platform-for-Web-18451098/?w=f)',NULL,'2019-01-02 14:52:35','2019-01-02 14:52:35',750,90,'open','bidding'),(88,25,'I need UI/UX for a crypto currency website.I need good design.New freelancers accepted.','I need UI/UX for a crypto currency website. I need good design. New freelancers accepted.\n\nFreelancer: [Freelancer web](https://www.freelancer.com/projects/php/Self-service-Platform-for-Web-18451098/?w=f)',NULL,'2019-01-02 14:56:02','2019-01-02 14:56:02',1500,40,'open','bidding'),(94,25,'Gardener wanted for planting flowers','We have a lovely medium sized garden in our new house’s backyard. We purchased some flowers to decorate our garden. We are looking for a talented gardener to plant the flowers. However we haven’t bought any fertilizer, so we want the freelancer to buy it for us.\n<br/>\n ![tulip2.jpeg](https://s3-us-west-2.amazonaws.com/workhub-image-storage/tulip2.jpeg)',NULL,'2019-01-02 18:26:09','2019-01-02 18:32:47',300,30,'closed','completed'),(95,4,'COP','The main objective of this project is providing an environment for clients and freelancers to collaborate in a single platform. The clients may create their projects and jobs about programming, writing, design, development etc. and post the details on this platform to find an expert on such topics.\n\n ![resize_ind.png](https://s3-us-west-2.amazonaws.com/workhub-image-storage/resize_ind.png)\n\nThe main objective of this project is providing an environment for clients and freelancers to collaborate in a single platform. The clients may create their projects and jobs about programming, writing, design, development etc. and post the details on this platform to find an expert on such topics.\n\n ![individualImage.png](https://s3-us-west-2.amazonaws.com/workhub-image-storage/individualImage.png)',NULL,'2019-01-03 15:09:25','2019-01-03 15:09:25',200,200,'open','bidding'),(96,27,'Looking for a babysitter','I am looking for a kind, experienced babysitter for my twins Tony and Justin on 19.01.2019.\n\n ![download.jpeg](https://s3-us-west-2.amazonaws.com/workhub-image-storage/download.jpeg)',NULL,'2019-01-06 12:16:35','2019-01-06 12:16:35',100,1,'open','bidding'),(97,27,'Copywriting for term project','I need some help for my term project, i am looking for a master student who studies math.',NULL,'2019-01-06 12:21:42','2019-01-06 12:21:42',100,1,'open','bidding'),(98,27,'Desing of a e-commerce website','I own a small e-commerce company, and want to beatify the design of the website. Looking for someone who has a good portfolio and have experience on e-commerce websites. Non-experienceds, pls don\'t text me.',NULL,'2019-01-06 12:28:34','2019-01-06 12:28:34',3000,15,'open','bidding'),(99,32,'Logo design for my homemade food restaurant','I have a homemade food restaurant in istanbul. I mostly make three-course meals, pies and cakes. I am looking for a creative designer will design a logo for my restaurant.',NULL,'2019-01-06 13:05:06','2019-01-06 13:05:06',500,2,'open','bidding'),(100,33,'Drawing Portrait for my wedding anniversary gift','I want to give a gift my wife for our wedding anniversary. The painting can be made with charcoal, watercolor or acrylic. Our photo is: \n\n ![6934a37b2cd6b3dcaa688cead156db1c.jpg](https://s3-us-west-2.amazonaws.com/workhub-image-storage/6934a37b2cd6b3dcaa688cead156db1c.jpg)',NULL,'2019-01-06 13:26:06','2019-01-06 14:17:11',200,7,'closed','completed'),(101,16,'animator for birthday party','i need an animator for my son\'s birtdday party![animator for birthday party.png](https://s3-us-west-2.amazonaws.com/workhub-image-storage/animatorforbirthdayparty.png)','2019-01-25 13:52:02','2019-01-06 13:53:56','2019-01-06 13:53:56',150,1,'open','bidding'),(102,16,'i need an animator for my son\'s birthday party','looking for an experienced animator for birthday party','2019-01-25 13:54:33','2019-01-06 13:55:37','2019-01-06 14:01:55',150,25,'closed','in-progress'),(103,16,'birthday party organizer','i am looking for an organizer for my son\'s birthday party. ![birthday party organizer.png](https://s3-us-west-2.amazonaws.com/workhub-image-storage/birthdaypartyorganizer.png)','2019-04-07 15:17:35','2019-01-06 15:18:59','2019-01-06 15:18:59',200,1,'open','bidding'),(104,29,'Anime themed wedding invitation designer','I will have a weeding in 12 June 2019. As my wife and I both love anime, we want the invitation to be visually like an anime.  ',NULL,'2019-01-06 15:46:57','2019-01-06 15:46:57',500,30,'open','bidding'),(105,29,'Stand-up Comedian ','A comedian is wanted!! For my wedding in 12 june 2019. We want a show that is 30 minutes long. ',NULL,'2019-01-06 15:52:36','2019-01-06 15:58:42',2000,1,'closed','in-progress');
/*!40000 ALTER TABLE `Jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notifications`
--

DROP TABLE IF EXISTS `Notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `message_type` enum('status','bid_get','bid_accept','bid_reject','request_update','deliver_update','custom') DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifications`
--

LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
INSERT INTO `Notifications` VALUES (1,3,2,56,'New bid received for i want a brochure Envelope and visiting card design by Ergun Erdogmus!','2018-12-04 09:33:56','2018-12-04 09:33:56','bid_get',0),(2,1,2,56,'New bid received for i want a brochure Envelope and visiting card design by Ali Yildiz!','2018-12-04 09:37:11','2018-12-04 09:37:11','bid_get',0),(3,2,3,56,'Mert Ermis has accepted your bid on i want a brochure Envelope and visiting card design!','2018-12-04 09:45:28','2018-12-04 09:45:28','bid_accept',0),(4,2,3,56,'Mert Ermis has accepted your bid on i want a brochure Envelope and visiting card design!','2018-12-04 09:45:30','2018-12-04 09:45:30','bid_accept',0),(5,2,3,56,'Mert Ermis has accepted your bid on i want a brochure Envelope and visiting card design!','2018-12-04 09:45:32','2018-12-04 09:45:32','bid_accept',0),(6,2,3,56,'Mert Ermis has accepted your bid on i want a brochure Envelope and visiting card design!','2018-12-04 09:45:40','2018-12-04 09:45:40','bid_accept',0),(7,5,9,61,'New bid received for Urgent Amazon Listing Translation English to German and Spanish by ergunf erdogmusf!','2018-12-04 12:02:42','2018-12-04 12:02:42','bid_get',0),(8,3,8,63,'New bid received for Gardening Project by Ergun Erdogmus!','2018-12-04 12:45:24','2018-12-04 12:45:24','bid_get',0),(9,8,3,63,'John Now has accepted your bid on Gardening Project!','2018-12-04 12:49:07','2018-12-04 12:49:07','bid_accept',0),(10,12,11,64,'New bid received for Looking for a clown by mehmet turan!','2018-12-06 10:05:38','2018-12-06 10:05:38','bid_get',0),(11,5,11,64,'New bid received for Looking for a clown by ergunf erdogmusf!','2018-12-06 16:45:20','2018-12-06 16:45:20','bid_get',0),(12,17,16,65,'New bid received for deneme job1162 by zeki tel!','2018-12-30 13:07:31','2018-12-30 13:07:31','bid_get',0),(13,18,16,65,'New bid received for deneme job1162 by zeki tel!','2018-12-30 13:10:42','2018-12-30 13:10:42','bid_get',0),(14,16,18,65,'ahmet ozan tatlisu has accepted your bid on deneme job1162!','2018-12-30 13:18:09','2018-12-30 13:18:09','bid_accept',0),(15,16,17,65,'ahmet ozan tatlisu has accepted your bid on deneme job1162!','2018-12-30 13:18:22','2018-12-30 13:18:22','bid_accept',0),(16,17,4,67,'New bid received for Find Ergun Erdogmus by zeki tel!','2018-12-30 17:08:17','2018-12-30 17:08:17','bid_get',0),(17,17,16,66,'New bid received for deneme1234 by zeki tel!','2018-12-30 17:26:52','2018-12-30 17:26:52','bid_get',0),(18,5,4,68,'New bid received for Find Mr Ergun, Please by ergunf erdogmusf!','2018-12-30 19:37:25','2018-12-30 19:37:25','bid_get',0),(19,4,5,68,'ergunc erdogmusc has accepted your bid on Find Mr Ergun, Please!','2018-12-30 19:37:50','2018-12-30 19:37:50','bid_accept',0),(20,5,4,67,'New bid received for Find Ergun Erdogmus by ergunf erdogmusf!','2018-12-30 19:49:09','2018-12-30 19:49:09','bid_get',0),(21,5,4,71,'New bid received for Another attractive job title by ergunf erdogmusf!','2019-01-01 20:16:03','2019-01-01 20:16:03','bid_get',0),(22,4,5,71,'ergunc erdogmusc has accepted your bid on Another attractive job title!','2019-01-01 20:16:12','2019-01-01 20:16:12','bid_accept',0),(23,5,23,70,'New bid received for New title by ergunf erdogmusf!','2019-01-01 20:24:13','2019-01-01 20:24:13','bid_get',0),(24,5,4,72,'New bid received for Find me by ergunf erdogmusf!','2019-01-02 11:40:16','2019-01-02 11:40:16','bid_get',0),(25,5,4,72,'New bid received for Find me by ergunf erdogmusf!','2019-01-02 11:40:36','2019-01-02 11:40:36','bid_get',0),(26,5,4,72,'New bid received for Find me by ergunf erdogmusf!','2019-01-02 11:40:48','2019-01-02 11:40:48','bid_get',0),(27,4,5,72,'ergunc erdogmusc has accepted your bid on Find me!','2019-01-02 11:41:25','2019-01-02 11:41:25','bid_accept',0),(28,24,25,88,'New bid received for I need UI/UX for a crypto currency website.I need good design.New freelancers accepted. by John Wick!','2019-01-02 14:59:49','2019-01-02 14:59:49','bid_get',0),(29,26,25,94,'New bid received for Gardener wanted for planting flowers by mehmet caglar!','2019-01-02 18:29:27','2019-01-02 18:29:27','bid_get',0),(30,25,26,94,'Cem Bayrak has accepted your bid on Gardener wanted for planting flowers!','2019-01-02 18:30:54','2019-01-02 18:30:54','bid_accept',0),(31,25,26,94,'Cem Bayrak has requested an update on Gardener wanted for planting flowers.','2019-01-02 18:31:20','2019-01-02 18:31:20','request_update',0),(32,26,25,94,'mehmet caglar has delivered an update on Gardener wanted for planting flowers.','2019-01-02 18:31:58','2019-01-02 18:31:58','deliver_update',0),(33,26,25,94,'mehmet caglar has delivered an update on Gardener wanted for planting flowers.','2019-01-02 18:32:21','2019-01-02 18:32:21','deliver_update',0),(34,28,27,98,'New bid received for Desing of a e-commerce website by Sam Parker!','2019-01-06 12:32:55','2019-01-06 12:32:55','bid_get',0),(35,28,4,95,'New bid received for COP by Sam Parker!','2019-01-06 12:36:41','2019-01-06 12:36:41','bid_get',0),(36,28,25,88,'New bid received for I need UI/UX for a crypto currency website.I need good design.New freelancers accepted. by Sam Parker!','2019-01-06 12:41:51','2019-01-06 12:41:51','bid_get',0),(37,31,33,100,'New bid received for Drawing Portrait for my wedding anniversary gift by Elif Akar!','2019-01-06 13:44:59','2019-01-06 13:44:59','bid_get',0),(38,33,31,100,'Yunus Sener has accepted your bid on Drawing Portrait for my wedding anniversary gift!','2019-01-06 13:47:19','2019-01-06 13:47:19','bid_accept',0),(39,33,31,100,'Yunus Sener has requested an update on Drawing Portrait for my wedding anniversary gift.','2019-01-06 13:58:35','2019-01-06 13:58:35','request_update',0),(40,34,16,102,'New bid received for i need an animator for my son\'s birthday party by musa uzun!','2019-01-06 13:58:57','2019-01-06 13:58:57','bid_get',0),(41,16,34,102,'ahmet ozan tatlisu has accepted your bid on i need an animator for my son\'s birthday party!','2019-01-06 14:01:55','2019-01-06 14:01:55','bid_accept',0),(42,16,34,102,'ahmet ozan tatlisu has requested an update on i need an animator for my son\'s birthday party.','2019-01-06 14:02:01','2019-01-06 14:02:01','request_update',0),(43,31,33,100,'Elif Akar has delivered an update on Drawing Portrait for my wedding anniversary gift.','2019-01-06 14:02:08','2019-01-06 14:02:08','deliver_update',0),(44,34,16,102,'musa uzun has delivered an update on i need an animator for my son\'s birthday party.','2019-01-06 14:02:55','2019-01-06 14:02:55','deliver_update',0),(45,39,29,105,'New bid received for Stand-up Comedian  by andy samberg!','2019-01-06 15:54:38','2019-01-06 15:54:38','bid_get',0),(46,40,16,103,'New bid received for birthday party organizer by alisia bank!','2019-01-06 15:55:15','2019-01-06 15:55:15','bid_get',0),(47,41,29,105,'New bid received for Stand-up Comedian  by akiva  schaffer!','2019-01-06 15:58:15','2019-01-06 15:58:15','bid_get',0),(48,29,39,105,'mehmet kuzucu has accepted your bid on Stand-up Comedian !','2019-01-06 15:58:42','2019-01-06 15:58:42','bid_accept',0);
/*!40000 ALTER TABLE `Notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profiles`
--

DROP TABLE IF EXISTS `Profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profiles`
--

LOCK TABLES `Profiles` WRITE;
/*!40000 ALTER TABLE `Profiles` DISABLE KEYS */;
INSERT INTO `Profiles` VALUES (1,1,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 08:49:19','2018-12-04 08:49:19'),(2,2,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 08:53:40','2018-12-04 08:53:40'),(3,3,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 09:32:03','2018-12-04 09:32:03'),(4,4,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 09:35:17','2018-12-04 09:35:17'),(5,5,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 09:36:07','2018-12-04 09:36:07'),(6,6,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 10:44:18','2018-12-04 10:44:18'),(7,7,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 10:45:23','2018-12-04 10:45:23'),(8,8,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 11:25:27','2018-12-04 11:25:27'),(9,9,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 11:29:03','2018-12-04 11:29:03'),(10,10,'I\'m currently descriptionless. Get creative!',0,'2018-12-04 22:12:22','2018-12-04 22:12:22'),(11,11,'I\'m currently descriptionless. Get creative!',0,'2018-12-06 10:00:34','2018-12-06 10:00:34'),(12,12,'I\'m currently descriptionless. Get creative!',0,'2018-12-06 10:04:15','2018-12-06 10:04:15'),(13,13,'I\'m currently descriptionless. Get creative!',0,'2018-12-06 15:50:42','2018-12-06 15:50:42'),(14,14,'I\'m currently descriptionless. Get creative!',0,'2018-12-06 15:51:36','2018-12-06 15:51:36'),(15,15,'I\'m currently descriptionless. Get creative!',0,'2018-12-15 17:48:23','2018-12-15 17:48:23'),(16,16,'I\'m currently descriptionless. Get creative!',0,'2018-12-30 13:00:33','2018-12-30 13:00:33'),(17,17,'I am java developer',0,'2018-12-30 13:00:39','2018-12-30 17:38:34'),(18,18,'I\'m currently descriptionless. Get creative!',0,'2018-12-30 13:10:08','2018-12-30 13:10:08'),(19,19,'I\'m currently descriptionless. Get creative!',0,'2018-12-30 18:44:47','2018-12-30 18:44:47'),(20,20,'I\'m currently descriptionless. Get creative!',0,'2018-12-30 18:49:14','2018-12-30 18:49:14'),(21,21,'I\'m currently descriptionless. Get creative!',0,'2019-01-01 14:36:20','2019-01-01 14:36:20'),(22,22,'I\'m currently descriptionless. Get creative!',0,'2019-01-01 15:39:43','2019-01-01 15:39:43'),(23,23,'I\'m currently descriptionless. Get creative!',0,'2019-01-01 15:40:28','2019-01-01 15:40:28'),(24,24,'I\'m currently descriptionless. Get creative!',0,'2019-01-02 14:43:07','2019-01-02 14:43:07'),(25,25,'I\'m currently descriptionless. Get creative!',0,'2019-01-02 14:47:22','2019-01-02 14:47:22'),(26,26,'I\'m currently descriptionless. Get creative!',0,'2019-01-02 18:23:27','2019-01-02 18:23:27'),(27,27,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 12:07:15','2019-01-06 12:07:15'),(28,28,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 12:30:29','2019-01-06 12:30:29'),(29,29,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 12:42:25','2019-01-06 12:42:25'),(30,30,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 12:48:45','2019-01-06 12:48:45'),(31,31,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 12:59:19','2019-01-06 12:59:19'),(32,32,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 13:00:11','2019-01-06 13:00:11'),(33,33,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 13:04:46','2019-01-06 13:04:46'),(34,34,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 13:58:23','2019-01-06 13:58:23'),(35,35,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 15:24:54','2019-01-06 15:24:54'),(36,36,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 15:26:05','2019-01-06 15:26:05'),(37,37,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 15:33:54','2019-01-06 15:33:54'),(38,38,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 15:35:27','2019-01-06 15:35:27'),(39,39,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 15:39:48','2019-01-06 15:39:48'),(40,40,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 15:46:16','2019-01-06 15:46:16'),(41,41,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 15:56:29','2019-01-06 15:56:29'),(42,42,'I\'m currently descriptionless. Get creative!',0,'2019-01-06 17:05:18','2019-01-06 17:05:18');
/*!40000 ALTER TABLE `Profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20181013124336-create-user.js'),('20181021123547-UserNewColumns.js'),('20181021125932-create-job.js'),('20181021131250-create-freelancer-job.js'),('20181021131844-create-category.js'),('20181021132022-create-job-category.js'),('20181021132257-create-media-file.js'),('20181021132524-create-job-media-file.js'),('20181027162557-create-sessions.js'),('20181028084044-create-profile.js'),('20181105092808-UserActivatedColumn.js'),('20181105201359-create-activations.js'),('20181109105426-job_price_column.js'),('20181116103750-job_new_columns.js'),('20181122083541-create-notifications.js'),('20181122083704-notifications_new_column.js'),('20181127092045-create-job-biddings.js'),('20181201163422-biddings_new_column.js'),('20181202114610-notifications_add_enums.js'),('20181204084737-categories_add_color.js'),('20181216172135-create-job-update.js'),('20181230102140-create-job-annotations.js'),('20190101145501-create-freelancer-category.js'),('20190101165320-add_status_to_job.js'),('20190101175149-add_description_to_job.js'),('20190102122359-notification-more-enums.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES (1,1,'17b06aac9fc9d447e53cc838f164329d7b72af8afe8fae4feade15b639972c5fe5228d0f480c23e604fb97b559ec2d33','2018-12-04 08:49:37','2018-12-04 09:36:10'),(14,9,'d80bd861fc557646f977f982e2f82e08f34ac1fe0c36576e574adc8d2b2064c736216e2b4d4839f352377d0fa99cf4e0','2018-12-04 11:29:08','2018-12-04 12:18:17'),(28,10,'c2593dceff127e492a28d611c2befa3ace3dbaa12aa6fa760524cb90cc8b5c7967b8b7d99b8a4a82080d25b33515d671','2018-12-05 23:09:19','2018-12-05 23:09:19'),(36,18,'3ac3fe23eac914c82c85bf5375d29fe295dc14ba0ed79316923a6f67d76210360353b053db1ace35acfb4754d1390a75','2018-12-30 13:10:09','2018-12-30 13:10:09'),(84,5,'41dd6b243cecab13e8462272aeff1e9d31658810131263d5e774417cad7643c91ab64e238aed3ad7ec4807aaea30b2d2','2019-01-02 12:01:33','2019-01-02 14:16:30'),(89,24,'4ed9959fb28efba2e2efb69b48f282a4a336231bdbcaa3a7857ab2018a9b3e7eea2c8fff49b0bf55c06aaa155fa4fefc','2019-01-02 14:57:37','2019-01-02 14:57:37'),(90,4,'1505c0702cac22d4afaae27a840def9928015d664f70f5144a826411a61e2ee6e10568595e7c8540b78d8adff6f5d061','2019-01-02 15:25:06','2019-01-03 15:08:10'),(91,17,'7e1c5b816511befe2add9841224564aa77c1a0e0f534d76a8f852562798f269904961266431e0c82e375b50c1747fd5e','2019-01-02 16:05:38','2019-01-02 16:05:38'),(92,17,'368d45cc1308c5c748b506e8ceec81638dac73e279cba34e6f2991fa222fa3a6ba4e7e8cffede0899ae3db4e568fd17a','2019-01-02 16:05:38','2019-01-02 16:05:38'),(95,26,'75caddadd68f12b23e6171ca2f083950bcaa23b487d07df6aa215b6b47afe6c479780d4549ac9b62245c05aac5ba98df','2019-01-02 18:23:27','2019-01-02 18:35:07'),(104,32,'d4195b2a1e26597b4ef0ae266a0ca60cc5d3c302202ed96776934fc4449778b680d5790ba4f1f7efff1231006d963d25','2019-01-06 13:00:18','2019-01-06 13:00:18'),(125,33,'b3b8a1973604733fa3ed7fe18df99715c10fb6799a665c85b38b0509161e786789f23b0b05a12dbf014e363eabb55244','2019-01-06 14:19:17','2019-01-06 14:19:17'),(131,40,'cee33bb2ad0dfc8d357d850b634bbcb09b7759a53a30e537fdc8cbc8ee047acca71f559792b68c87585da1b0928c6077','2019-01-06 15:46:17','2019-01-06 15:46:17'),(135,29,'e14ca70ee927dec7f41e2c5929df0f691609442cd3a821ac4a18e33406877ec411552652d9f00a6cc34147e885332f83','2019-01-06 15:58:34','2019-01-06 15:58:34'),(136,42,'6c24356074311f4285dd5edc9a5c19f633233c8dbd23cd8db180183a437a550cfb2d57397102245cadce489b3e291665','2019-01-06 17:05:26','2019-01-06 17:05:26');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` enum('freelancer','client') DEFAULT NULL,
  `profile_image_id` int(11) DEFAULT NULL,
  `activated` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Ali','Yildiz','aliyildiz95@gmail.com','$2a$10$frQdB3cwvF5KqSs3iQb/W.r40X8cjHPY6ifqkIDlmjh/k3/gyTkji','2018-12-04 08:49:19','2018-12-04 08:49:19','freelancer',NULL,NULL),(2,'Mert','Ermis','mert@yildiz.com','$2a$10$RbiG5VxMpU6nvkcyAQ71teRDo1tEigT9rnEssq5w8TKpy1ply.9le','2018-12-04 08:53:40','2018-12-04 08:53:40','client',NULL,NULL),(3,'Ergun','Erdogmus','ergun@erdogmus.com','$2a$10$OXektslegl5HY8UO8CDVLOKPX13zibxX8hG4opwZa3nRLgDP4udZS','2018-12-04 09:32:03','2018-12-04 09:32:03','freelancer',NULL,NULL),(4,'ergunc','erdogmusc','ergunc@test.com','$2a$10$yl/6vKIimtbGGUpz.uM6ROeJb4E7jvhohcBNfx7PdnFI9DKPDFBve','2018-12-04 09:35:17','2018-12-04 09:35:17','client',NULL,NULL),(5,'ergunf','erdogmusf','ergunf@test.com','$2a$10$woXTzPR.amjmbI1hmx5yO.5Gh1rfyXEZmRfaWUWp1Ro6gkYVv5s8S','2018-12-04 09:36:07','2018-12-04 09:36:07','freelancer',NULL,NULL),(6,'Zeki','Tel','zeki.tel@boun.edu.tr','$2a$10$Ht/tAWg0g0GtV0qP7NFpFesr8z6pc6EI5accAxC6yEYKNUD/Rw5wW','2018-12-04 10:44:18','2018-12-04 10:44:18','client',NULL,NULL),(7,'Ahmet','Ozan','ahmet.ozan@gmail.com','$2a$10$xF/kHx9/fkNblogptFVEeOB9v7FJUhyXFQUfkTyCI4zuR2BmgcZam','2018-12-04 10:45:23','2018-12-04 10:45:23','freelancer',NULL,NULL),(8,'John','Now','john@now.com','$2a$10$4Xw2bzDHgy0AvGDcqvP1IO7k9d80iJT4V0MZIw6oFUbni2RGlAg9m','2018-12-04 11:25:27','2018-12-04 11:25:27','client',NULL,NULL),(9,'Ergun','Erdogmus','erdogmusergun@gmail.com','$2a$10$QTuOs0ZM1ha0ek3zkRpF9exaeN0ZLzPOpgVT9U.MKNNuMw2mC8WuK','2018-12-04 11:29:03','2018-12-04 11:29:03','client',NULL,NULL),(10,'Berkay','Kozan','berkay@berkay.com','$2a$10$4v7NuH/bqcoqGWNiItoC6Ouk/Gf2NWlDIvu78az64KOjoM.fVWSp2','2018-12-04 22:12:22','2018-12-04 22:12:22','client',NULL,NULL),(11,'ahmet ozan','tatlisu','aot_bjk_1162@hotmail.com','$2a$10$za25RpSb3.nIbBXJLEQNGOGlD1rLtqgwp4HkT4e7mmdX3n6GR/Yby','2018-12-06 10:00:34','2018-12-06 10:00:34','client',NULL,NULL),(12,'mehmet','turan','aot_bjk_789@hotmail.com','$2a$10$fPM6gmuZsBUNC.j9wf9.EuQDyccK195.6sFSyhJM8HBs5xXTzSb2i','2018-12-06 10:04:15','2018-12-06 10:04:15','freelancer',NULL,NULL),(13,'a','a','a@a.com','$2a$10$K5Jydjfw6Z9NrPWeG4h5JebqclaJ3HjEeHeBdgL/5oNOOCiqh1EIK','2018-12-06 15:50:42','2018-12-06 15:50:42','freelancer',NULL,NULL),(14,'b','b','b@b.com','$2a$10$Y8.E687DeX.0Fk2EhZV3He8QHr5jUBOkm6QCgkl1Eh03Ktbr0Mfeu','2018-12-06 15:51:36','2018-12-06 15:51:36','freelancer',NULL,NULL),(15,'a','a','aa@a.com','$2a$10$z1m7JUtVUvn/pTmuV0HfOO9wO/PPr2BivpqyiJ9il66j62.mEv7Ti','2018-12-15 17:48:23','2018-12-15 17:48:23','freelancer',NULL,NULL),(16,'ahmet ozan','tatlisu','ozzy@gmail.com','$2a$10$TBRPrXK.8Xwg.lLHjXw3g.oAZNguKBM29s5r1X7V6VTgksyi95ENG','2018-12-30 13:00:33','2018-12-30 13:00:33','client',NULL,NULL),(17,'zeki','tel','zekitel@gmail.com','$2a$10$kygcAx2uw/Fw3i0uT3vt1OJHHFx0gPZ.9ZPk5tj8yEI83KeYqF4Wm','2018-12-30 13:00:39','2018-12-30 13:00:39','freelancer',NULL,NULL),(18,'zeki','tel','telzeki@gmail.com','$2a$10$rmeXV.5aoNCuyWYmfBXp/u9znSz/Zw63evwvJrZZE/V4sE6GdO6iS','2018-12-30 13:10:08','2018-12-30 13:10:08','freelancer',NULL,NULL),(19,'free','lancer','free@lancer.com','$2a$10$MR3/3LKQdJu.4dFoP9GlIuSJupDfwQJH9N9sP/gdGE7TZz9oxaQWe','2018-12-30 18:44:47','2018-12-30 18:44:47','freelancer',NULL,NULL),(20,'cli','ent','cli@ent.com','$2a$10$YK3bJ4.QkldpsYaf7NT/uuB7O16OToMB3TJCer.3iXPlzUEPn3FWy','2018-12-30 18:49:14','2018-12-30 18:49:14','client',NULL,NULL),(21,'Test','Test','test@test.com','$2a$10$UHkrh9FEC1xwCcxRmuzJf.sdDUGG54j7Yy6G85NiQHiAVLt0XHVG6','2019-01-01 14:36:20','2019-01-01 14:36:20','freelancer',NULL,NULL),(22,'erguncc','erguncc','erguncc@test.com','$2a$10$V.qKob8aVhoWBmdVMVrbde3hu/FRsuALaNi/OBmK6Lo93CHbXfv5C','2019-01-01 15:39:43','2019-01-01 15:39:43','freelancer',NULL,NULL),(23,'ergunccc','ergunccc','ergunccc@test.com','$2a$10$CV4dVg1A7/KmrUmxlUzG2ugtMNQFOT13DhQ/GJzV137Z7suiv2fgu','2019-01-01 15:40:28','2019-01-01 15:40:28','client',NULL,NULL),(24,'John','Wick','john@wick.com','$2a$10$t0HIyzGB8cCta9iqmiC.seDAEmMy5g5d3p7uLwxpautrM2w4cBCAm','2019-01-02 14:43:07','2019-01-02 14:43:07','freelancer',NULL,NULL),(25,'Cem','Bayrak','cem@bayrak.com','$2a$10$ET1hhutkrGphbmixovufi.8sCgznCvFedYYABb0/631NaZcXUBmtS','2019-01-02 14:47:22','2019-01-02 14:47:22','client',NULL,NULL),(26,'mehmet','caglar','mehmet@caglar.com','$2a$10$1zW8flNjDACmh3wtekxkoedgd1w1LAaPjxcGI40KUW1CUpgENh2Ga','2019-01-02 18:23:27','2019-01-02 18:23:27','freelancer',NULL,NULL),(27,'John','Sun','john-sun@gmail.com','$2a$10$P30BKhNQHAqnigwXXNuNKOefWDBmXH8t0oMUyt6qcDdXxdaisUKhO','2019-01-06 12:07:15','2019-01-06 12:07:15','client',NULL,NULL),(28,'Sam','Parker','samparker@gmail.com','$2a$10$HUOPvTLLU7hhjGJaF6QC1OQjBNEKPnXEuR8ko8oSM/t6WJj1Rnt..','2019-01-06 12:30:29','2019-01-06 12:30:29','freelancer',NULL,NULL),(29,'mehmet','kuzucu','mehmet@kuzucu.com','$2a$10$Y1H6Bd4D2IL5nqmmxCeCq.Zb28EL2g7gRkVeK/O2wvJbCLDOA2cRm','2019-01-06 12:42:25','2019-01-06 12:42:25','client',NULL,NULL),(30,'ahmet','emin','ahmet@emin.com','$2a$10$qrL8rG/TXLwCUple6pduWuoQhC0VqkhsvkOED.ICIAFR/GGV7pShy','2019-01-06 12:48:45','2019-01-06 12:48:45','freelancer',NULL,NULL),(31,'Elif','Akar','elifakar@gmail.com','$2a$10$5REYUPjpTRRDQc5BUZOw7.ki1SuS3xsBHqATtTfnV.EHEANaWrvlq','2019-01-06 12:59:19','2019-01-06 12:59:19','freelancer',NULL,NULL),(32,'Riley','Bush','rileybush@gmail.com','$2a$10$t8hlPJ57/XlmIstQZRiwmONny6kdFAr84BNpYDllJitRnF8Tj.Pbm','2019-01-06 13:00:11','2019-01-06 13:00:11','client',NULL,NULL),(33,'Yunus','Sener','yunusener@gmail.com','$2a$10$TINUy4l4gd4IrBzV7x44.OvbHSV.7Q0yPo/TWJGquzGWa6NhARmoy','2019-01-06 13:04:46','2019-01-06 13:04:46','client',NULL,NULL),(34,'musa','uzun','musa.uzun@gmail.com','$2a$10$lHhVbNoLoarfWIL6cNdSN.D27UNbEkYBp2fMPJw9.g3q8AJdiyPpG','2019-01-06 13:58:23','2019-01-06 13:58:23','freelancer',NULL,NULL),(35,'aycan','atilgan','aycan@atilgan.com','$2a$10$duQu/23d3w18/MRUwbGOM.ls1ylYQxsVmvUqPtR5yXluixO7CH6bu','2019-01-06 15:24:54','2019-01-06 15:24:54','freelancer',NULL,NULL),(36,'luis','maestro','luis@maestro.com','$2a$10$CPIWDc44istRHii/7CCEfeDvXjZwTYfoCH7cSHa01DvTBF/i.MTJi','2019-01-06 15:26:05','2019-01-06 15:26:05','freelancer',NULL,NULL),(37,'david','frances','david@frances.com','$2a$10$R/XoSWg.EQAjLYpK5mxTG.AlMj7XGXu.U6FTbBhGMod7OsYu.tSt2','2019-01-06 15:33:54','2019-01-06 15:33:54','freelancer',NULL,NULL),(38,'harold','finch','harold@finch.com','$2a$10$oaiO11CIBm9bMFXD/pEFpuOEDFHTmqsf9fQ4OG9DxgmuaopRS495G','2019-01-06 15:35:27','2019-01-06 15:35:27','client',NULL,NULL),(39,'andy','samberg','andy@samberg.com','$2a$10$76BsPFgHFUeMYaAyo2WFj.QGWZnUjJe4fcEH7me67SGXizNNkrLR2','2019-01-06 15:39:48','2019-01-06 15:39:48','freelancer',NULL,NULL),(40,'alisia','bank','alisiabank@gmail.com','$2a$10$Zv20oXmPf6Ic20WEkd5lm.3RYQeKNK9XztvL6RxsL9ZgKv.0np7j6','2019-01-06 15:46:16','2019-01-06 15:46:16','freelancer',NULL,NULL),(41,'akiva ','schaffer','akiva@schaffer.com','$2a$10$GCnnNIr9IgZL6wQv9yvk4uLDGqnEqZFvH0Bp0Abw/6ceHH4Qj/HvS','2019-01-06 15:56:29','2019-01-06 15:56:29','freelancer',NULL,NULL),(42,'Sex','Sex on the beach','sex@gmail.com','$2a$10$dxlpRBduehqpPwE60TMcH.do5mFn5jCuUZXzrKnD9mG6DU7NfKKNa','2019-01-06 17:05:18','2019-01-06 17:05:18','client',NULL,NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_files`
--

DROP TABLE IF EXISTS `media_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_files`
--

LOCK TABLES `media_files` WRITE;
/*!40000 ALTER TABLE `media_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `media_files` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-06 20:55:47
