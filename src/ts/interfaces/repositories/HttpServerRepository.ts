export interface IServerPort {
  serverPort: number;
  socketPort: number;
}

export interface IHttpServerRepository {
  createServerHttp({ serverPort, socketPort }: IServerPort): number;
  destroy(): void;
}
