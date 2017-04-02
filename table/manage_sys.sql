/*
Navicat MySQL Data Transfer

Source Server         : lo
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : manage_sys

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2017-03-31 15:21:13
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `car`
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `cti_id` int(11) DEFAULT NULL,
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
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee
-- ----------------------------

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
  `type` varchar(255) DEFAULT NULL,
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
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1a21b12e-c653-4829-ab7b-d671cfa35670', '1', 'e5b7afc4f8b64c000fef766a027fb25a', null);
INSERT INTO `user` VALUES ('5', '5', '5', null);
INSERT INTO `user` VALUES ('933695b3-46bc-4159-9f9b-dd21469f071f', '3', 'e5b7afc4f8b64c000fef766a027fb25a', null);
INSERT INTO `user` VALUES ('a28baa76-3f02-4169-aae3-27ab3ecab849', '4', 'e5b7afc4f8b64c000fef766a027fb25a', null);
INSERT INTO `user` VALUES ('e9ef313f-1e01-4d55-bae2-54f2be786222', '2', 'e5b7afc4f8b64c000fef766a027fb25a', null);
