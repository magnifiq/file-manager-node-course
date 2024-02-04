import path from 'path';
import fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const copyFile = async(currPath, newPath)=> {
    if (currPath === undefined || newPath === undefined) {
        console.log('Invalid input');
        return;
    }
    try {
        let copyPath = null;
        switch (process.platform) {
            case 'win32':
                copyPath = path.join(
                    newPath,
                    path.win32.basename(currPath),
                    path.extname(currPath),
                );
                break;
            case 'linux':
                copyPath = path.join(newPath, path.posix.basename(currPath));
                break;
            default:
                copyPath = path.join(newPath, path.basename(currPath));
                break;
        }

        const fileStatus = await fs.stat(currPath);
        fileStatus.isFile();
        await pipeline(
            createReadStream(currPath),
            createWriteStream(copyPath),
        );
    }
    catch (err) {
        console.error('Operation failed', err);
    }
}