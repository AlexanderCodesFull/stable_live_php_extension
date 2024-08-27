import { Uri } from "vscode";
import { IFileRepository } from "../../ts/interfaces";
import { IHandleError } from "../errors/HandleError";

export class FileService implements IFileRepository {
  private static readonly instance: FileService;

  constructor(
    private readonly respository: IFileRepository,
    private readonly error: IHandleError
  ) {}

  async createDirectory(dirUri: Uri): Promise<void> {
    try {
      await this.respository.createDirectory(dirUri);
    } catch (error) {
      throw this.error.show("create-direcory-not-execute");
    }
  }

  async writeFile(fileUri: Uri, content: Uint8Array): Promise<void> {
    try {
      await this.respository.writeFile(fileUri, content);
    } catch (error) {
      this.error.show("write-file-not-execute");
    }
  }

  async readFile(fileUri: Uri): Promise<Uint8Array> {
    try {
      return await this.respository.readFile(fileUri);
    } catch (error) {
      throw this.error.show("read-file-not-execute");
    }
  }

  async removeFile(fileUri: Uri): Promise<void> {
    try {
      await this.respository.removeFile(fileUri);
    } catch (error) {
      throw this.error.show("remove-file-not-execute");
    }
  }

  async find(fileUri: Uri): Promise<boolean> {
    return await this.respository.find(fileUri);
  }

  static getInstance(repository: IFileRepository, error: IHandleError) {
    if (!FileService.instance) return new FileService(repository, error);
    return this.instance;
  }
}
