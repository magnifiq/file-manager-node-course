import { readFile } from 'node:fs/promises';

export const readFileOper = async (filePath) => {
    try {
        const info = await readFile(filePath, { encoding: 'utf8' });
        console.log(info);
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}