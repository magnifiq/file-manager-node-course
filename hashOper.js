import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

export const hashOper = (pathToFile) => {
    try {
        const rs = createReadStream(pathToFile);
        rs.on('error', (error) => console.error('Operation failed', error));
        rs.pipe(createHash('sha256'))
            .setEncoding('hex')
            .pipe(process.stdout);
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}