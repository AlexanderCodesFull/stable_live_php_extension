import { Uri } from "vscode";

export interface IRouterFileData {
  uri: Uri;
  rootPath: string;
  token: string;
  port: number;
}

export interface IFileRepository {
  createDirectory(dirUri: Uri): Promise<void>;
  writeFile(fileUri: Uri, content: Uint8Array): Promise<void>;
  readFile(fileUri: Uri): Promise<Uint8Array>;
  removeFile(fileUri: Uri): Promise<void>;
  find(fileUri: Uri): Promise<boolean>;
}
