const db = require('../db/connection')
const inquirer = require('inquirer')

// CREATES UPDATED LIST OF DEPARTMENTS TO CHOOSE FROM IN ADD ROLE PROMPT
function getDependantChoices(table_to_reference, prompt) {
    choices = []
    db.query(`SELECT * FROM ${table_to_reference}`, (err, data) => {
        if (err) return console.log(err)
        for (i = 0; i < data.length; i++) {
            choices.push(data[i].dept_name)
            prompt[prompt.length - 1].choices = choices
        }
    });
}

// PRINTS TABLE, RUNS A PROMPT, FIRES A CALLBACK
function printTableReturn(table, prompt, callback) {
    db.query(`SELECT * FROM ${table}`, (err, data) => {
        if (err) return console.log(err);
        console.table(data)
        return inquirer.prompt(prompt)
            .then(() => {
                callback()
            });
    })
}








module.exports = {
    getDependantChoices, printTableReturn
}