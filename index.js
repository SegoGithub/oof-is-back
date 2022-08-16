const version = '1.1.0'
const fs = require('fs')
const download = require('download')
const chalk = require('chalk');
const inquirer = require('inquirer')
const decompress = require('decompress');
const axios = require('axios');
const url = `https://github.com/SegoGithub/oof-is-back/releases/download/v1.1.0/sounds.zip`
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
                    'AUUUUUUGHHH',
                    'Custom Sound',
                    'Check for updates'
                ],
            });

            function replaceSound(sound, soundName) {
                console.log(`${chalk.bgBlueBright('info')} You selected ${soundName}`)
                if (fs.existsSync(`sounds`)) {
                    console.log(`${chalk.bgBlueBright('info')} Sounds folder already downloaded`);
                } else {
                    console.log(`${chalk.bgBlueBright('info')} Downloading sounds...`);
                    download(url, './', { extract: true })
                        .then(() => {
                            console.log(`${chalk.bgGreenBright('success')} Sounds downloaded!`);
                        }).catch(err => {
                            console.log(`${chalk.bgRedBright('error')} ${err}`);
                        });
                }
                try {
                    if (fs.existsSync(`${sounds}\\ouch.ogg`)) {
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
                                console.log(`${chalk.bgYellowBright('note')} If Roblox is already open, you will need to restart it for the new death sound to take effect`);
                                console.log('Exiting in 5 seconds')
                                setTimeout(function () {
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
                            console.log(`${chalk.bgYellowBright('note')} If Roblox is already open, you will need to restart it for the new death sound to take effect`);
                            console.log('Exiting in 5 seconds')
                            setTimeout(function () {
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
            } else if (answers.playSelect === 'Custom Sound') {
                console.log(`${chalk.bgBlueBright('info')} You selected Custom Sound`)
                console.log(`${chalk.bgYellowBright('info')} Place your OGG sound file in the "sounds\\custom" folder and rename the OGG file to ouch.ogg`)
                const answers = await inquirer.prompt({
                    name: 'confirmCustom',
                    type: 'confirm',
                    message: 'Say "yes" once you have placed the OGG file in the "sounds\\custom" folder',
                    default: true,
                });
                replaceSound('custom', 'Custom Sound')
            } else if (answers.playSelect === 'Check for updates') {
                axios
                    .get('https://raw.githubusercontent.com/SegoGithub/oof-is-back/main/package.json')
                    .then(res => {
                        if (res.data.version !== version) {
                            console.log(chalk.yellowBright(`New version available! ${version} => ${res.data.version}`));
                            console.log(chalk.yellowBright(`Download link: https://github.com/SegoGithub/oof-is-back/releases`));
                            setTimeout(function () {
                                selectSound();
                            }, 10000);
                        } else if (res.data.version === version) {
                            console.log(chalk.greenBright(`You are running the latest version!`));
                            setTimeout(function () {
                                selectSound();
                            }, 10000);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }

        }
        selectSound()
    }
});

