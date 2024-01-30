-- создание пользователя "developer" если его нет
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'devuser') THEN
    CREATE USER devuser WITH PASSWORD 'devuser';
  END IF;
END $$;

-- Создание базы данных auth_service_database, если её нет
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'auth_service_database') THEN
    CREATE DATABASE auth_service_database;
  END IF;
END $$;

-- предоставление прав пользователю на базу данных
GRANT ALL PRIVILEGES ON DATABASE auth_service_database TO devuser;

-- создание таблицы users
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  surname VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  patronymic VARCHAR(255) NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  is_email_address_verified BOOLEAN,
  phone_number VARCHAR(11) NOT NULL,
  is_phone_number_verified BOOLEAN,
  password VARCHAR(255) NOT NULL,
  is_active BOOLEAN,
  deactivated_at TIMESTAMP
);

-- Вставка данных для пользователей в таблицу users
INSERT INTO users (surname, name, patronymic, email_address, is_email_address_verified, phone_number, is_phone_number_verified, password, is_active)
VALUES
  ('Иванов', 'Иван', 'Иванович', 'ivan.ivanov@example.com', true, '79123456789', true, 'password123', true),
  ('Петров', 'Петр', 'Петрович', 'petr.petrov@example.com', true, '79234567890', true, 'securepass456', false),
  ('Сидоров', 'Сидор', 'Сидорович', 'sidor.sidorov@example.com', true, '79345678901', true, 'strongpass789', true);

-- таблица user_role
CREATE TABLE user_role (
  code VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Вставка данных для ролей пользователей в таблицу user_role
INSERT INTO user_role (code, name) VALUES
  ('admin', 'Администратор системы'),
  ('service', 'Сервис'),
  ('user', 'Пользователь системы');

-- Создание промежуточной таблицы user_role_assignment для связи многие-ко-многим
CREATE TABLE user_role_assignment (
  assignment_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  role_code VARCHAR(255) REFERENCES user_role(code),
  UNIQUE (user_id, role_code)
);

INSERT INTO user_role_assignment (user_id, role_code) VALUES (1, 'admin');
INSERT INTO user_role_assignment (user_id, role_code) VALUES (2, 'user');
INSERT INTO user_role_assignment (user_id, role_code) VALUES (3, 'user');
INSERT INTO user_role_assignment (user_id, role_code) VALUES (1, 'user');
