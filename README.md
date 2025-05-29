# 🔐 Web Application - Employee Management System

This project is a simple web-based Employee Management System built with **HTML**, **CSS**, and **JavaScript**. It includes:

- A login page with username and password validation
- Navigation to an employee search and management page upon successful login
- Employee addition and search functionality
- Validation and input constraints on forms
- Sample credentials pre-filled on the login page

---

## 🚀 Features

### ✅ Login Page
- Pre-filled with sample credentials:
  - **Username**: `admin`
  - **Password**: `admin123`
- Validates user input and navigates to `employee.html` on success
- Displays error on incorrect credentials

### 👥 Employee Management
(Planned in `employee.html`)
- Add Employee:
  - Auto-generated Employee ID (`EMPX00001` format)
  - Auto-generated login ID from first character of first name and full last name
  - Unique check for login ID, with random numeric suffix if conflict
  - DOB input with validation (`DD-Mon-YYYY`) and age check (>18 years)
  - Department dropdown (Engineering, Support, HR, Finance)
  - Address fields (Permanent and Current)
  - Salary field
  - PDF upload for ID proof (size between 10KB and 1MB)
- Search Filter:
  - Based on Employee ID, Name, Login ID, DOB Range, Department
- Grid View with:
  - Pagination
  - Multi-select delete
  - Actions menu (View, Edit, Delete, History)

---

## 🧱 Folder Structure

project-root/
├── index.html # Login page
├── style.css # CSS styles for login
├── script.js # JavaScript logic for login validation
![Screenshot 2025-05-29 205533](https://github.com/user-attachments/assets/c84e1033-0a30-47d5-aaac-d0a96887f6f7)

![Screenshot 2025-05-29 205617](https://github.com/user-attachments/assets/8caf05b5-9585-436b-a6f6-ad6560c06f93)

![Screenshot 2025-05-29 205631](https://github.com/user-attachments/assets/c425fe29-8267-4f18-9126-9642d22e13c8)

