#! /usr/bin/env node
import inquirer from "inquirer"
import chalk from "chalk"
let questions: any = {
    "what is the 5th letter in english alphabet": { "E": ['E', "F", "G", "N.O.T"] },
    "He is ____ smart guy": { "a": ['a', "an", "not", "N.O.T"] },
    "inquirer is a ____": { "module": ['variable', "function", "module", "N.O.T"] },
    "Current governor of Sindh": { "Kamra khan tessori": ['Imran khan', "Kamra khan tessori", "Shahbaz shareef", "N.O.T"] },
    "Which of the following animal is Haram": { "Lion": ['Chicken', "Cow", "Lion", "N.O.T"] },
}
let answerKey;
let options
let score = 0
let game
let questionsTotal = Object.keys(questions).length
let questionsDone = 0
const sepMess = (m: string) => console.log(`----------------------------------------- \n ${chalk.cyan(m)}`)
const gameFunc = async () => {

    for (let i in questions) {
        answerKey = Object.keys(questions[i])[0]
        options = questions[i][answerKey];

        game = await inquirer.prompt(
            [
                {
                    name: "quest",
                    message: chalk.green(chalk.bold(Object.keys(questions)[questionsDone])),
                    type: "list",
                    choices: options
                }
            ]
        )
        if (game.quest == answerKey) {
            score += 10
            questionsDone += 1
            sepMess(`correct answer your score is ${score}`)
        } else {
            questionsDone += 1
            sepMess(`wrong answer your score is ${score}`)
        }
        if (questionsDone == questionsTotal) {
            sepMess(`your final score is ${score} out of ${questionsTotal * 10}`)
            sepMess(`you have guessed ${score / 10} out of ${questionsTotal} questions correctly`)
            sepMess(`your percentage is ${score / (questionsTotal * 10) * 100}%`)
            let endMess = await inquirer.prompt({
                name: 'action',
                message: 'would you like to play again',
                type: 'confirm'
            })
            if (endMess.action == true) {
                score = 0
                questionsDone = 0
                gameFunc()
            } else {
                sepMess(`thank you for playing`)
                break
            }
        }
    }
}

gameFunc()





