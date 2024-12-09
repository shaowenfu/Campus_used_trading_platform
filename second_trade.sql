CREATE DATABASE  IF NOT EXISTS `second_trade` ;
USE `second_trade`;

DROP TABLE IF EXISTS `marketer`;
CREATE TABLE marketer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    name VARCHAR(32) NOT NULL COMMENT '姓名',
    username VARCHAR(32) NOT NULL UNIQUE COMMENT '用户名，唯一',
    password VARCHAR(64) NOT NULL COMMENT '密码',
    phone VARCHAR(11) NOT NULL COMMENT '手机号',
    status INT NOT NULL COMMENT '账号状态，1正常，0封禁',
    id_number VARCHAR(18) NOT NULL COMMENT '身份证号',
    authority INT NOT NULL COMMENT '权限状态，1管理员，0商户',
    create_time DATETIME NOT NULL COMMENT '创建时间',
    update_time DATETIME NOT NULL COMMENT '最后修改时间'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='商家（管理员）信息';
INSERT INTO marketer (id, name, username, password, phone, id_number, status, authority, create_time, update_time) 
VALUES (1, 'AAA', 'admin1', 'e10adc3949ba59abbe56e057f20f883e', '13800000001', '330382200403130939', 1, 1, NOW(), NOW());
INSERT INTO marketer (id, name, username, password, phone, id_number, status, authority, create_time, update_time) 
VALUES (2, 'BBB', 'market1', 'e10adc3949ba59abbe56e057f20f883e', '13800000002', '330382200403130940', 1, 0, NOW(), NOW());
INSERT INTO marketer (id, name, username, password, phone, id_number, status, authority, create_time, update_time) 
VALUES (3, 'CCC', 'market2', 'e10adc3949ba59abbe56e057f20f883e', '13800000003', '330382200403130941', 1, 0, NOW(), NOW());
INSERT INTO marketer (id, name, username, password, phone, id_number, status, authority, create_time, update_time) 
VALUES (4, 'DDD', 'market3', 'e10adc3949ba59abbe56e057f20f883e', '13800000004', '330382200403130942' ,1, 0, NOW(), NOW());
INSERT INTO marketer (id, name, username, password, phone, id_number, status, authority, create_time, update_time) 
VALUES (5, 'EEE', 'market4', 'e10adc3949ba59abbe56e057f20f883e', '13800000005', '330382200403130943' ,1, 0, NOW(), NOW());

DROP TABLE IF EXISTS `category`;
CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    name VARCHAR(32) NOT NULL UNIQUE COMMENT '分类名称，唯一',
    sort INT NOT NULL COMMENT '排序字段，用于分类数据的排序',
    status INT NOT NULL COMMENT '状态，1启用，0禁用',
    create_time DATETIME NOT NULL COMMENT '创建时间',
    update_time DATETIME NOT NULL COMMENT '最后修改时间',
    create_user BIGINT NOT NULL COMMENT '创建人id',
    update_user BIGINT NOT NULL COMMENT '最后修改人id'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='商品分类信息';

-- 插入一些示例分类数据
INSERT INTO category (name, sort, status, create_time, update_time, create_user, update_user)
VALUES
('电子产品', 1, 1, NOW(), NOW(), 1, 1),      -- 电子产品
('家电', 2, 1, NOW(), NOW(), 1, 1),          -- 家电
('家具', 3, 1, NOW(), NOW(), 1, 1),          -- 家具
('书籍', 4, 1, NOW(), NOW(), 1, 1),          -- 书籍
('运动器材', 5, 1, NOW(), NOW(), 1, 1),      -- 运动器材
('玩具', 6, 1, NOW(), NOW(), 1, 1),          -- 玩具
('汽车配件', 7, 1, NOW(), NOW(), 1, 1),      -- 汽车配件
('办公用品', 8, 1, NOW(), NOW(), 1, 1);      -- 办公用品


