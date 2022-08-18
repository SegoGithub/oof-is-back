const fs = require('fs');
const find = require('find-process');
const notifier = require('node-notifier')

console.log("Welcome to Oof is back! (autostart)");
console.log("This app replaces the oof sound with the one you chose when Roblox updates.");
console.log("You can minimize this window, but don't close it.");

setInterval(robloxRunning, 30000);
function robloxRunning() {
    find('name', 'RobloxPlayerBeta.exe').then(result => {
        if (result.length > 0) {
            console.log("Roblox is running")
            checkVer();
        } else {
            console.log("Roblox is not running")
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
                if (fs.existsSync(`${sounds}\\.ouch`)) {
                    console.log(`Oof sound has not been replaced by Roblox`);
                } else {
                    console.log(`Oof sound was replaced by Roblox Updates`);
                    fs.unlink(`${sounds}\\ouch.ogg`, (err) => {
                        if (err) {
                            throw err;
                        }
                        fs.copyFile(`ouch.ogg`, `${sounds}\\ouch.ogg`, (err) => {
                            if (err) {
                                throw err;
                            }
                            fs.writeFile(`${sounds}\\.ouch`, '', function (err,data) {
                                if (err) {
                                  return console.log(err);
                                }
                                notifier.notify({
                                    title: 'Oof is back!',
                                    message: 'Your oof sound was replaced by Roblox Updates. Please restart Roblox for the old oof sound to take effect.',
                                    // icon: `${process.env.APPDATA}\\oof-is-back\\icon.png`,
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