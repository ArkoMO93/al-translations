import * as vscode from "vscode";
import * as GenericFunctions from "../Functions/GenericFunctions";
import * as SidebarFunctions from "../Functions/SidebarFunctions";
import { Data, FileConfig, LanguageConfig } from "../types";
import { TranslatePanel } from "./TranslatePanel";

export class SidebarProvider implements vscode.WebviewViewProvider {
  /**
   * Sidebar of the extension
   */
  public _view?: vscode.WebviewView;

  private _fileChosen?: FileConfig;
  private _newFileLanguage?: LanguageConfig;

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
          // TODO : to add a load function
          if (this._view) {
            this.loadFile(data.fileChoosen, data.newFileLanguage);
            TranslatePanel.createOrShow(this._extensionUri);
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

  private loadFile(_fileChosen?: FileConfig, _newFileLanguage?: LanguageConfig){
    console.log("SidebarProvider - LoadFile"); // TEST : Log

    this._fileChosen = _fileChosen;
    this._newFileLanguage = _newFileLanguage;
    if(this._fileChosen){
      console.log("filechosen " + this._fileChosen.fileName);
    }
    if(this._newFileLanguage){
      console.log("newfilename " + this._newFileLanguage.languageCode);
    }
    console.log("file loaded");
  }
}