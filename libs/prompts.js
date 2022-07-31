const inquirer = require('inquirer')

const return_menu = [{
    type: 'input',
    message: 'ENTER OK TO RETURN TO MAIN MENU',
    name: 'ok',
    validate: (answer) => {
        if (answer == 'ok' || answer == 'OK') { return true }
        else { return 'YOU MUST ENTER OK TO PROCEED!' }
    }
}]
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
        new inquirer.Separator(),
        'EXIT PROGRAM',
        new inquirer.Separator()
    ]
}]

const add_dept_prompt = [{
    type: 'input',
    name: 'dept_name',
    message: 'NAME OF DEPARTMENT TO CREATE?'
}];

const add_role_prompt = [{
    type: 'input',
    name: 'title',
    message: 'TITLE OF ROLE TO CREATE?'
},
{
    type: 'input',
    name: 'salary',
    message: 'SALARY OF NEW ROLE?'
},
{
    type: 'list',
    name: 'dep_choices',
    message: 'DEPARTMENT CONTAINING NEW ROLE?'
}];
const add_emp_prompt = [{
    type: 'input',
    name: 'first_name',
    message: 'FIRST NAME OF EMPLOYEE TO ADD?'
},
{
    type: 'input',
    name: 'last_name',
    message: 'LAST NAME OF EMPLOYEE TO ADD?'
},
{
    type: 'list',
    name: 'dep_choices',
    message: 'ROLE OF NEW EMPLOYEE?'
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
    return_menu,
    main_menu_prompt,
    add_dept_prompt,
    add_role_prompt,
    add_emp_prompt,
    upd_emp_role_prompt
}

