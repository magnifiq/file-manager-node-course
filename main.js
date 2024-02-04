import readlinePromises from 'node:readline/promises';
import os from 'os';
import process from 'node:process';

//import all created functions
import { copyFile } from './file_op/copyFile.js';
import { createFile } from './file_op/createFile.js';

const readline = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let username = 'username';

const startCheck = () => {
    const argsInput = process.argv.slice(2);

    argsInput.forEach((arg) => {
        if (arg.startsWith('--username=')) {
            username = arg.replace('--username=', '');
            console.log(`Welcome to the File Manager, ${username}`);
            findCWD();
        }
    });
    if (username === 'username') {
        console.log('Invalid input');
    }
}

const checkArgs = (input, reqNum) => {
    if (input.trim().split(' ').length === reqNum + 1) {
        return true;
    }
    return false;
}
const endSession = () => {
    if (username === 'username') {
        username = 'ingognito';
    }
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit();
}

function findCWD() {
    console.log('You are currently in:', process.cwd());
}

async function switchCommands(inputData) {

    const [comUser, ...args] = inputData.trim().split(/\s+/);
    const firstArg = args[0];
    const secondArg = args[1];


    switch (comUser.trim()) {
        case 'up':
            if (!checkArgs(inputData, 0)) {
                console.log('Invalid input');
            }
            else {
                goUp();
            }
            break;
        case 'cd':
            if (!checkArgs(inputData, 1)) {
                console.log('Invalid input');
            }
            else {
                goDown(firstArg);
            }
            break;
        case 'ls':
            if (!checkArgs(inputData, 0)) {
                console.log('Invalid input');
                break;
            }
            else {
                await listContent();
            }
            break;
        case 'cat':
            if (!checkArgs(inputData, 1)) {
                console.log('Invalid input');
                break;
            }
            else {
                await readFile(firstArg);
            }
            break;
        case 'add':
            if (!checkArgs(inputData, 1)) {
                console.log('Invalid input');
                break;
            }
            else {
                await createFile(firstArg);
            }
            break;
        case 'rn':
            if (!checkArgs(inputData, 2)) {
                console.log('Invalid input');
                break;
            }
            else {
                await renameFile(firstArg, secondArg);
            }
            break;
        case 'cp':
            if (!checkArgs(inputData, 2)) {
                console.log('Invalid input');
                break;
            }
            else {
                await copyFile(firstArg, secondArg);
            }
            break;
        case 'mv':
            if (!checkArgs(inputData, 2)) {
                console.log('Invalid input');
                break;
            }
            else {
                await moveFile(firstArg, secondArg);
            }
            break;
        case 'rm':
            if (!checkArgs(inputData, 1)) {
                console.log('Invalid input');
                break;
            }
            else {
                await removeFile(firstArg);
            }
            break;
        case 'os':
            if (!checkArgs(inputData, 1)) {
                console.log('Invalid input');
                break;
            }
            else {
                await getOSInfo(firstArg);
            }
            break;
        case 'hash':
            if (!checkArgs(inputData, 1)) {
                console.log('Invalid input');
                break;
            }
            else {
                await hashContent(firstArg);
            }
            break;
        case 'compress':
            if (!checkArgs(inputData, 2)) {
                console.log('Invalid input');
                break;
            }
            else {
                await compressContent(firstArg, secondArg);
            }
            break;
        case 'decompress':
            if (!checkArgs(inputData, 2)) {
                console.log('Invalid input');
                break;
            }
            else {
                await decompressContent(firstArg, secondArg);
            }
            break;
        case '.exit':
            endSession();
            process.exit();
            break;
        case '':
            break;
        default:
            console.log('Invalid input');
            break;
    }

    findCWD();
}



const initApp = () => {
    try {
        process.chdir(os.homedir());
    }
    catch (err) {
        console.error('Operation failed', err);
    }
    readline.on('SIGINT', () => endSession());
    startCheck();
    readline.on('line', (comUser) => {
        switchCommands(comUser);
    });
};

try {
    initApp();
}
catch (error) {
    console.error('Operation failed', error);
}