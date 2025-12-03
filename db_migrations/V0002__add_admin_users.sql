-- Add admin and superadmin users
-- Password for admin@example.com is 'admin123' (hash: 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9)
-- Password for superadmin@example.com is 'superadmin123' (hash: e02a1a8809e830cf7b7c875e43c16eec5f3dd2dd1d6f7f72f1e3b178e3e4f2e3)

INSERT INTO users (email, password_hash, full_name, role, department, position, is_active) 
VALUES 
  ('admin@example.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Администратор', 'admin', 'Администрация', 'Администратор', true),
  ('superadmin@example.com', 'e02a1a8809e830cf7b7c875e43c16eec5f3dd2dd1d6f7f72f1e3b178e3e4f2e3', 'Главный администратор', 'superadmin', 'Администрация', 'Главный администратор', true)
ON CONFLICT (email) DO NOTHING;