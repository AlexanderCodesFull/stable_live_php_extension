import { commands, ExtensionContext } from "vscode";
import { CmmdCb, ICommandRepository } from "../../ts/interfaces";

export class CommandRepository implements ICommandRepository {
  private static instance: CommandRepository;
  private disposes: Array<{ dispose(): any }>;

  constructor(private readonly context: ExtensionContext) {
    this.disposes = [];
  }

  registerCommand(key: string, cb: CmmdCb): void {
    this.disposes.push(commands.registerCommand(key, cb));
  }

  contextSubscription() {
    this.context.subscriptions.push(...this.disposes);
  }

  static getInstance(context: ExtensionContext): CommandRepository {
    if (!CommandRepository.instance) return new CommandRepository(context);
    return this.instance;
  }
}
