import * as vscode from "vscode";
import * as GenericFunctions from "../Functions/GenericFunctions";
import * as xml2js from 'xml2js';
import { Data, FileConfig, LanguageConfig } from "../types";

/**
 * Track the main panel with the table for the translations
 */
export class TranslatePanel {
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private readonly _sourceFileChoosen?:FileConfig;
  private readonly _fileChosen?: FileConfig;
  private readonly _newFileLanguage?: LanguageConfig;
  public static _currentPanel: TranslatePanel | undefined; // Singleton class
  private _disposables: vscode.Disposable[] = [];
  private _sourceFileXliff?:Translation;

  private constructor(_panel: vscode.WebviewPanel, _extensionUri: vscode.Uri, _sourceFileChoosen?:FileConfig, _fileChosen?: FileConfig, _newFileLanguage?: LanguageConfig) {
    console.log("TranslatePanel - Constructor"); // TEST : Log

    this._panel = _panel;
    this._extensionUri = _extensionUri;
    this._sourceFileChoosen = _sourceFileChoosen;
    this._fileChosen = _fileChosen;
    this._newFileLanguage = _newFileLanguage;

    // TODO : Complete the file load
    this.loadFile();
    
    this.update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public static createOrShow(_extensionUri: vscode.Uri, _sourceFileChoosen?:FileConfig, _fileChosen?: FileConfig, _newFileLanguage?: LanguageConfig) {
    console.log("TranslatePanel - CreateOrShow"); // TEST : Log

    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (TranslatePanel._currentPanel) {
      TranslatePanel._currentPanel._panel.reveal(column);
      TranslatePanel._currentPanel.update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      "translate",
      "Translate",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,// Enable javascript in the webview
        localResourceRoots: [
          vscode.Uri.joinPath(_extensionUri, "media"),
          vscode.Uri.joinPath(_extensionUri, "out/compiled"),
        ],// And restrict the webview to only loading content from our extension's `media` directory.
      }
    );

    TranslatePanel._currentPanel = new TranslatePanel(panel, _extensionUri, _sourceFileChoosen, _fileChosen, _newFileLanguage);
  }

  public dispose() {
    console.log("TranslatePanel - Dispose"); // TEST : Log

    TranslatePanel._currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  public static kill() {
    console.log("TranslatePanel - Kill"); // TEST : Log

    TranslatePanel._currentPanel?.dispose();
    TranslatePanel._currentPanel = undefined;
  }

  private async loadFile(){
    if(this._sourceFileChoosen){
      if(this._sourceFileChoosen.filePath){
        const sourceFileUri = vscode.Uri.file(this._sourceFileChoosen.filePath);
        vscode.workspace.openTextDocument(sourceFileUri).then((textDocument) => {
          var parser = new xml2js.Parser();          
          parser.parseString(textDocument.getText(),(err:any,translation:Translation) =>{
            this._sourceFileXliff = translation;
            // TODO : Complete the file reading
          });
        },(error) => {
          GenericFunctions.showError(error);
        });
      }
    }
  }

  private async readFile(document:any){
    console.log("document");
    console.log(document);
    
    console.log("document.getText() ->" + document.getText());
    
  }

  public static revive(_panel: vscode.WebviewPanel, _extensionUri: vscode.Uri) {
    console.log("TranslatePanel - Revive"); // TEST : Log

    TranslatePanel._currentPanel = new TranslatePanel(_panel, _extensionUri);
  }

  private async update() {
    console.log("TranslatePanel - Update"); // TEST : Log
    
    this._panel.webview.html = GenericFunctions.getGenericHTML(this._panel.webview, this._extensionUri, "Translate");
    this._panel.webview.onDidReceiveMessage(async (data : Data) => {
      switch (data.type) {
        case "onInfo": {
          GenericFunctions.showInfo(data.value?data.value:'');
          break;
        }
        case "onError": {
          GenericFunctions.showError(data.value?data.value:'');
          break;
        }
      }
    });
  }
}