DROP TABLE IF EXISTS `thing`;
CREATE TABLE thing (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    name VARCHAR(32) NOT NULL UNIQUE COMMENT '物品名称，唯一',
    category_id BIGINT NOT NULL COMMENT '分类id，逻辑外键',
    price DECIMAL(10, 2) NOT NULL COMMENT '物品价格',
    amount BIGINT NOT NULL COMMENT '物品余量',
    image VARCHAR(255) NOT NULL COMMENT '物品图片路径',
    description VARCHAR(255) COMMENT '物品描述',
    trade_style VARCHAR(255) NOT NULL COMMENT '交易方式，1表示商家送货上门，0表示自取',
    status INT NOT NULL COMMENT '售卖状态，1起售，0停售',
    create_time DATETIME NOT NULL COMMENT '创建时间',
    update_time DATETIME NOT NULL COMMENT '最后修改时间',
    create_user BIGINT NOT NULL COMMENT '创建人id',
    update_user BIGINT NOT NULL COMMENT '最后修改人id'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='物品信息';

-- 插入商品数据
-- 商家 2 (market1) 上架商品
INSERT INTO thing (name, category_id, price, amount, image, description, trade_style, status, create_time, update_time, create_user, update_user)
VALUES
('二手手机', 1, 1000.00, 20, 'images/phone.jpg', '全新二手手机，功能完好', '1', 1, NOW(), NOW(), 2, 2),    -- 商家 2 上架的二手手机
('二手电视机', 2, 500.00, 10, 'images/tv.jpg', '二手电视，屏幕无损', '1', 1, NOW(), NOW(), 2, 2);   -- 商家 2 上架的二手电视机

-- 商家 3 (market2) 上架商品
INSERT INTO thing (name, category_id, price, amount, image, description, trade_style, status, create_time, update_time, create_user, update_user)
VALUES
('二手沙发', 3, 300.00, 15, 'images/sofa.jpg', '稍有磨损，但依然舒适的二手沙发', '1', 1, NOW(), NOW(), 3, 3),  -- 商家 3 上架的二手沙发
('二手办公桌', 8, 150.00, 10, 'images/desk.jpg', '完好无损的二手办公桌', '1', 1, NOW(), NOW(), 3, 3);    -- 商家 3 上架的二手办公桌

-- 商家 4 (market3) 上架商品
INSERT INTO thing (name, category_id, price, amount, image, description, trade_style, status, create_time, update_time, create_user, update_user)
VALUES
('二手自行车', 5, 200.00, 30, 'images/bike.jpg', '适合日常代步的二手自行车', '1', 1, NOW(), NOW(), 4, 4),    -- 商家 4 上架的二手自行车
('二手书桌', 8, 120.00, 12, 'images/book_desk.jpg', '有轻微划痕的二手书桌', '1', 1, NOW(), NOW(), 4, 4);   -- 商家 4 上架的二手书桌


DROP TABLE IF EXISTS `user`;
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    openid VARCHAR(45) NOT NULL COMMENT '微信用户的唯一标识',
    name VARCHAR(32) DEFAULT NULL COMMENT '用户姓名',
    phone VARCHAR(11) DEFAULT NULL COMMENT '手机号',
    sex VARCHAR(2) DEFAULT NULL COMMENT '性别',
    id_number VARCHAR(18) DEFAULT NULL COMMENT '身份证号',
    avatar VARCHAR(500) COMMENT '微信用户头像路径',
    create_time DATETIME NOT NULL COMMENT '注册时间'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='C端用户信息';

DROP TABLE IF EXISTS `address_book`;
CREATE TABLE address_book (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    user_id BIGINT NOT NULL COMMENT '用户id，逻辑外键',
    consignee VARCHAR(50) NOT NULL COMMENT '收货人',
    sex VARCHAR(2) NOT NULL COMMENT '性别',
    phone VARCHAR(11) NOT NULL COMMENT '手机号',
    area VARCHAR(12) DEFAULT NULL COMMENT '园区',
    dormitories_id VARCHAR(32) DEFAULT NULL COMMENT '宿舍',
    unit_number VARCHAR(32) DEFAULT NULL COMMENT '单元号',
    door_code VARCHAR(12) DEFAULT NULL COMMENT '门牌号',
    is_default TINYINT(1) DEFAULT NULL COMMENT '是否默认地址，1是，0否'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='C端用户收货地址信息';

DROP TABLE IF EXISTS `shopping_cart`;
CREATE TABLE shopping_cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    name VARCHAR(32) NOT NULL COMMENT '商品名称',
    image VARCHAR(255) NOT NULL COMMENT '商品图片路径',
    user_id BIGINT NOT NULL COMMENT '用户id，逻辑外键',
    marketer_id BIGINT NOT NULL COMMENT '商户id，逻辑外键',
    thing_id BIGINT NOT NULL COMMENT '物品id，逻辑外键',
    price DECIMAL(10, 2) NOT NULL COMMENT '商品单价',
    amount BIGINT NOT NULL COMMENT '商品数量',
    create_time DATETIME NOT NULL COMMENT '创建时间'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='C端用户购物车信息';

DROP TABLE IF EXISTS `orders`;
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    number VARCHAR(50) NOT NULL COMMENT '订单号',
    status INT NOT NULL COMMENT '订单状态，1待付款，2已付款，3交易中，4已完成，5已取消',
    user_id BIGINT NOT NULL COMMENT '用户id，逻辑外键',
	marketer_id BIGINT NOT NULL COMMENT '商户id，逻辑外键',
    address_book_id BIGINT NOT NULL COMMENT '地址id，逻辑外键',
    order_time DATETIME NOT NULL COMMENT '下单时间',
    checkout_time DATETIME COMMENT '付款时间',
    pay_method INT NOT NULL COMMENT '支付方式，1微信支付，2支付宝支付',
    pay_status INT NOT NULL COMMENT '支付状态，0未支付，1已支付，2退款',
    amount DECIMAL(10, 2) NOT NULL COMMENT '订单金额',
    remark VARCHAR(100) COMMENT '备注信息',
    phone VARCHAR(11) NOT NULL COMMENT '手机号',
    address VARCHAR(255)  COMMENT '详细地址信息',
    user_name VARCHAR(32)  COMMENT '用户姓名',
    consignee VARCHAR(32) NOT NULL COMMENT '收货人',
    cancel_reason VARCHAR(255) COMMENT '订单取消原因',
    cancel_time DATETIME COMMENT '订单取消时间'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='C端用户订单信息';

DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE order_detail (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    name VARCHAR(32) NOT NULL COMMENT '商品名称',
    image VARCHAR(255) NOT NULL COMMENT '商品图片路径',
    order_id BIGINT NOT NULL COMMENT '订单id，逻辑外键',
    thing_id BIGINT NOT NULL COMMENT '物品id，逻辑外键',
    amount BIGINT NOT NULL COMMENT '商品数量',
    price DECIMAL(10, 2) NOT NULL COMMENT '商品单价'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='C端用户订单明细信息';

DROP TABLE IF EXISTS `news`;
CREATE TABLE news (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    detail VARCHAR(32) NOT NULL COMMENT '消息内容',
    image VARCHAR(255) NOT NULL COMMENT '相关图片路径',
    sort INT NOT NULL COMMENT '排序字段，用于消息展示顺序',
    status INT NOT NULL COMMENT '状态，1启用，0禁用'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='C端用户新闻展示信息';

-- 插入新闻数据
INSERT INTO news (detail, image, sort, status) 
VALUES 
('春季大促销，二手商品低至5折，赶快来选购！', 'images/spring_sale.jpg', 1, 1),  -- 第一条新闻：春季大促销
('全新二手手机上线！丰富的选择等你来挑', 'images/secondhand_phone.jpg', 2, 1),   -- 第二条新闻：二手手机上线
('快递延迟通知，请您耐心等待，感谢您的理解', 'images/delivery_delay.jpg', 3, 1);   -- 第三条新闻：快递延迟通知

DROP TABLE IF EXISTS `remark`;

CREATE TABLE `remark` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键，自增',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `marketer_id` BIGINT NOT NULL COMMENT '商家ID',
    `detail` VARCHAR(32) NOT NULL COMMENT '评论内容',
    `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间，默认当前时间',
    `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='C端用户评论信息';