import { IPortfinderRepository } from "../../ts/interfaces";
import { IHandleError } from "../errors/HandleError";

export class PortfinderService implements IPortfinderRepository {
  private static readonly instance: PortfinderService;

  constructor(
    private readonly repository: IPortfinderRepository,
    private readonly error: IHandleError
  ) {}

  async resolvePort(): Promise<number> {
    try {
      return await this.repository.resolvePort();
    } catch (error) {
      throw this.error.show("resolve-port-operation-failed");
    }
  }

  static getInstance(repository: IPortfinderRepository, error: IHandleError) {
    if (!PortfinderService.instance)
      return new PortfinderService(repository, error);
    return this.instance;
  }
}
