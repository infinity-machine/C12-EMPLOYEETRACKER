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

const {getDependantChoices, printTableReturn} = require('./libs/utilities')

// WRITE THESE FUNCTIONS!!!!!!


function exitProgram() {
    console.log('GOODBYE!')
    process.exit(0)
}
function updEmp() { }


// ADD EMPLOYEE
function addEmp() {
    getDependantChoices('roles', add_emp_prompt)
    inquirer.prompt(add_emp_prompt)
        // .then(data => {
        //     let { first_name, last_name } = data
        //     db.query(`INSERT INTO emps (first_name, last_name) VALUES ('${first_name}', '${last_name}')`)
        //     console.log(`EMPLOYEE ${first_name} ${last_name} ADDED!`)
        //     mainMenu()
        // });
}


function promptThenQuery(prompt, query, callback) {
    inquirer.prompt(prompt)
        .then (data => {
            let
        }) 
}

// ADD ROLE
function addRole() {
    getDependantChoices('depts', add_role_prompt)
    inquirer.prompt(add_role_prompt)
        .then(data => {
            console.log(data)
            // let { title, salary } = data
            // db.query(`INSERT INTO roles (title, salary) VALUES ('${title}', ${salary})`)
            // console.log(`ROLE ${title} CREATED!`)
            // mainMenu()
        })
}
// ADD DEPARTMENT
function addDept() {
    inquirer.prompt(add_dept_prompt)
        .then(data => {
            let { dept_name } = data
            db.query(`INSERT INTO depts (dept_name) VALUES ('${dept_name}')`)
            console.log(`DEPARTMENT ${dept_name} CREATED!`)
            mainMenu()
        });
};
// VIEW ALL EMPLOYEES
function viewEmps() {
    printTableReturn('emps', return_menu, mainMenu)

};
// VIEW ALL ROLES
function viewRoles() {
    printTableReturn('roles', return_menu, mainMenu)
};
// VIEW ALL DEPARTMENTS
function viewDepts() {
    printTableReturn('depts', return_menu, mainMenu)
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
  
