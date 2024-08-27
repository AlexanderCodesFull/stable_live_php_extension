import { Uri } from "vscode";
import { IHandleError } from "../errors/HandleError";
import { IFileUseCase, IRouterFileData } from "../../ts/interfaces";

export class FileController implements IFileUseCase {
  private static instance: FileController;

  constructor(
    private readonly usecase: IFileUseCase,
    private readonly error: IHandleError
  ) {}

  async createRouterPHPFile(routerFileData: IRouterFileData): Promise<void> {
    if (!routerFileData)
      throw this.error.show("create-router-php-file-uri-or-rootpath-not-found");
    await this.usecase.createRouterPHPFile(routerFileData);
  }

  async createRootPHPFile(uri: Uri, data: string): Promise<void> {
    if (!uri || !data)
      throw this.error.show("create-root-php-file-uri-or-data-not-found");
    await this.usecase.createRootPHPFile(uri, data);
  }

  async createViewsRouteDirectory(uri: Uri, data: string): Promise<void> {
    if (!uri || !data)
      throw this.error.show("create-view-route-dir-uri-or-data-not-found");
    await this.usecase.createViewsRouteDirectory(uri, data);
  }

  async findeFile(uri: Uri, name: string): Promise<boolean> {
    if (!uri || !name) throw this.error.show("find-file-uri-or-name-not-found");
    return await this.usecase.findeFile(uri, name);
  }

  async removeFile(uri: Uri): Promise<void> {
    if (!uri) throw this.error.show("remove-file-uri-not-found");
    await this.usecase.removeFile(uri);
  }

  encodedUnit8Array(data: string): Uint8Array {
    if (!data) throw this.error.show("encoded-8-array-data-not-found");
    return this.usecase.encodedUnit8Array(data);
  }

  decoded8Array(data: Uint8Array): string {
    if (!data) throw this.error.show("decoded-8-array-data-not-found");
    return this.usecase.decoded8Array(data);
  }

  static getInstance(usecase: IFileUseCase, error: IHandleError) {
    if (!FileController.instance) return new FileController(usecase, error);
    return this.instance;
  }
}
