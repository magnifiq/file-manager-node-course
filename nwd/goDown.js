import path from 'path';
import os from 'os';

export const goDown = (newPath) => {
    try {
        if (newPath.trim() === '..') {
            return;
        }
        process.chdir(path.resolve(process.cwd(), newPath));
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}