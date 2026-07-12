# Attendance System MVP

## Overview

The Attendance System MVP consists of three roles:

- Admin
- Teacher
- Parent / Public

The primary goal is to manage student attendance during religious classes.

---

# Admin

## Dashboard

Displays:

- Total Students
- Today's Attendance Count
- Students Present Today
- Latest Attendance

## Student Management

CRUD operations:

- Create Student
- Update Student
- Delete Student
- Search Student

Fields:

- NIS
- Student Name
- Class
- Room
- Guardian Name
- Guardian Phone
- Address

## Attendance Report

Features:

- View all attendance records
- Filter by Date
- Filter by Class

Columns:

- Student Name
- Class
- Teacher
- Subject
- Date
- Time
- Attendance Status
- Notes

---

# Teacher

## Dashboard

Displays:

- Today's Attendance Count
- Recent Attendance History

## Attendance Input

Workflow:

1. Select Class
2. Select Subject
3. Display students in selected class
4. Record attendance for each student
5. Save attendance

Attendance Form

Automatic fields:

- Date
- Time
- Teacher

Input fields:

- Class
- Subject

Student List Columns:

- NIS
- Student Name
- Attendance Status
- Notes (optional)

Attendance Status:

- Present
- Sick
- Permission
- Absent

## Attendance History

Displays:

- Date
- Time
- Class
- Subject
- Student Count
- Present Count
- Absent Count

---

# Parent / Public

No authentication required.

Features:

- Search by Student Name
- Search by NIS

Displays:

- Student Name
- NIS
- Class
- Room
- Date
- Time
- Subject
- Teacher
- Attendance Status
- Notes

---

# Access Control

## Admin

Can:

- Manage Students
- View Attendance Reports

## Teacher

Can:

- Record Attendance
- View Own Attendance History

## Parent / Public

Can:

- Search Student Attendance

---

# Business Rules

- Attendance date is generated automatically.
- Attendance time is generated automatically.
- Teacher is taken from the authenticated user.
- Notes are optional.
- Parent access does not require authentication.

---

# MVP Constraints

Only Student is a managed master entity.

The following are static lookup values for MVP:

- Class
- Teacher
- Subject

These are hardcoded or configured in the application and do not have CRUD functionality.

The architecture should allow these lookups to become managed entities in future versions without requiring major refactoring.
