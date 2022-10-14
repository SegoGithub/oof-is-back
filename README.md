## [PLEASE USE THIS INSTEAD](https://github.com/SegoGithub/oof-is-back-rust)

<p align="center"><img src="https://user-images.githubusercontent.com/71465609/195943484-d56ab5a9-ac8f-4677-9801-10c88cac7224.png" /></p>
<p align="center">Change your Roblox death sound to a different sound included in the app or the original oof sound.</p>
<p align="center"><img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" />
                  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
                  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
                  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" /></p>
<p align="center"><img src="http://ForTheBadge.com/images/badges/built-with-love.svg" /></>

## <p align="center">[Download Link (All Windows Version)](https://github.com/SegoGithub/oof-is-back/releases/download/v1.2.3/oof-is-back.exe)</p>

## NOTE:
Currently considering rewriting the program in another programming language because node.js is slow and produces large exes, so development may be stopped for a while.

## How to use
* Simply download the exe file from the download link above and run it.
* Use the up and down arrow keys to choose and Enter to confirm your choise.
* Done!

## Sounds Included
* Oof
* Vine Boom Sound Effect (Bass Boosted)
* GAH DAM
* Half life
* Old Minecraft Death Sound
* Lego Yoda Death
* AUUUUUUGHHH

![cli](https://user-images.githubusercontent.com/71465609/184873758-861d8aff-d7ab-463e-916a-cb70efc31c67.gif)

## Why I made this?
After Roblox changed the oof sound I started to replace it with custom sounds, I wanted an easier way to change the death sound. So I made this app. Also to help other people easily change their oof sound.

## How does it work?
The custom death sounds are stored in the "sounds" folder (downloaded as a zip file then extracted automatically by the program) in an OGG file format and are copied into the Roblox Game files to replace the oof sound.

## Technologies used
* Node.js
* [Chalk](https://www.npmjs.com/package/chalk) (for coloured text)
* [Inquirer](https://www.npmjs.com/package/inquirer) (for the selection of sound effects)
* [Axios](https://www.npmjs.com/package/axios) (for checking for updates)
* [Download](https://www.npmjs.com/package/download) (for downloading the sounds.zip file)
* [Decompress](https://www.npmjs.com/package/decompress) (for decompressing the sounds.zip file)
* [find-process](https://github.com/yibn2008/find-process) (for detecting if Roblox is running)
* [node-notifier](https://github.com/mikaelbr/node-notifier) (for notifications in autostart.exe)

## How to compile

[Prerequisites](https://github.com/nodejs/node/blob/HEAD/BUILDING.md#prerequisites)

```bash
npm i
npm i -g nexe
nexe -t windows-x86-12.18.2 index.js (for all windows version)
nexe -t windows-x86-12.18.2 autostart.js (for all windows version)
```

## Other apps I recommend and use
* [Roblox FPS Unlocker](https://github.com/axstin/rbxfpsunlocker)
