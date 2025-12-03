-- Создание таблиц для АСУБТ (Автоматизированная система управления безопасностью труда)

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'admin', 'superadmin')),
    department VARCHAR(255),
    position VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Таблица документов по охране труда
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    doc_type VARCHAR(100) NOT NULL,
    content TEXT,
    file_url VARCHAR(500),
    version INTEGER DEFAULT 1,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active'
);

-- Таблица мероприятий по охране труда
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    event_type VARCHAR(100) NOT NULL,
    responsible_user_id INTEGER REFERENCES users(id),
    planned_date DATE,
    completed_date DATE,
    status VARCHAR(50) DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'overdue')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица обучения и инструктажей
CREATE TABLE IF NOT EXISTS training (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    training_type VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    instructor_id INTEGER REFERENCES users(id),
    training_date DATE NOT NULL,
    expiry_date DATE,
    status VARCHAR(50) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица специальной оценки условий труда (СОУТ)
CREATE TABLE IF NOT EXISTS work_conditions_assessment (
    id SERIAL PRIMARY KEY,
    workplace VARCHAR(255) NOT NULL,
    assessment_date DATE NOT NULL,
    class_conditions VARCHAR(50),
    subclass_conditions VARCHAR(50),
    responsible_user_id INTEGER REFERENCES users(id),
    next_assessment_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица средств индивидуальной защиты (СИЗ)
CREATE TABLE IF NOT EXISTS ppe (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    ppe_type VARCHAR(255) NOT NULL,
    ppe_name VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    quantity INTEGER DEFAULT 1,
    status VARCHAR(50) DEFAULT 'issued',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица медицинских осмотров
CREATE TABLE IF NOT EXISTS medical_examinations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    exam_type VARCHAR(100) NOT NULL,
    exam_date DATE NOT NULL,
    next_exam_date DATE,
    result VARCHAR(100),
    medical_facility VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица несчастных случаев и происшествий
CREATE TABLE IF NOT EXISTS incidents (
    id SERIAL PRIMARY KEY,
    incident_date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    injured_user_id INTEGER REFERENCES users(id),
    severity VARCHAR(50) CHECK (severity IN ('minor', 'moderate', 'severe', 'fatal')),
    investigation_status VARCHAR(50) DEFAULT 'pending',
    responsible_investigator_id INTEGER REFERENCES users(id),
    root_cause TEXT,
    corrective_actions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица проверок и аудитов
CREATE TABLE IF NOT EXISTS audits (
    id SERIAL PRIMARY KEY,
    audit_type VARCHAR(100) NOT NULL,
    audit_date DATE NOT NULL,
    auditor_id INTEGER REFERENCES users(id),
    area VARCHAR(255),
    findings TEXT,
    recommendations TEXT,
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица уведомлений
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для производительности
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_documents_type ON documents(doc_type);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_responsible ON events(responsible_user_id);
CREATE INDEX idx_training_user ON training(user_id);
CREATE INDEX idx_incidents_date ON incidents(incident_date);
CREATE INDEX idx_notifications_user ON notifications(user_id);