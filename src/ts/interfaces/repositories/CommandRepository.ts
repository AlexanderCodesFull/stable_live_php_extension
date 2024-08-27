export type CmmdCb = (...args: any[]) => Promise<any>;

export interface IRegisterCommand {
  registerCommand(key: string, cb: CmmdCb): void;
}

export interface ICommandSubscription {
  contextSubscription(dispose: { dispose(): any }): void;
}

export interface ICommandRepository
  extends IRegisterCommand,
    ICommandSubscription {}
