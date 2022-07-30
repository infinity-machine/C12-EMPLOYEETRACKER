DROP DATABASE IF EXISTS emp_data;

CREATE DATABASE emp_data;

use emp_data;

CREATE TABLE depts(
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE roles(
    role_id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT
);

CREATE TABLE emps(
    emp_id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);
