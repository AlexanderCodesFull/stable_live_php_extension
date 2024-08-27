import { WorkspaceFolder } from "vscode";
import { IWorkspaceData, IWorkspaceRepository } from "../../ts/interfaces";
import { IHandleError } from "../errors/HandleError";

export class WorkspaceService implements IWorkspaceRepository {
  private static readonly instance: WorkspaceService;

  constructor(
    private readonly repository: IWorkspaceRepository,
    private readonly error: IHandleError
  ) {}

  getWorkspaceFolders(): readonly WorkspaceFolder[] | undefined {
    return this.repository.getWorkspaceFolders();
  }

  refreshUri(): void {
    this.repository.refreshUri();
  }

  getAllData(): IWorkspaceData {
    return this.repository.getAllData();
  }

  getUserConfig(property: string): string {
    if (!property) throw this.error.show("user-config-property-not-found");
    return this.repository.getUserConfig(property);
  }

  changeIsRunning(value: boolean): void {
    if (!value) throw this.error.show("is-running-value-not-found");
    this.repository.changeIsRunning(value);
  }

  changeFolderObserve(folderName: string): void {
    if (!folderName) throw this.error.show("folder-name-not-found");
    this.repository.changeFolderObserve(folderName);
  }

  wspaceOnDidDeleteFile(destroyFn: () => void): void {
    if (!destroyFn) throw this.error.show("destroy-app-fn-not-found");
    this.repository.wspaceOnDidDeleteFile(destroyFn);
  }

  destroy(): void {
    this.repository.destroy();
  }

  static getInstance(repository: IWorkspaceRepository, error: IHandleError) {
    if (!WorkspaceService.instance)
      return new WorkspaceService(repository, error);
    return this.instance;
  }
}
