Use emp_data;

-- insert into emps (emp_id, first_name, last_name, role_id) VALUES (1, 'billy', 'jenkins', 1), (2, 'steven', 'larson', 2), (3, 'patricia', 'miller', 3);

-- SELECT * FROM emp;

-- insert into roles (role_id, title, salary, dept_id) VALUES (1, 'cook', 18.00, 8), (2, 'scientist', 22.00 9), (3, 'farmer', 17.00, 13);

-- SELECT * FROM roles;

insert into depts (dept_id, dept_name) VALUES (1, 'kitchen'), (2, 'laboratory'), (3, 'farm');

-- SELECT dept_id FROM depts WHERE dept_name = 'kitchen'
SELECT * FROM emps