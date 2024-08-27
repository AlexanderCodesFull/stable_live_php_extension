import { IHandleError } from "../errors/HandleError";
import {
  ISocketRepository,
  IWindowRepository,
  IWorkspaceRepository,
} from "../../ts/interfaces";

export class WindowService implements IWindowRepository {
  private static readonly insance: WindowService;

  constructor(
    private readonly repository: IWindowRepository,
    private readonly error: IHandleError
  ) {}

  isActiveWindowEditor(): boolean {
    return this.repository.isActiveWindowEditor();
  }

  windowOnDidChange(
    wspaceService: IWorkspaceRepository,
    socketService: ISocketRepository
  ): void {
    // if (!wspaceService || fileObserve)
    //   throw this.error.show("wspace-data-not-found");
    return this.repository.windowOnDidChange(wspaceService, socketService);
  }

  windowOnDidCloseTerminal(termId: number, fn: () => void): boolean {
    if (!termId) throw this.error.show("proc-id-service-not-found");
    return this.repository.windowOnDidCloseTerminal(termId, fn);
  }

  static getInstance(repository: IWindowRepository, error: IHandleError) {
    if (!WindowService.insance) return new WindowService(repository, error);
    return this.insance;
  }
}
