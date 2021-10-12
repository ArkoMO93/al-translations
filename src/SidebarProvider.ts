import * as vscode from "vscode";
import * as GenericFunctions from "./Functions/GenericFunctions";
import * as SidebarFunctions from "./Functions/SidebarFunctions";
import { TranslatePanel } from "./TranlatePanel";

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
            SidebarFunctions.getFilesList(this._view.webview);
          }
          break;
        }
        case "getLanguageList": {
          if (this._view) {
            SidebarFunctions.getLanguagesList(this._view.webview);
          }
          break;
        }
        case "loadFile": {
          // TODO : to add a load function
          if (this._view) {
            if (data.fileChoosen) {
              SidebarFunctions.loadFile(data.fileChoosen, data.newFileLanguage);
            }
            TranslatePanel.createOrShow(this._extensionUri);
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
    return GenericFunctions.getGenericHTML(webview, this._extensionUri, "Sidebar");
  }
}