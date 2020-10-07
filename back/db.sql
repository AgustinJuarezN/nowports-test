CREATE DATABASE IF NOT EXISTS nowports-test;

USE nowports-test;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(30) DEFAULT '',
  `lastname` varchar(30) DEFAULT '',
  `createdAt` varchar(50) DEFAULT '',
  `email` varchar(50) DEFAULT '',
  `password` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `contact` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `owner` int(11) DEFAULT '',
  `firstname` varchar(30) DEFAULT '',
  `lastname` varchar(30) DEFAULT '',
  `phone` varchar(20) DEFAULT '',
  `createdAt` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;