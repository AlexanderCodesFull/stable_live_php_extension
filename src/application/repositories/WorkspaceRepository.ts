import { Uri, workspace } from "vscode";
import { IWorkspaceData, IWorkspaceRepository } from "../../ts/interfaces";

export class WorkspaceRepository implements IWorkspaceRepository {
  private static readonly instance: WorkspaceRepository;

  private isRunning: boolean;
  private rootUri: Uri | null;
  private folderObserve: string;

  constructor() {
    this.isRunning = false;
    this.rootUri = workspace.workspaceFolders
      ? workspace.workspaceFolders[0].uri
      : null;
    this.folderObserve = "views";
  }

  refreshUri(): void {
    this.rootUri = workspace.workspaceFolders
      ? workspace.workspaceFolders[0].uri
      : null;
  }

  getWorkspaceFolders() {
    return workspace.workspaceFolders;
  }

  getAllData(): IWorkspaceData {
    return {
      isRunning: this.isRunning,
      rootUri: this.rootUri,
      folderObserve: this.folderObserve,
    };
  }

  getUserConfig(property: string): string {
    const prop = workspace.getConfiguration().get(property) as string;
    this.folderObserve = prop ? prop : "views";
    return this.folderObserve;
  }

  changeIsRunning(value: boolean): void {
    this.isRunning = value;
  }

  changeFolderObserve(folderName: string): void {
    this.folderObserve = folderName;
  }

  wspaceOnDidDeleteFile(destroyFn: () => void) {
    workspace.onDidDeleteFiles((e) => {
      const rootFile = e.files.toString().endsWith("index.php");
      const routerFile = e.files.toString().endsWith("router.php");
      if (rootFile || routerFile) destroyFn();
    });
  }

  destroy() {
    this.isRunning = false;
    this.rootUri = null;
    this.folderObserve = "";
  }

  static getInstance() {
    if (!WorkspaceRepository.instance) return new WorkspaceRepository();
    return this.instance;
  }
}
