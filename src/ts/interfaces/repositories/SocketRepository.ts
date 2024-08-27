export interface ISocketRepository {
  createSocket(httpServer: any, port: number): string;
  eventMessage(data: string): void;
  destroy(): void;
}
