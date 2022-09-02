const version = 'v1.2.3'
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
                    start();
                } else {
                    console.log(`${chalk.bgBlueBright('info')} Downloading sounds...`);
                    download(url, './', { extract: true })
                        .then(() => {
                            console.log(`${chalk.bgGreenBright('success')} Sounds downloaded!`);
                            start();
                        }).catch(err => {
                            console.log(`${chalk.bgRedBright('error')} ${err}`);
                        });
                }

                async function autostart() {
                    const answers = await inquirer.prompt({
                        name: 'autoReplace',
                        type: 'confirm',
                        message: 'Do you want to run an app on startup that prevents Roblox Updates from replacing your oof sound?',
                    });
                    if (answers.autoReplace) {
                        const beta = await inquirer.prompt({
                            name: 'betaReplace',
                            type: 'confirm',
                            message: 'Do you want to use a beta version of the autostart app? (Recommended for Windows 8 and up, faster than the normal version)',
                        });
                        var autostartUrl;
                        if (beta.betaReplace) {
                            autostartUrl = `https://github.com/SegoGithub/oof-is-back/releases/download/${version}/autostart-beta.exe`
                        } else {
                            autostartUrl = `https://github.com/SegoGithub/oof-is-back/releases/download/${version}/autostart.exe`
                        }
                            fs.writeFile(`${sounds}\\.ouch`, '', function (err, data) {
                                if (err) {
                                    return console.log(err);
                                }
                            });
                        if (!fs.existsSync(`${process.env.APPDATA}\\oof-is-back`)) {
                            fs.mkdirSync(`${process.env.APPDATA}\\oof-is-back`);
                        }
                        fs.copyFile(`sounds\\${sound}\\ouch.ogg`, `${process.env.APPDATA}\\oof-is-back\\ouch.ogg`, function (err, data) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                        console.log(`${chalk.bgBlueBright('info')} Downloading autostart.exe (this may take a long time)`)
                        // delete autostart.exe
                        if (fs.existsSync(`${process.env.APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\autostart.exe`)) {
                            fs.unlinkSync(`${process.env.APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\autostart.exe`);
                        }
                        if (fs.existsSync(`${process.env.APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\autostart-beta.exe`)) {
                            fs.unlinkSync(`${process.env.APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\autostart-beta.exe`);
                        }
                        download(autostartUrl, `${process.env.APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\Startup`)
                            .then(() => {
                                download(`https://raw.githubusercontent.com/SegoGithub/oof-is-back/main/icon.png`, `${process.env.APPDATA}\\oof-is-back`)
                                setTimeout(function () {
                                    process.exit(0)
                                }, 5000);
                            }).catch(err => {
                                console.log(`${chalk.bgRedBright('error')} ${err}`);
                            });

                        fs.writeFile(`${sounds}\\.ouch`, '', function (err, data) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    } else {
                        console.log(`${chalk.bgGreenBright('success')} Enjoy your new oof sound!\n${chalk.bgYellowBright('note')} If Roblox is already open, you will need to restart it for the new death sound to take effect\nExiting in 5 seconds`);
                        setTimeout(function () {
                            process.exit(0)
                        }, 5000);
                    }
                }
                function start() {
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
                                    autostart();
                                });
                            });
                        } else {
                            console.log(`${chalk.bgBlueBright('info')} Looks like oof sound is already deleted. Replacing with ${soundName} sound...`);
                            fs.copyFile(`sounds\\${sound}\\ouch.ogg`, `${sounds}\\ouch.ogg`, (err) => {
                                if (err) {
                                    throw err;
                                }
                                autostart();
                            });
                        }
                    } catch (err) {
                        console.error(err);
                    }
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
                    .get('https://api.github.com/repos/SegoGithub/oof-is-back/releases/latest')
                    .then(res => {
                        if (res.data.version !== version) {
                            console.log(chalk.yellowBright(`New version available! ${version} => ${res.data.tag_name}`));
                            console.log(chalk.yellowBright(`Download link: https://github.com/SegoGithub/oof-is-back/releases`));
                            setTimeout(function () {
                                selectSound();
                            }, 10000);
                        } else if (res.data.version === version) {
                            console.log(chalk.greenBright(`You are running the latest version!`));
                            setTimeout(function () {
                                selectSound();
                            }, 3000);
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