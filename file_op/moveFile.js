import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';
import { promises as fs } from 'fs';


export const moveFile = async (filePath, newPath) => {
    if (filePath === undefined || newPath === undefined) {
        console.error('Invalid input');
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

        //only this part differs from copy file
        await pipeline(
            createReadStream(filePath, { flags: 'r' }),
            createWriteStream(copyPath, { flags: 'wx' }),
        );
        await fs.rm(filePath);
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}