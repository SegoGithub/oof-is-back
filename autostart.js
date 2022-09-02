const fs = require('fs');
const find = require('find-process');
const notifier = require('node-notifier')

console.log("Welcome to Oof is back! (autostart)\nThis app prevents Roblox Updates from changing your oof sound\nYou can minimize this windows, but dont close it.");

setInterval(robloxRunning, 30000);
function robloxRunning() {
    find('name', 'RobloxPlayerBeta.exe').then(result => {
        if (result.length > 0) {
            checkVer();
        }
    }).catch(err => {
        console.log(`${err}`);
    });
};
robloxRunning()

function checkVer() {
    fs.readdirSync(`${process.env.LOCALAPPDATA}\\Roblox\\Versions`).forEach(file => {
        if (fs.existsSync(`${process.env.LOCALAPPDATA}\\Roblox\\Versions\\${file}\\content\\sounds`)) {
            let sounds = `${process.env.LOCALAPPDATA}\\Roblox\\Versions\\${file}\\content\\sounds`;
            try {
                if (!fs.existsSync(`${sounds}\\.ouch`)) {
                    console.log(`Oof sound was replaced by Roblox Updates`);
                    fs.unlink(`${sounds}\\ouch.ogg`, (err) => {
                        if (err) {
                            throw err;
                        }
                        fs.copyFile(`${process.env.APPDATA}\\oof-is-back\\ouch.ogg`, `${sounds}\\ouch.ogg`, (err) => {
                            if (err) {
                                throw err;
                            }
                            fs.writeFile(`${sounds}\\.ouch`, '', function (err, data) {
                                if (err) {
                                    return console.log(err);
                                }
                                console.log('Oof sound replaced with old one, game restart required')
                                notifier.notify({
                                    title: 'Oof is back!',
                                    message: 'Your oof sound was replaced by Roblox Updates. Please restart Roblox for the old oof sound to take effect.',
                                    icon: `${process.env.APPDATA}\\oof-is-back\\icon.png`,
                                    wait: true,
                                    timeout: 15000,
                                });
                            });
                        });
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
    });
}