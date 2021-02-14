const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generateReadme = require("./utils/generateMarkdown")
const writeFileAsync = util.promisify(fs.writeFile);

//Prompt the user questions to populate the README.md
function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "projectName",
            message: "What is the name of your project?",
            validate: projectNameInput => {
                if (projectNameInput) {
                  return true;
                } else {
                  console.log('Please enter your projects name!');
                  return false;
                }
            }
        },
        {
            type: "list",
            name: "license",
            message: "Which licence will you be using?: ",
            choices: [
                "Apache",
                "Academic",
                "GNU",
                "ISC",
                "MIT",
                "Mozilla",
                "Open"
            ]
        },
        {
            type: "input",
            name: "description",
            message: "Write a brief description of your project: "
        },
        {
            type: "input",
            name: "installation",
            message: "Describe the installation process if any: ",
        },
        {
            type: "input",
            name: "usage",
            message: "What is the general use of this project?"
        },
        
        {
            type: "input",
            name: "contributing",
            message: "Who helped build this project?"
        },
        {
            type: "input",
            name: "tests",
            message: "Are there any tests that will need to be performed?"
        },
        {
            type: "input",
            name: "questions",
            message: "Who can I contact about questions? "
        },
        {
            type: "input",
            name: "username",
            message: "Please enter your GitHub username: "
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email: "
        }
    ]);
} 

// Async function using util.promisify 
  async function init() {
    try {
        // Ask user questions and generate responses
        const answers = await promptUser();
        const generateContent = generateReadme(answers);
        // Write new README.md to dist directory
        await writeFileAsync('./Readme.md', generateContent);
        console.log('✔️  Successfully wrote to README.md');
    }   catch(err) {
        console.log(err);
    }
  }
  
  init();  