import { Uri } from "vscode";
import { ITerminalRepository } from "../../ts/interfaces";
import { IHandleError } from "../errors/HandleError";

export class TerminalService implements ITerminalRepository {
  private static readonly instance: TerminalService;

  constructor(
    private readonly repository: ITerminalRepository,
    private readonly error: IHandleError
  ) {}

  create(serverPort: number, routeFilePath: Uri): void {
    if (!serverPort || !routeFilePath)
      throw this.error.show("server-port-or-route-file-not-found");
    try {
      this.repository.create(serverPort, routeFilePath);
    } catch (error) {
      throw this.error.show("create-terminal-failed");
    }
  }

  terminalProcId(): Promise<number | undefined> {
    try {
      return this.repository.terminalProcId();
    } catch (error) {
      throw this.error.show("terminal-proccess-not-found");
    }
  }

  resolveOpenBrowser(port: number): void {
    try {
      this.repository.resolveOpenBrowser(port);
    } catch (error) {
      throw this.error.show("open-browser-failed");
    }
  }

  destroy(): void {
    this.repository.destroy();
  }

  static getInstance(repository: ITerminalRepository, error: IHandleError) {
    if (!TerminalService.instance)
      return new TerminalService(repository, error);
    return this.instance;
  }
}
