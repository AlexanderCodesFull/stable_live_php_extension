import { ISocketRepository } from "../../ts/interfaces";
import { IHandleError } from "../errors/HandleError";

export class SocketService implements ISocketRepository {
  private static readonly instance: SocketService;

  constructor(
    private readonly repository: ISocketRepository,
    private readonly error: IHandleError
  ) {}

  createSocket(httpServer: any, port: number): string {
    if (!httpServer || !port)
      throw this.error.show("http-server-or-port-in-socket-not-found");
    try {
      return this.repository.createSocket(httpServer, port);
    } catch (error) {
      throw this.error.show("create-socket-server-failed");
    }
  }

  eventMessage(data: string): void {
    if (!data) throw this.error.show("socket-message-data-not-found");
    this.repository.eventMessage(data);
  }

  destroy(): void {
    this.repository.destroy();
  }

  static getInstance(repository: ISocketRepository, error: IHandleError) {
    if (!SocketService.instance) return new SocketService(repository, error);
    return this.instance;
  }
}
