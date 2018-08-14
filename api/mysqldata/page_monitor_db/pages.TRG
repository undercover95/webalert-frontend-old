TYPE=TRIGGERS
triggers='CREATE DEFINER=`admin`@`%` TRIGGER `init_new_page_status` AFTER INSERT ON `pages` FOR EACH ROW BEGIN\n	INSERT INTO `pages_status` (site_id)\n 	VALUES (NEW.id);\nEND'
sql_modes=524288
definers='admin@%'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_general_ci'
db_cl_names='latin1_swedish_ci'
created=153256168920
