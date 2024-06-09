import { existsSync, promises as fs, mkdirSync, PathLike } from 'fs';
import path from 'path';
import { tmpdir } from 'os';

export async function createAndWriteToLog(fileName: string, message: string, prefix?: string) {
    try {
        const filePath: PathLike = path.join(tmpdir(), 'sessionLogs', fileName);

        console.log('logging to tmp directory', filePath)
        // Create the directory structure if it doesn't exist
        const directoryPath = path.dirname(filePath);
        if (!existsSync(directoryPath)) {
            mkdirSync(directoryPath, { recursive: true });
        }

        const fileExists = await fs.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false);

        const fileHandle = await fs.open(filePath, 'a+');

        await fs.writeFile(fileHandle, prefix + message + '\r\n', 'utf8');

    } catch (error) {
        console.error('Error writing to file:', error);
    }
}