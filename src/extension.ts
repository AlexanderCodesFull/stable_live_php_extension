import * as vscode from "vscode";
import { startApp, stopApp } from "./main";

export function activate(context: vscode.ExtensionContext) {
  startApp(context);
}

export function deactivate() {
  stopApp();
}
