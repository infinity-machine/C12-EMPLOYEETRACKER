const inquirer = require('inquirer')
const main_menu_prompt = [{
    type: 'list',
    name: 'main_menu',
    message: '~MAIN MENU~',
    choices: [
        'VIEW ALL DEPARTMENTS',
        new inquirer.Separator(),
        'VIEW ALL ROLES',
        new inquirer.Separator(),
        'VIEW ALL EMPLOYEES',
        new inquirer.Separator(),
        'ADD DEPARTMENT',
        new inquirer.Separator(),
        'ADD ROLE',
        new inquirer.Separator(),
        'ADD EMPLOYEE',
        new inquirer.Separator(),
        'UPDATE EXISTING EMPLOYEE',
        new inquirer.Separator()
    ]
}]


const add_dept_prompt = [{
    type: 'input',
    name: 'dept_title',
    message: 'TITLE OF DEPARTMENT TO CREATE?'
}];
const add_role_prompt = [{
    type: 'input',
    name: 'role_title',
    message: 'TITLE OF ROLE TO CREATE?'
}];
const add_emp_prompt = [{
    type: 'input',
    name: 'emp_name',
    message: 'NAME OF EMPLOYEE TO ADD?'
}];
const upd_emp_role_prompt = [{
    type: 'input',
    name: 'upd_emp_select',
    message: 'NAME OF EMPLOYEE TO UPDATE?'
},
{
    type: 'input',
    name: 'upd_emp_role',
    message: 'ENTER NEW EMPLOYEE ROLE'
}];

module.exports = {
    main_menu_prompt,
    add_dept_prompt,
    add_role_prompt,
    add_emp_prompt,
    upd_emp_role_prompt
}