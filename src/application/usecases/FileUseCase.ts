import { Uri } from "vscode";
import { TextEncoder, TextDecoder } from "util";
import { IHandleError } from "../errors/HandleError";
import {
  IFileRepository,
  IRouterFileData,
  IFileUseCase,
  IReg,
} from "../../ts/interfaces";

export class FileUseCase implements IFileUseCase {
  private static readonly instance: FileUseCase;

  constructor(
    private readonly service: IFileRepository,
    private readonly error: IHandleError
  ) {}

  async createRouterPHPFile(routerFileData: IRouterFileData): Promise<void> {
    try {
      const { uri, rootPath, token, port } = routerFileData;
      await this.service.createDirectory(Uri.joinPath(uri, ".vscode"));
      const data = await this.service.readFile(Uri.file(rootPath));

      let temp = this.decoded8Array(data);
      const regexData: IReg = { "{{ port }}": `${port}`, "{{ token }}": token };

      for (const key in regexData) {
        temp = temp.replace(new RegExp(key, "g"), regexData[key]);
      }

      await this.service.writeFile(
        Uri.joinPath(uri, ".vscode/router.php"),
        this.encodedUnit8Array(temp)
      );
    } catch (error) {
      throw this.error.show("create-router-php-file-handler-failed");
    }
  }

  async createRootPHPFile(uri: Uri, data: string): Promise<void> {
    try {
      const rootfile = await this.findeFile(uri, "index.php");
      if (!rootfile) {
        await this.service.writeFile(
          Uri.joinPath(uri, "index.php"),
          this.encodedUnit8Array(data)
        );
      }
    } catch (error) {
      throw this.error.show("root-file-create-failed");
    }
  }

  async createViewsRouteDirectory(uri: Uri, data: string): Promise<void> {
    try {
      if (!(await this.findeFile(uri, "views"))) {
        await this.service.createDirectory(Uri.joinPath(uri, "views"));
        const homePage = Uri.joinPath(uri, "views/home.php");
        await this.service.writeFile(homePage, this.encodedUnit8Array(data));
      }
    } catch (error) {
      throw this.error.show("create-route-directory-failed");
    }
  }

  async findeFile(uri: Uri, name: string): Promise<boolean> {
    return await this.service.find(Uri.joinPath(uri, name));
  }

  async removeFile(uri: Uri): Promise<void> {
    await this.service.removeFile(Uri.joinPath(uri, ".vscode"));
  }

  encodedUnit8Array(data: string): Uint8Array {
    return new TextEncoder().encode(data);
  }

  decoded8Array(data: Uint8Array): string {
    return new TextDecoder("utf-8").decode(data);
  }

  static getInstance(service: IFileRepository, error: IHandleError) {
    if (!FileUseCase.instance) return new FileUseCase(service, error);
    return this.instance;
  }
}
