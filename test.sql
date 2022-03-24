/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2022-03-24 16:24:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` varchar(100) NOT NULL COMMENT '资源id',
  `name` varchar(255) NOT NULL COMMENT '资源名称',
  `created_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `updated_time` bigint(20) DEFAULT NULL COMMENT '更新时间',
  `resource_type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '资源类型：1、目录 2、菜单 3、按钮',
  `parent_id` varchar(100) NOT NULL DEFAULT '-1' COMMENT '父节点ID',
  `path` varchar(255) DEFAULT NULL COMMENT '资源路径',
  `icon` varchar(255) DEFAULT NULL COMMENT '资源图标',
  `component` varchar(255) DEFAULT NULL COMMENT '资源的组件目录路径（相对于src）',
  `auth_key` varchar(50) DEFAULT NULL COMMENT '资源权限key(resource_key=3时有效)',
  `sort_num` tinyint(4) DEFAULT '1' COMMENT '菜单排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `path` (`path`) USING BTREE,
  UNIQUE KEY `component` (`component`) USING BTREE,
  UNIQUE KEY `auth_key` (`auth_key`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资源表';

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('2d7f1019-1e03-40c0-9670-97389d02a0a6', '用户管理', '1647765250172', '1647765250172', '2', 'dc4075b1-5bc6-45ff-969f-d7270aa29e26', '/user', null, '/system/User', null, '1');
INSERT INTO `resource` VALUES ('3991227c-c149-4486-9f29-45ad6c5c2cbf', '角色管理', '1647765286890', '1647765286890', '2', 'dc4075b1-5bc6-45ff-969f-d7270aa29e26', '/role', null, '/system/Role', null, '1');
INSERT INTO `resource` VALUES ('6969de48-0c9a-4d18-8131-c67b303934c9', '首页', '1648017032836', '1648017032836', '2', '-1', '/home', null, '/Home', null, '0');
INSERT INTO `resource` VALUES ('da5a6564-8cf0-433c-91fa-e98594903cf6', '资源管理', '1647765789143', '1647765789143', '2', 'dc4075b1-5bc6-45ff-969f-d7270aa29e26', '/resource', null, '/system/Resource', null, '1');
INSERT INTO `resource` VALUES ('da5a6564-8cf0-433c-91fa-e98594903cf7', '新增资源', '1647765789143', '1647765789143', '3', 'da5a6564-8cf0-433c-91fa-e98594903cf6', '/resource/add', null, '', 'RESOURCE_ADD', '1');
INSERT INTO `resource` VALUES ('dc4075b1-5bc6-45ff-969f-d7270aa29e26', '系统管理', '1647765135103', '1647919464031', '1', '-1', null, null, null, null, '1');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_time` bigint(20) DEFAULT NULL,
  `updated_time` bigint(20) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `authorities` text COMMENT '资源id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('0d89942e-d0ae-4ee8-96fc-f5ebc996b8e0', 'admin', '1647764719060', '1648017069563', '超级管理员', 'dc4075b1-5bc6-45ff-969f-d7270aa29e26,2d7f1019-1e03-40c0-9670-97389d02a0a6,3991227c-c149-4486-9f29-45ad6c5c2cbf,da5a6564-8cf0-433c-91fa-e98594903cf6,da5a6564-8cf0-433c-91fa-e98594903cf7,6969de48-0c9a-4d18-8131-c67b303934c9');
INSERT INTO `role` VALUES ('cf2c73c3-ebe9-4293-8af0-b0e7aedc22ca', 'test', '1647935253395', '1648006288861', null, '2d7f1019-1e03-40c0-9670-97389d02a0a6,3991227c-c149-4486-9f29-45ad6c5c2cbf,da5a6564-8cf0-433c-91fa-e98594903cf6,dc4075b1-5bc6-45ff-969f-d7270aa29e26');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `gender` bigint(20) DEFAULT '-1' COMMENT '性别：0 男 1 女  -1 保密',
  `created_time` bigint(20) DEFAULT NULL,
  `updated_time` bigint(20) DEFAULT NULL,
  `role_id` text COMMENT '角色id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('279d6edd-8ea7-4896-8e1f-b0da6d6f28da', 'test123', '', '123456', '1', '1647938373426', '1648006329044', 'cf2c73c3-ebe9-4293-8af0-b0e7aedc22ca');
INSERT INTO `user` VALUES ('7d9acbcf-644a-4b62-b55e-d3eb8d202776', 'admin', '', '123456', '-1', '1647770725399', '1647937785948', '0d89942e-d0ae-4ee8-96fc-f5ebc996b8e0');
