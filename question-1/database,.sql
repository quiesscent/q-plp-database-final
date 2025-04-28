-- =============================
-- Clinic Booking System Database
-- =============================

-- Drop tables if they already exist (for fresh setup)
DROP TABLE IF EXISTS doctor_specializations;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS specializations;

-- Create Patients table
CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE,
    date_of_birth DATE
);

-- Create Doctors table
CREATE TABLE doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE,
    experience_years INT DEFAULT 0
);

-- Create Specializations table
CREATE TABLE specializations (
    specialization_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Create DoctorSpecializations table (M-M Relationship)
CREATE TABLE doctor_specializations (
    doctor_id INT,
    specialization_id INT,
    PRIMARY KEY (doctor_id, specialization_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (specialization_id) REFERENCES specializations(specialization_id) ON DELETE CASCADE
);

-- Create Appointments table
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    reason TEXT,
    status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

-- ==========================================
-- Insert Sample Data
-- ==========================================

-- Insert Patients
INSERT INTO patients (first_name, last_name, phone_number, email, date_of_birth)
VALUES
('John', 'Doe', '1234567890', 'john.doe@example.com', '1990-05-15'),
('Jane', 'Smith', '0987654321', 'jane.smith@example.com', '1985-09-25');

-- Insert Doctors
INSERT INTO doctors (first_name, last_name, phone_number, email, experience_years)
VALUES
('Dr. Sarah', 'Johnson', '1112223333', 'sarah.johnson@clinic.com', 10),
('Dr. Mike', 'Brown', '4445556666', 'mike.brown@clinic.com', 5);

-- Insert Specializations
INSERT INTO specializations (name)
VALUES
('Cardiology'),
('Dermatology'),
('Pediatrics');

-- Map Doctors to Specializations
INSERT INTO doctor_specializations (doctor_id, specialization_id)
VALUES
(1, 1), -- Dr. Sarah - Cardiology
(2, 3); -- Dr. Mike - Pediatrics

-- Insert Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason, status)
VALUES
(1, 1, '2025-05-01 10:00:00', 'Chest Pain', 'Confirmed'),
(2, 2, '2025-05-02 14:00:00', 'Fever', 'Pending');
