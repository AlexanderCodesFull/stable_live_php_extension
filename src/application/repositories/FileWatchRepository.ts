import { Uri, workspace, FileSystemWatcher } from "vscode";
import { ISocketRepository, IFileWatchRepository } from "../../ts/interfaces";

export class FileWatchRepository implements IFileWatchRepository {
  private static readonly instance: FileWatchRepository;

  private fsw: FileSystemWatcher | null;
  private observeFiles: string[];

  constructor() {
    this.fsw = null;
    this.observeFiles = [".php", ".html", ".css", ".js", ".ts"];
  }

  startFileSystemWatch(socketService: ISocketRepository): void {
    this.fsw = workspace.createFileSystemWatcher("**/*.*", true, false, true);

    this.fsw?.onDidChange((uri: Uri) => {
      const _path = uri.path.toLowerCase();
      const file = _path.split(_path.includes("/") ? "/" : "\\").pop();
      const ext = file ? "." + file.split(".").pop() : "";

      if (!ext && !this.observeFiles.includes(ext)) return;
      if (_path.endsWith("router.php")) return;

      for (const key in this.observeFiles) {
        if (_path.endsWith(this.observeFiles[key])) {
          socketService.eventMessage("refresh");
          break;
        }
      }
    });
  }

  destroy() {
    this.fsw?.dispose();
    this.fsw = null;
  }

  static getInstance(): FileWatchRepository {
    if (!FileWatchRepository.instance) return new FileWatchRepository();
    return this.instance;
  }
}
