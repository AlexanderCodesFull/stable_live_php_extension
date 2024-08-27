import { IHttpServerRepository, IServerPort } from "../../ts/interfaces";
import { IHandleError } from "../errors/HandleError";

export class HttpServerService implements IHttpServerRepository {
  private static readonly instance: HttpServerService;

  constructor(
    private readonly repository: IHttpServerRepository,
    private readonly error: IHandleError
  ) {}

  createServerHttp(ports: IServerPort): number {
    if (!ports) throw this.error.show("create-server-ports-not-found");
    try {
      return this.repository.createServerHttp(ports);
    } catch (error) {
      throw this.error.show("create-http-server-failed");
    }
  }

  destroy(): void {
    this.repository.destroy();
  }

  static getInstance(repository: IHttpServerRepository, error: IHandleError) {
    if (!HttpServerService.instance)
      return new HttpServerService(repository, error);
    return this.instance;
  }
}
