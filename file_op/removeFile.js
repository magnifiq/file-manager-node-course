import { promises as fs } from 'fs';
import path from 'path';

export const removeFile = async (filePath) => {
    if (filePath === undefined) {
        console.error('Invalid input');
        return;
    }
    try {
        await fs.rm(path.join(process.cwd(), filePath));
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}