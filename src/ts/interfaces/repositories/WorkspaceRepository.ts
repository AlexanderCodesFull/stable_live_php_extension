import { Uri, WorkspaceFolder } from "vscode";

export interface IWorkspaceData {
  isRunning: boolean;
  rootUri: Uri | null;
  folderObserve: string;
}

export interface IWorkspaceRepository {
  refreshUri(): void;
  getWorkspaceFolders(): readonly WorkspaceFolder[] | undefined;
  getAllData(): IWorkspaceData;
  getUserConfig(property: string): string;
  changeIsRunning(value: boolean): void;
  changeFolderObserve(folderName: string): void;
  wspaceOnDidDeleteFile(destroyFn: () => void): void;
  destroy(): void;
}
