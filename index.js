// REQUIRES
const inquirer = require('inquirer');
const fs = require('fs');
// REQUIRES
const figlet = require('figlet');
const chalk = require('chalk');
const cTable = require('console.table');
const db = require('./db/connection')
const {
    return_menu, main_menu_prompt, add_dept_prompt, add_role_prompt, add_emp_prompt, upd_emp_role_prompt
} = require('./libs/prompts');
const {getDependantChoices, printDepts, printRoles, printEmps, promptThenCallback, matchedChoiceQueryInsert, insertDepartment, updateEmpRole} = require('./libs/utilities')
// EXIT PROGRAM
function exitProgram() {
    console.log('GOODBYE!')
    process.exit(0)
}
// UPDATE EMPLOYEE
function updEmp() {
    getDependantChoices('first_name, last_name', 'emps', upd_emp_role_prompt, 0);
    getDependantChoices('title', 'roles', upd_emp_role_prompt, 1)
    setTimeout(() => {
        inquirer.prompt(upd_emp_role_prompt)
            .then(data => {
                let {upd_emp_select, upd_emp_role} = data
                updateEmpRole(upd_emp_select, upd_emp_role)
                console.log(`ROLE OF ${upd_emp_select} HAS BEEN CHANGED TO ${upd_emp_role}`)
                mainMenu()
            })
    }, 250);
    // 
//     console.log(upd_emp_role_prompt)
}
// ADD EMPLOYEE
function addEmp() {
    getDependantChoices('title', 'roles', add_emp_prompt, 2)
    inquirer.prompt(add_emp_prompt)
        .then(data => {
            let { first_name, last_name, role_choice } = data
            matchedChoiceQueryInsert('emps', first_name, last_name, role_choice)
            console.log(`EMPLOYEE ${first_name} ${last_name} ADDED!`)
            mainMenu()
        });
}
// ADD ROLE
function addRole() {
    getDependantChoices('dept_name', 'depts', add_role_prompt, 2)
    inquirer.prompt(add_role_prompt)
        .then(data => {
            let { title, salary, dept_choice} = data
            matchedChoiceQueryInsert('roles', title, salary, dept_choice)
            console.log(`ROLE ${title} CREATED!`)
            mainMenu()
        })
}
// ADD DEPARTMENT
function addDept() {
    inquirer.prompt(add_dept_prompt)
        .then(data => {
            let { dept_name } = data
            insertDepartment(dept_name)
            mainMenu()
        });
};
// VIEW ALL EMPLOYEES
function viewEmps() {
    printEmps()
    promptThenCallback(return_menu, mainMenu)
};
// VIEW ALL ROLES
function viewRoles() {
    printRoles()
    promptThenCallback(return_menu, mainMenu)
};
// VIEW ALL DEPARTMENTS
function viewDepts() {
    printDepts()
    promptThenCallback(return_menu, mainMenu)
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
        }, 1000);
    });
}
// CALLS
figletBanner()
    .then(mainMenu)
  
