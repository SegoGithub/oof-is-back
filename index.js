import fs from 'fs';
import chalk from 'chalk'
import inquirer from 'inquirer'

console.log(chalk.bgWhite('Welcome to "Oof is back!"'))

fs.readdirSync(`${process.env.LOCALAPPDATA}\\Roblox\\Versions`).forEach(file => {
    let roblox = file.startsWith('version-9');
    if (roblox) {
        var sounds = `${process.env.LOCALAPPDATA}\\Roblox\\Versions\\${file}\\content\\sounds`
        console.log(`${chalk.bgBlueBright('info')} Roblox sounds folder was detected as ${sounds}`)
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
                    'Lego Yoda Death'
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
                            });
                        });
                    } else {
                        console.log(`${chalk.bgBlueBright('info')} Looks like oof sound is already deleted. Replacing with ${soundName} sound...`);
                        fs.copyFile(`sounds\\${sound}\\ouch.ogg`, `${sounds}\\ouch.ogg`, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log(`${chalk.bgGreenBright('success')} Enjoy your new oof sound!`);
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
            }

        }
        
        
        
        selectSound()
    }
  });

