import { ISocketRepository } from "./SocketRepository";

export interface IFileWatchRepository {
  startFileSystemWatch(socketService: ISocketRepository): void;
  destroy(): void;
}
