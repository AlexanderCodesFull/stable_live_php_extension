import { Server } from "socket.io";
import { randomUUID } from "crypto";
import { ISocketRepository } from "../../ts/interfaces";

export class SocketRepository implements ISocketRepository {
  private static readonly instance: SocketRepository;

  private token: string;
  private io: any;
  private activeSockets: any;

  constructor() {
    this.token = "";
    this.io = null;
    this.activeSockets = {};
  }

  createSocket(httpServer: any, serverPort: number): string {
    this.io = new Server(httpServer, {
      cors: {
        origin: [`http://localhost:${serverPort}`],
        credentials: true,
      },
      connectTimeout: 5000,
    });

    this.io.on("connection", (socket: any) => {
      this.verifyTokenSocket(socket);
    });

    this.token = btoa(randomUUID() + Date.now().toString()) + "aMc";
    return this.token;
  }

  private verifyTokenSocket(socket: any): void {
    const hash: string = socket.handshake.auth.token;
    if (hash && hash === this.token) {
      this.activeSockets[socket.id] = socket;
      this.cleaningSocket(socket);
    } else {
      socket.disconnect(true);
    }
  }

  eventMessage(data: string) {
    this.io && this.io.emit("message", data.toLowerCase());
  }

  private cleaningSocket(socket: any): void {
    setTimeout(() => {
      for (const uid in this.activeSockets) {
        if (uid !== socket.id) {
          this.activeSockets[uid].disconnect(true);
          delete this.activeSockets[uid];
          break;
        }
      }
    }, 1500);
  }

  destroy(): void {
    for (const uid in this.activeSockets) {
      this.activeSockets[uid].disconnect(true);
      delete this.activeSockets[uid];
    }
    this.io && this.io.close((_err: any) => {});
    this.io = null;
    this.token = "";
    this.activeSockets = {};
  }

  static getInstance(): SocketRepository {
    if (!SocketRepository.instance) return new SocketRepository();
    return this.instance;
  }
}
