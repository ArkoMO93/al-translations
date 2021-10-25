import * as vscode from "vscode";
import * as GenericFunctions from "../Functions/GenericFunctions";
import { Data } from "../types";

export class TranslatePanel {
  /**
   * Track the main panel with the table for the translations
   */
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];
  public static _currentPanel: TranslatePanel | undefined;
  public static readonly _viewType = "translate";

  private _test?:string;

  private constructor(_panel: vscode.WebviewPanel, _extensionUri: vscode.Uri) {
    console.log("TranslatePanel - Constructor"); // TEST : Log

    this._panel = _panel;
    this._extensionUri = _extensionUri;
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public static createOrShow(_extensionUri: vscode.Uri) {
    console.log("TranslatePanel - CreateOrShow"); // TEST : Log

    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (TranslatePanel._currentPanel) {
      TranslatePanel._currentPanel._panel.reveal(column);
      TranslatePanel._currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      TranslatePanel._viewType,
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

    TranslatePanel._currentPanel = new TranslatePanel(panel, _extensionUri);
  }

  public static kill() {
    console.log("TranslatePanel - Kill"); // TEST : Log

    TranslatePanel._currentPanel?.dispose();
    TranslatePanel._currentPanel = undefined;
  }

  public static revive(_panel: vscode.WebviewPanel, _extensionUri: vscode.Uri) {
    console.log("TranslatePanel - Revive"); // TEST : Log

    TranslatePanel._currentPanel = new TranslatePanel(_panel, _extensionUri);
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

  private async _update() {
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