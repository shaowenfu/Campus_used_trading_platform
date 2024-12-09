-- 插入orders表数据
INSERT INTO orders (number, status, user_id, marketer_id, address_book_id, order_time, checkout_time, 
    pay_method, pay_status, amount, phone, address, user_name, consignee)
VALUES
-- 用户1的订单
('ORDER202401010001', 4, 1, 2, 1, '2024-12-07 10:05:00', '2024-12-07 10:05:00', 
    1, 1, 1000.00, '13900000001', '园区A 1栋101', '张三', '张三'),
-- 用户1的另一个订单    
('ORDER202401020001', 2, 1, 3, 1, '2024-12-07 10:05:00', '2024-12-07 14:10:00', 
    1, 1, 450.00, '13900000001', '园区A 1栋101', '张三', '张三'),
-- 用户2的订单
('ORDER202401030001', 3, 2, 4, 2, '2024-12-07 10:05:00', '2024-12-07 09:15:00', 
    2, 1, 320.00, '13900000002', '园区B 2栋202', '李四', '李四');

-- 插入order_detail表数据
INSERT INTO order_detail (name, image, order_id, thing_id, number, amount)
VALUES
-- ORDER202401010001的订单详情
('二手手机', 'images/phone.jpg', 1, 1, 1, 1000.00),

-- ORDER202401020001的订单详情
('二手沙发', 'images/sofa.jpg', 2, 3, 1, 300.00),
('二手办公桌', 'images/desk.jpg', 2, 4, 1, 150.00),

-- ORDER202401030001的订单详情
('二手自行车', 'images/bike.jpg', 3, 5, 1, 200.00),
('二手书桌', 'images/book_desk.jpg', 3, 6, 1, 120.00);