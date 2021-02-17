const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArr = []
const idArr = []


const runApp = () => {
    // function for manager prompts
    const makeManager = () => {
        inquirer.prompt([
            { 
                type: 'input',
                name: 'managerName',
                message: "What is your manager's name?"
            },
            {
                type: 'input',
                name: 'managerId',
                message: "What is your manager's ID?",
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: "What is your  manager's email?"
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "What is your manager's office number?"
            },
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber)
            employeeArr.push(manager);
            idArr.push(answers.managerId);
            makeTeam();
        })
    }
    // function to prompt user to choose team members and to run assigned functions using switch case
    const makeTeam = () => {
        inquirer.prompt([
        {
            type: 'list',
            name: 'employeeChoice',
            message: 'Would you like to enter another employee?',
            choices: ['Engineer', 'Intern', 'I am finished']
        }
        ]).then(choice => { 
            // using switch case I learned on codecademy
            switch(choice.employeeChoice) {
                case "Engineer": 
                    makeEngineer();
                    break;
                case "Intern":
                    makeIntern();
                    break;
                default:
                    generateTeam();
            }
        })
    }
    // function for Engineer prompts
    const makeEngineer = () => {
        inquirer.prompt([
            { 
                type: 'input',
                name: 'engineerName',
                message: "What is your Engineer's name?"
            },
            {
                type: 'input',
                name: 'engineerId',
                message: "What is your Engineer's ID?",
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: "What is your Engineer's email?"
            },
            {
                type: 'input',
                name: 'github',
                message: "What is your Engineer's GitHub?"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github)
            employeeArr.push(engineer);
            idArr.push(answers.engineerId)
            makeTeam();
        })
    }

    // function for Intern prompts
    const makeIntern = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: "What is your Intern's name?"
            },
            {
                type: 'input',
                name: 'internId',
                message: "What is your Intern's ID?",
            },
            {
                type: 'input',
                name: 'internEmail',
                message: "What is your Intern's email?"
            },
            {
                type: 'input',
                name: 'school',
                message: 'What school does your intern attend?'
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.school)
            employeeArr.push(engineer);
            idArr.push(answers.internId)
            makeTeam();
        })
    }

    // function to create output directory
    const generateTeam = () => {
        // if output directory doesnt exist, make one
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(employeeArr), "utf-8")
    }

    makeManager();
    
}

runApp();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

