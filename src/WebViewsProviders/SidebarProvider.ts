import * as vscode from "vscode";
import * as GenericFunctions from "../Functions/GenericFunctions";
import * as SidebarFunctions from "../Functions/SidebarFunctions";
import { Data } from "../types";
import { TranslatePanel } from "./TranslatePanel";

export class SidebarProvider implements vscode.WebviewViewProvider {
  /**
   * Sidebar of the 
   */
  public _doc?: vscode.TextDocument;
  public _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) { }

  public resolveWebviewView(_webviewView: vscode.WebviewView) {
    this._view = _webviewView;

    this._view.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    this._view.webview.html = this._getHtmlForWebview(this._view.webview);
    this._view.webview.onDidReceiveMessage(async (data:Data) => {
      switch (data.type) {
        case "onInfo": {
          GenericFunctions.showInfo(data.value?data.value:'');
          break;
        }
        case "onError": {
          GenericFunctions.showError(data.value?data.value:'');
          break;
        }
        case "onFileList": {
          if (this._view) {
            SidebarFunctions.getFilesList(this._view.webview);
          }
          break;
        }
        case "onLanguageList": {
          if (this._view) {
            SidebarFunctions.getLanguagesList(this._view.webview);
          }
          break;
        }
        case "onLoadFile": {
          // TODO : to add a load function
          if (this._view) {
            if (data.fileChoosen) {
              SidebarFunctions.loadFile(data.fileChoosen, data.newFileLanguage?data.newFileLanguage:'');
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