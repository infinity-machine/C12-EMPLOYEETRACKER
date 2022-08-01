const db = require('../db/connection')
const inquirer = require('inquirer')
const {
    return_menu, main_menu_prompt, add_dept_prompt, add_role_prompt, add_emp_prompt, upd_emp_role_prompt
} = require('./prompts')

// REPLACES NAME VALUE FROM DB TABLE TO CORRESPONDING ID VALUE, CALLS INSERT FUNCTION
function matchedChoiceQueryInsert(table, first, second, choice) {
    if (arguments[0] === 'roles') {
        db.query(`SELECT dept_id FROM depts WHERE dept_name = '${choice}'`, (err, data) => {
            if (err) return console.log(err)
            choice_id= Object.values(data.pop())[0]
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
function getDependantChoices(column, table, prompt) {
    let dependant_choices = []
    db.query(`SELECT ${column} FROM ${table}`, (err, data) => {
        if (err) return console.log(err);
        for (i = 0; i < data.length; i++) {
            dependant_choices.push(Object.values(data[i])[0])
            prompt[prompt.length - 1].choices = dependant_choices
        }
    })
}
// INSERT EMPLOYEE INTO DB
function insertEmp(first_name, last_name, role_id) {
    db.query(`INSERT INTO emps (first_name, last_name, role_id) VALUES ('${first_name}', '${last_name}', ${role_id})`)
    console.log(`EMPLOYEE ${first_name} ${last_name} ADDED!`)
}
// INSERT ROLE INTO DB
function insertRole(title, salary, dept_id) {
    db.query(`INSERT INTO roles (title, salary, dept_id) VALUES ('${title}', ${salary}, ${dept_id})`)
    console.log(`ROLE ${title} CREATED!`)
}
// INSERT DEPARTMENT INTO DB
function insertDepartment(dept_name) {
    db.query(`INSERT INTO depts (dept_name) VALUES ('${dept_name}')`)
    console.log(`DEPARTMENT ${dept_name} CREATED!`)
}
// PRINTS TABLE FROM DB, RUNS A PROMPT, FIRES A CALLBACK
function printTableReturn(table, prompt, callBack) {
    db.query(`SELECT * FROM ${table}`, (err, data) => {
        if (err) return console.log(err);
        console.table(data)
        return inquirer.prompt(prompt)
            .then(() => {
                callBack()
            });
    })
}
// EXPORTS
module.exports = {
    getDependantChoices, matchedChoiceQueryInsert, insertDepartment, insertRole, printTableReturn
}