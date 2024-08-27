import { IFileWatchRepository, ISocketRepository } from "../../ts/interfaces";
import { IHandleError } from "../errors/HandleError";

export class FileWatchService implements IFileWatchRepository {
  private static readonly instance: FileWatchService;

  constructor(
    private readonly repository: IFileWatchRepository,
    private readonly error: IHandleError
  ) {}

  startFileSystemWatch(socketService: ISocketRepository): void {
    if (!socketService)
      throw this.error.show("socket-service-not-found-in-watch-file");
    this.repository.startFileSystemWatch(socketService);
  }

  destroy(): void {
    this.repository.destroy();
  }

  static getInstance(repository: IFileWatchRepository, error: IHandleError) {
    if (!FileWatchService.instance)
      return new FileWatchService(repository, error);
    return this.instance;
  }
}
