import path from 'path';
import fs from 'node:fs/promises';
import zlib, { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';


export const compressOper = async (filePath, newPath) => {
    if (filePath === undefined || newPath === undefined) {
        console.error('Invalid input');
        return;
    }

    const brotliCompress = async (input, output) => {
        let inputSize = 0;
        const stats = await fs.stat(filePath);
        inputSize = stats.size;


        const brotliStream = await createBrotliCompress({
            chunkSize: 32 * 1024,
            params: {
                [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
                [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
                [zlib.constants.BROTLI_PARAM_SIZE_HINT]: inputSize,
            },
        });

        const source = await createReadStream(input);
        const destination = await createWriteStream(output, { flags: 'wx' });
        await pipeline(source, brotliStream, destination);
    }

    try {
        const fileName = path.basename(filePath);
        await brotliCompress(filePath, path.join(newPath, `${fileName}.br`));
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}