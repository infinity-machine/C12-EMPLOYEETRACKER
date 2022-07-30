// REQUIRES
const inquirer = require('inquirer');
const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');
const cTable = require('console.table');
const db = require('./db/connection')
const { 
    return_menu, main_menu_prompt, add_dept_prompt, add_role_prompt, add_emp_prompt, upd_emp_role_prompt
} = require('./libs/prompts');

// WRITE THESE FUNCTIONS!!!!!!
function exitProgram() {
    console.log('GOODBYE!')
    process.exit(0)
}
function updEmp() {}
function addEmp() {
    inquirer.prompt(add_emp_prompt)
        .then(data => {
            let { first_name, last_name, emp_id } = data
            db.query(`INSERT INTO emps (emp_id, first_name, last_name) VALUES (${emp_id}, '${first_name}', '${last_name}')`)
            console.log(`EMPLOYEE ${first_name} ${last_name} ADDED!`)
            mainMenu()
        });
}
function addRole() {
    inquirer.prompt(add_role_prompt)
        .then(data => {
            let { role_id, title, salary, dept_id } = data
            db.query(`INSERT INTO roles (role_id, title, salary) VALUES (${role_id}, '${title}', ${salary})`)
            console.log(`ROLE ${title} CREATED!`)
            mainMenu()
        });
}







function addDept() {
    inquirer.prompt(add_dept_prompt)
        .then(data => {
            let { dept_name, dept_id } = data
            db.query(`INSERT INTO depts (dept_id, dept_name) VALUES (${dept_id}, '${dept_name}')`)
            console.log(`DEPARTMENT ${dept_name} CREATED!`)
            mainMenu()
        });
};


// VIEW ALL EMPLOYEES
function viewEmps() {
    db.query('SELECT * FROM emps', (err, data) => {
        if (err) console.log(err);
        console.table(data);
        return inquirer.prompt(return_menu)
            .then(() => {
                mainMenu()
            });
    });
};
// VIEW ALL ROLES
function viewRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) console.log(err);
        console.table(data);
        return inquirer.prompt(return_menu)
            .then(() => {
                mainMenu()
            });
    });
};
// VIEW ALL DEPARTMENTS
function viewDepts() {
    db.query('SELECT * FROM depts', (err, data) => {
        if (err) console.log(err);
        console.table(data);
        return inquirer.prompt(return_menu)
            .then(() => {
                mainMenu()
            });
    });
};
// MAIN MENU
function mainMenu() {
    return inquirer.prompt(main_menu_prompt)
        .then(data => {
            let selection = data.main_menu
            if (selection === 'VIEW ALL DEPARTMENTS') viewDepts();
            if (selection === 'VIEW ALL ROLES') viewRoles();
            if (selection === 'VIEW ALL EMPLOYEES') viewEmps();
            if (selection === 'ADD DEPARTMENT') addDept();
            if (selection === 'ADD ROLE') addRole();
            if (selection === 'ADD EMPLOYEE') addEmp();
            if (selection === 'UPDATE EXISTING EMPLOYEE') updEmp();
            if (selection === 'EXIT PROGRAM') exitProgram();
        })
}
// BEGIN EMPLOYEETRACKERBOT
function figletBanner() {
    figlet('EMPLOYEETRACKERBOT!', function (err, banner) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(chalk.blue(banner));
        console.log('EMPLOYEETRACKERBOT COPYRIGHT 2022 SHLERM INDUSTRIAL SOLUTIONS CORPORATION');
    });
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

// CALLS
figletBanner()
    .then(mainMenu)
