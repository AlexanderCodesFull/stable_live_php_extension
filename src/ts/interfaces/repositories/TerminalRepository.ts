import { Uri } from "vscode";

export interface ITerminalRepository {
  create(serverPort: number, routeFilePath: Uri): void;
  terminalProcId(): Promise<number | undefined>;
  resolveOpenBrowser(port: number): void;
  destroy(): void;
}
