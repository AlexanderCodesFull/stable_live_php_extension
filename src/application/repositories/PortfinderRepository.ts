import * as portfinder from "portfinder";
import { IPortfinderRepository } from "../../ts/interfaces";

export class PortfinderRepository implements IPortfinderRepository {
  private static readonly instance: PortfinderRepository;

  async resolvePort(): Promise<number> {
    portfinder.setBasePort(5002);
    portfinder.setHighestPort(5999);
    return await portfinder.getPortPromise();
  }

  static getInstance(): PortfinderRepository {
    if (!PortfinderRepository.instance) return new PortfinderRepository();
    return this.instance;
  }
}
