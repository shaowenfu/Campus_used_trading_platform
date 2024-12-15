-- 插入 Mock 数据到 user 表
INSERT INTO user (openid, name, phone, sex, id_number, avatar, create_time) 
VALUES
('openid_1', 'Alice', '13912345678', '女', '110101199001018888', 'https://example.com/avatar1.jpg', '2023-01-01 10:00:00'),
('openid_2', 'Bob', '13812345679', '男', '110101198902028889', 'https://example.com/avatar2.jpg', '2023-02-01 11:00:00'),
('openid_3', 'Charlie', '13712345670', '男', '110101199003038890', 'https://example.com/avatar3.jpg', '2023-03-01 12:00:00'),
('openid_4', 'Diana', '13612345671', '女', '110101199104048891', 'https://example.com/avatar4.jpg', '2023-04-01 13:00:00'),
('openid_5', 'Eve', '13512345672', '女', '110101199205058892', 'https://example.com/avatar5.jpg', '2023-05-01 14:00:00');

-- 插入 Mock 数据到 remark 表
INSERT INTO remark (user_id, marketer_id, detail, create_time, update_time) 
VALUES
(1, 101, '很棒的服务！', '2023-06-01 15:00:00', '2023-06-01 15:00:00'),
(2, 102, '质量不错，值得推荐。', '2023-06-02 16:00:00', '2023-06-02 16:00:00'),
(3, 101, '送货速度很快。', '2023-06-03 17:00:00', '2023-06-03 17:00:00'),
(4, 103, '客服态度一般。', '2023-06-04 18:00:00', '2023-06-04 18:00:00'),
(5, 104, '总体体验良好。', '2023-06-05 19:00:00', '2023-06-05 19:00:00');
