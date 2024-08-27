import { ISocketRepository } from "./SocketRepository";
import { ITerminalRepository } from "./TerminalRepository";
import { IWorkspaceData, IWorkspaceRepository } from "./WorkspaceRepository";

export interface IWindowData extends IWorkspaceData {}

export interface IWindowRepository {
  isActiveWindowEditor(): boolean;
  windowOnDidChange(
    wspaceService: IWorkspaceRepository,
    socketService: ISocketRepository
  ): void;
  windowOnDidCloseTerminal(termId: number, fn: () => void): boolean;
}
