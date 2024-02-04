import fs from 'fs/promises';
import path from 'path';

export const renameFile = async (filePath, newName) => {
    try {
       
        const fileStatus = await fs.stat(filePath);
        fileStatus.isFile();

        const extFile = path.extname(filePath);

        await fs.rename(
            path.join(filePath),
            path.join(newName + extFile),
        );
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}