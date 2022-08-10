const fs = require('fs')
const chalk = require('chalk');
const inquirer = require('inquirer')

console.log(chalk.bgCyan('Welcome to "Oof is back!"'))

fs.readdirSync(`${process.env.LOCALAPPDATA}\\Roblox\\Versions`).forEach(file => {
    let roblox = fs.existsSync(`${process.env.LOCALAPPDATA}\\Roblox\\Versions\\${file}\\content\\sounds`)
    if (roblox) {
        var sounds = `${process.env.LOCALAPPDATA}\\Roblox\\Versions\\${file}\\content\\sounds`
        console.log(`${chalk.bgBlueBright('info')} Roblox sounds folder was detected as ${sounds}\n`)
        async function selectSound() {
            const answers = await inquirer.prompt({
                name: 'playSelect',
                type: 'list',
                message: 'Choose an Oof sound',
                choices: [
                    'Oof',
                    'Vine Boom Sound Effect (Bass Boosted)',
                    'GAH DAM',
                    'Half life',
                    'Old Minecraft Death Sound',
                    'Lego Yoda Death',
                    'AUUUUUUGHHH'
                ],
            });

            function replaceSound(sound, soundName) {
                console.log(`${chalk.bgBlueBright('info')} You selected ${soundName}`)
                try {
                    if(fs.existsSync(`${sounds}\\ouch.ogg`)) {
                        console.log(`${chalk.bgBlueBright('info')} Found oof sound`);
                        fs.unlink(`${sounds}\\ouch.ogg`, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log(`${chalk.bgBlueBright('info')} Old oof sound is deleted. Replacing with ${soundName} sound...`);
                            fs.copyFile(`sounds\\${sound}\\ouch.ogg`, `${sounds}\\ouch.ogg`, (err) => {
                                if (err) {
                                    throw err;
                                }
                                console.log(`${chalk.bgGreenBright('success')} Enjoy your new oof sound!`);
                                console.log('Exiting in 5 seconds')
                            setTimeout(function(){
                                console.log("Goodbye");
                            }, 5000);
                            });
                        });
                    } else {
                        console.log(`${chalk.bgBlueBright('info')} Looks like oof sound is already deleted. Replacing with ${soundName} sound...`);
                        fs.copyFile(`sounds\\${sound}\\ouch.ogg`, `${sounds}\\ouch.ogg`, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log(`${chalk.bgGreenBright('success')} Enjoy your new oof sound!`);
                            console.log('Exiting in 5 seconds')
                            setTimeout(function(){
                                console.log("Goodbye");
                            }, 5000);
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
                
            }

            if (answers.playSelect === 'Oof') {
                replaceSound('oof', 'Oof')
            } else if (answers.playSelect === 'Vine Boom Sound Effect (Bass Boosted)') {
                replaceSound('vineboom', 'Vine Boom Sound Effect (Bass Boosted)')
            } else if (answers.playSelect === 'GAH DAM') {
                replaceSound('gahdam', 'GAH DAM')
            } else if (answers.playSelect === 'Half life') {
                replaceSound('hl', 'Half life')
            } else if (answers.playSelect === 'Old Minecraft Death Sound') {
                replaceSound('mc', 'Old Minecraft Death Sound')
            } else if (answers.playSelect === 'Lego Yoda Death') {
                replaceSound('yoda', 'Lego Yoda Death')
            } else if (answers.playSelect === 'AUUUUUUGHHH') {
                replaceSound('augh', 'AUUUUUUGHHH')
            }

        }
        
        
        
        selectSound()
    }
  });

