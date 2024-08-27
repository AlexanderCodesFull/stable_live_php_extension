import { ExtensionContext as Context } from "vscode";
import { commandConfigKey } from "../commandConfig";
import { CommandRepository } from "../../repositories/CommandRepository";
import { CommandService } from "../../services/CommandService";
import { CommandUseCase } from "../../usecases/CommandUseCase";

export function commandUseCase(context: Context) {
  const repository = CommandRepository.getInstance(context);
  const service = CommandService.getInstance(repository);
  const usecase = CommandUseCase.getInstance(commandConfigKey, service);
  return usecase;
}
