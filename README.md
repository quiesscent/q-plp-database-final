# Database Weeek 8 Assignments


## QUESTIION ONE

**Use Case: Clinic Booking System**

#### Plan
- Patients Table
- Doctors  Table
- Appointments Table
- Specializations Table
- Doctors Specializations


The sql file contains
- Create Table Statements
- Constraints
- Sample Data for Testing

## Project ERD Diagram
![ERD](./erd-final.jpeg)

---

## QUESTION TWO

**Use Case: A Task Management System**


### Plan
- Users Table
- Tasks Table
- Tasks are Assigned by Users

### Tech Stack
- Nodejs
- Expressjs
- Prisma ORM
- MySQL
- JWT (Authentication and Session Handling)

### API ENDPOINTS

| Method | ENDPOINT | DESCRIPTION |
| POST | /api/auth/login | user login |
| POST | /api/auth/register | user registration |
| POST | /api/tasks/create | user create task |
| GET  | /api/tasks/view/:id | view task details |
| DEL | /api/tasks/delete/:id | delete task |
| UPDATE | /api/tasks/update/:id | update task complete |

---
### Set-up and Installation

#### Clone the repo
```bash
git clone https://github.com/quiesscent/q-plp-database-final
```
---

#### Navigate to Question 2 Directory
```bash
cd question-2
```
---

#### Install Packages
```bash
npm i
```
---
#### Set up a database connection
```sql
-- create a database and a user
CREATE DATABASE db_name;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user_password';
-- grant privileges to the user
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
```
---
#### Add a database to .env file (create one)
```bash
// add the database link
DATABASE_URL="mysql://admin:admin@localhost:3306/task_manager_db"

// add the jwt secret key (for sessions)
JWT_SECRET="my secret key"
```
---
#### Run Prisma Migrate to Sync the Database
```bash
npx prisma migrate dev

// you will be prompted to enter the migration name
```
---

#### Start the app
```bash
npm run dev
```

---

## Author

[Ephesians Lewis](the-quiesccent-hub.vercel.app)