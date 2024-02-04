import { readdir } from 'node:fs/promises';
import { stat } from 'node:fs';

function doMagic(maxWord, word) {
    let leftPad = Math.floor(((maxWord + 2) - word.toString().length) / 2);
    let rightPad = Math.ceil(((maxWord + 2) - word.toString().length) / 2);

    if (leftPad <= 0) {
        leftPad = 0;
    }

    if (rightPad <= 0) {
        rightPad = 0;
    }

    return `${' '.repeat(leftPad)}${word}${' '.repeat(rightPad)}`;
}

export const listContent = async () => {
    const files = await readdir(process.cwd());
    const maxLength = files.reduce((acc, curr) => {
        if (acc < curr.length) {
            return curr.length;
        }
        return acc;
    }, 0);


    console.log(` ${'_'.repeat(maxLength + 21)}`);
    console.log(`|${`${doMagic(7, '(index)')}|${doMagic(maxLength, 'Name')}`}|${doMagic(6, 'Type')}|`);
    console.log(`|${'—'.repeat(maxLength + 21)}|`);

    const arrLists = [];
    files.forEach((file) => {
        const newPromise = new Promise((resolve) => {
            stat(file, (error, stats) => {
                if (error) {
                    console.log(error);
                    return;
                }
                let isDir=undefined;
                if (stats.isDirectory()) {
                    isDir = doMagic(6, 'Folder');
                } else {
                    isDir = doMagic(6, 'File');
                }
                resolve({ type: stats.isDirectory() ? 'Folder' : 'File', fileName: file, str: `|${doMagic(maxLength, file)}\x1b[0m|${isDir}\x1b[0m|` });
            });
        });
        arrLists.push(newPromise);
    });


    const result = await Promise.allSettled(arrLists).then((data) => data.sort((a, b) => {
        if (a.value.type !== b.value.type) {
            return a.value.type === 'Folder' ? -1 : 1;
        }
        return a.value.fileName.toLowerCase().localeCompare(b.value.fileName.toLowerCase());
    }));


    result.forEach((val, index) => {
        console.log(`|${doMagic(7, index + 1)}${val.value.str}`);
    });

    console.log(` ${'‾'.repeat(maxLength + 21)}`);
}