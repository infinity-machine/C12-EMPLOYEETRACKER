const db = require('../db/connection')
const inquirer = require('inquirer')
const {
    return_menu, main_menu_prompt, add_dept_prompt, add_role_prompt, add_emp_prompt, upd_emp_role_prompt
} = require('./prompts')
// UPDATE EMPLOYEE ROLE IN DB
function updateEmpRole(emp, role) {
    db.query(`SELECT role_id FROM roles WHERE title = '${role}'`, (err, data) => {
        choice_id = Object.values(data.pop())[0]
        emp = emp.split(' ')[1]
        db.query(`UPDATE emps SET role_id = ${choice_id} WHERE last_name = '${emp}'`)
    })
}
// REPLACES NAME VALUE FROM DB TABLE TO CORRESPONDING ID VALUE, CALLS INSERT FUNCTION
function matchedChoiceQueryInsert(table, first, second, choice) {
    if (arguments[0] === 'roles') {
        db.query(`SELECT dept_id FROM depts WHERE dept_name = '${choice}'`, (err, data) => {
            if (err) return console.log(err)
            choice_id = Object.values(data.pop())[0]
            insertRole(first, second, choice_id)
        })
    }
    if (arguments[0] === 'emps') {
        db.query(`SELECT role_id FROM roles WHERE title = '${choice}'`, (err, data) => {
            if (err) return console.log(err)
            choice_id = Object.values(data.pop())[0]
            insertEmp(first, second, choice_id)
        })
    }
}
// POPULATES PROMPT CHOICES WITH UPDATED DATA FROM SEPERATE TABLE
function getDependantChoices(column, table, prompt, prompt_index) {
    let dependant_choices = []
    db.query(`SELECT ${column} FROM ${table}`, (err, data) => {
        if (err) return console.log(err);
        for (i = 0; i < data.length; i++) {
            if (Object.values(data[i]).length === 1) {
                dependant_choices.push(Object.values(data[i])[0])
            }
            if (Object.values(data[i]).length === 2) {
                dependant_choices.push(`${Object.values(data[i])[0]} ${Object.values(data[i])[1]}`)
            }
        }
        prompt[prompt_index].choices = dependant_choices
    })
}
// INSERT EMPLOYEE INTO DB
function insertEmp(first_name, last_name, role_id) {
    db.query(`INSERT INTO emps (first_name, last_name, role_id) VALUES ('${first_name}', '${last_name}', ${role_id})`)
}
// INSERT ROLE INTO DB
function insertRole(title, salary, dept_id) {
    db.query(`INSERT INTO roles (title, salary, dept_id) VALUES ('${title}', ${salary}, ${dept_id})`)

}
// INSERT DEPARTMENT INTO DB
function insertDepartment(dept_name) {
    db.query(`INSERT INTO depts (dept_name) VALUES ('${dept_name}')`)
    console.log(`DEPARTMENT ${dept_name} CREATED!`)
}

// const sql_table_depts = 

function promptThenCallback(prompt, callback) {
    setTimeout(() => {
        return inquirer.prompt(prompt)
            .then(callback)
    }, 500);
}
function printEmps() {
    db.query(`SELECT emp_id as "EMPLOYEE ID",
    first_name as "FIRST NAME",
    last_name as "LAST NAME",
    role_id as "ROLE ID"
    FROM emps`, (err, data) => {
        if (err) return console.log(err);
        console.table(data)
    })
}
function printRoles() {
    db.query(`SELECT role_id as "ROLE ID",
    title as TITLE,
    salary as SALARY,
    dept_id as "DEPT ID"
    FROM roles`, (err, data) => {
        if (err) return console.log(err);
        console.table(data)
    })
}
function printDepts() {
    db.query(`SELECT dept_id AS "DEPT ID",
    dept_name AS DEPARTMENT
    FROM depts`, (err, data) => {
        if (err) return console.log(err);
        console.table(data)
    })
}
// EXPORTS
module.exports = {
    getDependantChoices, printDepts, printRoles, printEmps, promptThenCallback, matchedChoiceQueryInsert, insertDepartment, insertRole, updateEmpRole
}