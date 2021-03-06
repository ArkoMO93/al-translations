import * as vscode from "vscode";
import * as GenericFunctions from "../Functions/GenericFunctions";
import * as SidebarFunctions from "../Functions/SidebarFunctions";
import { Data, FileConfig, LanguageConfig } from "../types";
import { TranslatePanel } from "./TranslatePanel";

/**
 * Sidebar of the extension
 */
export class SidebarProvider implements vscode.WebviewViewProvider {
  public _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) { }

  public resolveWebviewView(_webviewView: vscode.WebviewView) {
    console.log("SidebarProvider - ResolveWebviewView"); // TEST : Log

    this._view = _webviewView;

    this._view.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]};

    this._view.webview.html = GenericFunctions.getGenericHTML(this._view.webview, this._extensionUri, "Sidebar");
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
          if (this._view) {
            TranslatePanel.createOrShow(this._extensionUri,data.sourceFileChoosen,data.fileChoosen, data.newFileLanguage);
          }
          break;
        }
      }
    });
  }
  
  public revive(_panel: vscode.WebviewView) {
    console.log("SidebarProvider - Revive"); // TEST : Log

    this._view = _panel;
  }
}