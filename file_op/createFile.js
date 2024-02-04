import path from 'path';
import { writeFile } from 'node:fs';

export const createFile = async (fileName) => {
    try {
        await writeFile(path.join(process.cwd(), fileName), '', { flag: 'ax' });
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}