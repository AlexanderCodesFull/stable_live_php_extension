import { window } from "vscode";
import {
  IWindowRepository,
  IWorkspaceRepository,
  ISocketRepository,
} from "../../ts/interfaces";

export class WindowRepository implements IWindowRepository {
  private static readonly instance: WindowRepository;

  isActiveWindowEditor(): boolean {
    return window.activeTextEditor
      ? !!window.activeTextEditor
      : !window.activeTextEditor;
  }

  windowOnDidChange(
    wspaceService: IWorkspaceRepository,
    socketService: ISocketRepository
  ) {
    window.onDidChangeActiveTextEditor((e) => {
      try {
        if (!e?.document.uri.fsPath) return;
        const data = wspaceService.getAllData();
        const rootUri = data.rootUri?.fsPath;
        const _path = e.document.uri.fsPath;

        const route = _path.split(rootUri!).pop()?.replace(/\\/g, "/");
        if (!route || route.includes("router.php")) return;

        if (route.includes("index.php")) {
          socketService.eventMessage(route!);
          return;
        }
        const watch = wspaceService.getUserConfig("live-php.folderRouteWatch");
        if (route?.includes(watch)) socketService.eventMessage(route);
      } catch (error) {
        window.showErrorMessage("Failed watch PHP routes!.");
      }
    });
  }

  windowOnDidCloseTerminal(termId: number, fn: () => void): boolean {
    let compare: boolean = false;

    window.onDidCloseTerminal(async (t) => {
      const id = await t.processId;
      compare = id === termId;
      fn();
    });
    return compare;
  }

  static getInstance(): WindowRepository {
    if (!WindowRepository.instance) return new WindowRepository();
    return this.instance;
  }
}
