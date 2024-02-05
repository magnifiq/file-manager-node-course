import path from 'path';
import os from 'os';

export const goUp = () => {
    try {
        if (process.cwd() === os.homedir()) {
            return;
        }
        process.chdir(path.resolve(process.cwd(), '..'));
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}