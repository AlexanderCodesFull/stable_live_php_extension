import { ExtensionContext as IContext } from "vscode";
import { mainStartApp, mainStopApp } from "./application/app";
import { commandUseCase } from "./application/config";

export function startApp(context: IContext) {
  commandUseCase(context).startAppCommand(mainStartApp);
  commandUseCase(context).stopAppCommand(mainStopApp);
}

export function stopApp() {
  mainStopApp();
}
