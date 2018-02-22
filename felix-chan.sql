-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: felix-chan
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `commands`
--

DROP TABLE IF EXISTS `commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commands` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(512) DEFAULT NULL,
  `Description` varchar(512) DEFAULT NULL,
  `Usage` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands`
--

LOCK TABLES `commands` WRITE;
/*!40000 ALTER TABLE `commands` DISABLE KEYS */;
INSERT INTO `commands` VALUES (1,'xcom','A dedicated xcom playthrough command',NULL),(2,'say','Says a message',NULL),(3,'nighty','Wishes a good nighty',NULL),(4,'hello','Greets the user',NULL),(5,'botinfo','Gives info on the bot',NULL);
/*!40000 ALTER TABLE `commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nightygifs`
--

DROP TABLE IF EXISTS `nightygifs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nightygifs` (
  `idNightygifs` int(11) NOT NULL AUTO_INCREMENT,
  `Giflink` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`idNightygifs`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nightygifs`
--

LOCK TABLES `nightygifs` WRITE;
/*!40000 ALTER TABLE `nightygifs` DISABLE KEYS */;
INSERT INTO `nightygifs` VALUES (1,'https://media.giphy.com/media/1oDA6lccgPe1y/giphy.gif'),(2,'https://vignette.wikia.nocookie.net/kancolle/images/0/08/Umaru_sleeping.gif'),(3,'http://media.tumblr.com/9bf49adde3a82e05bdfa598ac0625b83/tumblr_inline_n97cqioJX61r023wy.gif'),(4,'http://i.giphy.com/26AHrHYqHv9rVSXMQ.gif'),(5,'https://media1.tenor.com/images/b1cdf65b0627586b7ad2274c011b100f/tenor.gif?itemid=8503491'),(6,'https://pa1.narvii.com/6371/12a3853251ab53705378971bfefcac6b889ef104_hq.gif'),(7,'http://i.imgur.com/ZQ0G3.gif'),(8,'http://i.imgur.com/l3gFXxU.gif'),(9,'https://i.imgur.com/asxSiRY.gif');
/*!40000 ALTER TABLE `nightygifs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servers`
--

DROP TABLE IF EXISTS `servers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servers` (
  `idservers` int(11) NOT NULL AUTO_INCREMENT,
  `servername` varchar(512) DEFAULT NULL,
  `serverid` varchar(45) DEFAULT NULL,
  `ownerid` varchar(45) DEFAULT NULL,
  `prefix` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idservers`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servers`
--

LOCK TABLES `servers` WRITE;
/*!40000 ALTER TABLE `servers` DISABLE KEYS */;
INSERT INTO `servers` VALUES (8,'\'Test\'','414803167474221077','212152996216307713',','),(9,'\'Test2\'','381748841122365440','212152996216307713',',');
/*!40000 ALTER TABLE `servers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xcom`
--

DROP TABLE IF EXISTS `xcom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xcom` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(512) DEFAULT NULL,
  `Rank` varchar(45) DEFAULT NULL,
  `Class` varchar(45) DEFAULT NULL,
  `Kills` int(11) DEFAULT NULL,
  `Mugshot` varchar(512) DEFAULT NULL,
  `Globalkills` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xcom`
--

LOCK TABLES `xcom` WRITE;
/*!40000 ALTER TABLE `xcom` DISABLE KEYS */;
INSERT INTO `xcom` VALUES (1,'Vyolex','Rookie','Rookie',0,'https://i.imgur.com/XaaGBrM.png',0),(2,'Eris','Rookie','Rookie',2,'https://i.imgur.com/E8VhU2x.png',2);
/*!40000 ALTER TABLE `xcom` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-22 12:07:25
