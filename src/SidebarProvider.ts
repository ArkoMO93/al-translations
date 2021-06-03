import * as vscode from "vscode";
import { getGenericHTML } from "./Functions/GenericFunctions";
import { getFilesList } from "./Functions/SidebarFunctions";
import { HelloWorldPanel } from "./HelloWorldPanel";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          HelloWorldPanel.createOrShow(this._extensionUri);
          this._view?.webview.postMessage({
            type: "showInfos",
            xliffNote: "Table AltAvail. Detail Buffer - Field Balance - Property Caption"
          });
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
        case "getFilesList": {
          if (this._view) {
            getFilesList(this._view.webview);
          }
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    return getGenericHTML(webview, this._extensionUri, "Sidebar");
  }
}