// REQUIRES
const inquirer = require('inquirer');
const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');
const cTable = require('console.table');
const { 
    main_menu_prompt, add_dept_prompt, add_role_prompt, add_emp_prompt, upd_emp_role_prompt
} = require('./libs/prompts')
// MAIN MENU
function mainMenu() {
    return inquirer.prompt(main_menu_prompt)
        .then(data => {
            let selection = data.main_menu
            if (selection === 'VIEW ALL DEPARTMENTS') {viewDepts()};
            if (selection === 'VIEW ALL ROLES') {viewRoles()};
            if (selection === 'VIEW ALL EMPLOYEES') {viewEmps()};
            if (selection === 'ADD DEPARTMENT') {addDept()};
            if (selection === 'ADD ROLE') {addRole()};
            if (selection === 'ADD EMPLOYEE') {addEmp()}
            if (selection === 'UPDATE EXISTING EMPLOYEE') {updEmp()}
        })
}
// LAUNCH PROGRAM
function launchEmpTracker() {
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
launchEmpTracker()
    .then(mainMenu)

// var values = [
//     {
//         'col1': [69, 'yellow', true],
//         'col2': ['lemons', 420, false]
//     }
// ]
// console.table('several objects lol', values)