import { Uri, workspace } from "vscode";
import { IFileRepository } from "../../ts/interfaces";

export class FileRepository implements IFileRepository {
  private static instance: FileRepository;

  async createDirectory(dirUri: Uri): Promise<void> {
    await workspace.fs.createDirectory(dirUri);
  }

  async writeFile(fileUri: Uri, content: Uint8Array): Promise<void> {
    await workspace.fs.writeFile(fileUri, content);
  }

  async readFile(fileUri: Uri): Promise<Uint8Array> {
    return await workspace.fs.readFile(fileUri);
  }

  async removeFile(fileUri: Uri): Promise<void> {
    await workspace.fs.delete(fileUri, { recursive: true });
  }

  async find(fileUri: Uri): Promise<boolean> {
    try {
      await workspace.fs.stat(fileUri);
      return true;
    } catch (error) {
      return false;
    }
  }

  static getInstance(): FileRepository {
    if (!FileRepository.instance) return new FileRepository();
    return this.instance;
  }
}
