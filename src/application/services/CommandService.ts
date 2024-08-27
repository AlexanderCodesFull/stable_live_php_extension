import {
  CmmdCb,
  ICommandRepository,
  IRegisterCommand,
} from "../../ts/interfaces";

export class CommandService implements IRegisterCommand {
  private static readonly instance: CommandService;

  constructor(private readonly repository: ICommandRepository) {}

  registerCommand(key: string, cb: CmmdCb): void {
    this.repository.registerCommand(key, cb);
  }

  static getInstance(repository: ICommandRepository): CommandService {
    if (!CommandService.instance) return new CommandService(repository);
    return this.instance;
  }
}
