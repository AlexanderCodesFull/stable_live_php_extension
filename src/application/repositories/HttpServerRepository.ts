import { createServer } from "http";
import { IHttpServerRepository, IServerPort } from "../../ts/interfaces";

export class HttpServerRepository implements IHttpServerRepository {
  private static readonly instance: HttpServerRepository;
  private httpServer: any = null;

  createServerHttp(ports: IServerPort): number {
    this.httpServer = createServer((_req, res) => {
      const headers = {
        "Access-Control-Allow-Origin": [`http://localhost:${ports.serverPort}`],
        "Access-Control-Max-Age": 2592000,
      };
      res.writeHead(200, headers);
      res.end();
    });

    this.httpServer.listen(ports.socketPort, () => {});
    this.httpServer.on("close", () => {});
    return this.httpServer;
  }

  destroy(): void {
    this.httpServer && this.httpServer.close();
    this.httpServer = null;
  }

  static getInstance(): HttpServerRepository {
    if (!HttpServerRepository.instance) return new HttpServerRepository();
    return this.instance;
  }
}
