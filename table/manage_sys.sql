/*
Navicat MySQL Data Transfer

Source Server         : lo
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : manage_sys

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2017-04-03 13:20:06
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `car`
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cti_id` int(11) DEFAULT NULL,
  `license_plate` varchar(255) DEFAULT NULL,
  `staffid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------

-- ----------------------------
-- Table structure for `car_maintain`
-- ----------------------------
DROP TABLE IF EXISTS `car_maintain`;
CREATE TABLE `car_maintain` (
  `id` int(11) NOT NULL,
  `car_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car_maintain
-- ----------------------------

-- ----------------------------
-- Table structure for `car_repair`
-- ----------------------------
DROP TABLE IF EXISTS `car_repair`;
CREATE TABLE `car_repair` (
  `id` int(11) NOT NULL,
  `car_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car_repair
-- ----------------------------

-- ----------------------------
-- Table structure for `car_team_information`
-- ----------------------------
DROP TABLE IF EXISTS `car_team_information`;
CREATE TABLE `car_team_information` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car_team_information
-- ----------------------------

-- ----------------------------
-- Table structure for `employee`
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `salary` int(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `staffid` varchar(255) DEFAULT NULL,
  `position` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('1', '1', '18804052424', null, '中国辽宁沈阳', '8', '司机');
INSERT INTO `employee` VALUES ('2', '2', null, null, null, '12', '会计');
INSERT INTO `employee` VALUES ('3', '3', '18804052424', null, '中国辽宁沈阳', '3', '司机');

-- ----------------------------
-- Table structure for `env_information`
-- ----------------------------
DROP TABLE IF EXISTS `env_information`;
CREATE TABLE `env_information` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of env_information
-- ----------------------------

-- ----------------------------
-- Table structure for `financial`
-- ----------------------------
DROP TABLE IF EXISTS `financial`;
CREATE TABLE `financial` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of financial
-- ----------------------------

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `loc_id` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for `goods_flow`
-- ----------------------------
DROP TABLE IF EXISTS `goods_flow`;
CREATE TABLE `goods_flow` (
  `id` int(11) NOT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_flow
-- ----------------------------

-- ----------------------------
-- Table structure for `storage_location`
-- ----------------------------
DROP TABLE IF EXISTS `storage_location`;
CREATE TABLE `storage_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of storage_location
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1', 'e5b7afc4f8b64c000fef766a027fb25a', '1');
INSERT INTO `user` VALUES ('2', '2', '2', null);
INSERT INTO `user` VALUES ('3', '3', '3', null);
INSERT INTO `user` VALUES ('4', '4', '4', null);
INSERT INTO `user` VALUES ('5', '5', '5', null);
INSERT INTO `user` VALUES ('6', '6', '6', null);
INSERT INTO `user` VALUES ('7', '7', '7', null);
INSERT INTO `user` VALUES ('8', '8', '8', null);
INSERT INTO `user` VALUES ('9', '12', '12', null);
