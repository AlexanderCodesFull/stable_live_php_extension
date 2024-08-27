import { CmmdCb, IRegisterCommand, ICommandConfig } from "../../ts/interfaces";

export class CommandUseCase {
  private static readonly instance: CommandUseCase;

  constructor(
    private readonly keyCommand: ICommandConfig,
    private readonly service: IRegisterCommand
  ) {}

  newCommandRegister(key: string, cb: (...args: any[]) => any) {
    this.service.registerCommand(key, cb);
  }

  startAppCommand(cb: CmmdCb): void {
    this.service.registerCommand(this.keyCommand.START_APP, cb);
  }

  stopAppCommand(cb: (...args: any[]) => any) {
    this.service.registerCommand(this.keyCommand.STOP_APP, cb);
  }

  static getInstance(keyCommand: ICommandConfig, service: IRegisterCommand) {
    if (!CommandUseCase.instance)
      return new CommandUseCase(keyCommand, service);
    return this.instance;
  }
}
