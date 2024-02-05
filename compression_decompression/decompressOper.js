import path from 'path';
import fs from 'node:fs/promises';
import zlib, { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const decompressOper = async (filePath, newPath) => {
    if (filePath === undefined || newPath === undefined) {
        console.error('Invalid input');
        return;
    }

    const brotliDecompress = async (input, output) => {
        const fileStatus = await fs.stat(input);
        fileStatus.isFile();
        const brotliDecomp = await createBrotliDecompress({
            chunkSize: 32 * 1024,
            params: {
                [zlib.constants.BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION]: true,
                [zlib.constants.BROTLI_DECODER_PARAM_LARGE_WINDOW]: true,
            },
        });

        const source = await createReadStream(input, { flags: 'r' });
        const destination = await createWriteStream(output, { flags: 'wx' });
        await pipeline(source, brotliDecomp, destination);
    }

    try {
        let fileName = path.basename(filePath);
        if (path.basename(filePath).split('.').length > 1) {
            fileName = path.basename(filePath).split('.').slice(0, -1).join('.');
        }
        await brotliDecompress(filePath, path.join(newPath, fileName));
    }
    catch (error) {
        console.error('Operation failed', error);
    }
}