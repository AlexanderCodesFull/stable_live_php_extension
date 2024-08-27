import { Terminal, Uri, window } from "vscode";
import { normalize, resolve } from "path";
import { execSync } from "child_process";
import { ITerminalRepository } from "../../ts/interfaces";

export class TerminalRepository implements ITerminalRepository {
  private static readonly instance: TerminalRepository;

  private terminal: Terminal | undefined;
  private phpExe: string | null;

  public constructor() {
    this.terminal = undefined;
    this.phpExe = null;
  }

  create(serverPort: number, uri: Uri): void {
    const command = `${process.platform === "win32" ? "where" : "which"} php`;
    const _path = Uri.joinPath(uri, ".vscode/router.php").fsPath;

    this.phpExe = resolve(normalize(execSync(command).toString().trim()));
    const args = ["-H", "-S", `localhost:${serverPort}`, _path];

    this.terminal = window.createTerminal({
      name: `Live PHP [ : ${serverPort} ]`,
      isTransient: false,
      shellArgs: args,
      shellPath: this.phpExe,
    });

    this.terminal.hide();
  }

  resolveOpenBrowser(port: number) {
    const cmand = process.platform === "win32" ? "start" : "xdg-open";
    execSync(`${cmand} http://localhost:${port}`);
  }

  async terminalProcId(): Promise<number | undefined> {
    return await this.terminal!.processId;
  }

  public destroy(): void {
    this.terminal && this.terminal.dispose();
    this.terminal = undefined;
    this.phpExe = null;
  }

  static getInstance(): TerminalRepository {
    if (!TerminalRepository.instance) return new TerminalRepository();
    return this.instance;
  }
}
