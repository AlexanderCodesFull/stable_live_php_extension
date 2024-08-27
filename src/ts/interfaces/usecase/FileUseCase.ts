import { Uri } from "vscode";
import { IRouterFileData } from "../repositories/FileRepository";

export interface IReg {
  [x: string]: string;
}

export interface IFileUseCase {
  createRouterPHPFile(routerFileData: IRouterFileData): Promise<void>;
  createRootPHPFile(uri: Uri, data: string): Promise<void>;
  createViewsRouteDirectory(uri: Uri, data: string): Promise<void>;
  findeFile(uri: Uri, name: string): Promise<boolean>;
  encodedUnit8Array(data: string): Uint8Array;
  decoded8Array(data: Uint8Array): string;
  removeFile(uri: Uri): Promise<void>;
}
