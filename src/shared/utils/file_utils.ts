import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';
import {tmpdir} from 'os';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const deleteFileAsync = promisify(fs.unlink);
const directoryExistsAsync = promisify(fs.exists);
const createDirectoryAsync = promisify(fs.mkdir);

export class FileUtils {
  static defaultDir: string | undefined;

  static async getImageFileFromUrl(imageUrl: string): Promise<Buffer | null> {
    try {
      // Implement your logic to fetch image file from URL here
      return null;
    } catch (_) {
      return null;
    }
  }

  static async readFile(filename: string, temporary: boolean = false): Promise<Buffer | null> {
    const filePath = await FileUtils.getFilePath(filename, temporary);
    if (filePath) {
      try {
        return await readFileAsync(filePath);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  static async writeFile(
    filename: string,
    buffer: Buffer,
    {temporary = false, override = false}: {temporary?: boolean; override?: boolean} = {},
  ): Promise<void> {
    const filePath = await FileUtils.getFilePath(filename, temporary);
    if (!filePath) return;

    try {
      if (override || !fs.existsSync(filePath)) {
        await writeFileAsync(filePath, buffer);
      } else {
        const parsedPath = path.parse(filePath);
        const newFileName = `${parsedPath.name}_${Date.now()}.${parsedPath.ext}`;
        await FileUtils.writeFile(newFileName, buffer, {temporary, override});
      }
    } catch (error) {
      throw new Error(`Error writing file ${filename}: ${error}`);
    }
  }

  static async isExist(filePath: string): Promise<boolean> {
    return await directoryExistsAsync(filePath);
  }

  static async isFolder(filePath: string): Promise<boolean> {
    const stats = await fs.promises.lstat(filePath);
    return stats.isDirectory();
  }

  static async removeFile(filePath: string): Promise<boolean> {
    try {
      await deleteFileAsync(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  private static async getTemporaryDir(): Promise<string | null> {
    try {
      const tempDirPath = path.join(tmpdir(), FileUtils.defaultDir || '');
      if (!(await directoryExistsAsync(tempDirPath))) {
        await createDirectoryAsync(tempDirPath, {recursive: true});
      }
      return tempDirPath;
    } catch (_) {
      return null;
    }
  }

  private static async getDocumentDir(): Promise<string | null> {
    try {
      const documentPath = path.join(process.cwd(), FileUtils.defaultDir || '');
      if (!(await directoryExistsAsync(documentPath))) {
        await createDirectoryAsync(documentPath, {recursive: true});
      }
      return documentPath;
    } catch (_) {
      return null;
    }
  }

  private static async getFilePath(filename: string, temporary: boolean): Promise<string | null> {
    const baseDir = temporary
      ? await FileUtils.getTemporaryDir()
      : await FileUtils.getDocumentDir();
    if (!baseDir) return null;
    return path.join(baseDir, filename);
  }
}
