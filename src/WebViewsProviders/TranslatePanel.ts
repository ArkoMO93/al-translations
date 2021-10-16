import * as vscode from "vscode";
import * as GenericFunctions from "../Functions/GenericFunctions";
import { Data } from "../types";

export class TranslatePanel {
  /**
   * Track the currently panel. Only single panel allowed to exist at a time.
   */
  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];
  public static currentPanel: TranslatePanel | undefined;
  public static readonly viewType = "translate";

  private constructor(_panel: vscode.WebviewPanel, _extensionUri: vscode.Uri) {
    this._panel = _panel;
    this._extensionUri = _extensionUri;
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (TranslatePanel.currentPanel) {
      TranslatePanel.currentPanel._panel.reveal(column);
      TranslatePanel.currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      TranslatePanel.viewType,
      "translate",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,// Enable javascript in the webview
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
        ],// And restrict the webview to only loading content from our extension's `media` directory.
      }
    );

    TranslatePanel.currentPanel = new TranslatePanel(panel, extensionUri);
  }

  public static kill() {
    TranslatePanel.currentPanel?.dispose();
    TranslatePanel.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    TranslatePanel.currentPanel = new TranslatePanel(panel, extensionUri);
  }

  public dispose() {
    TranslatePanel.currentPanel = undefined;

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
    this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);
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

  private _getHtmlForWebview(webview: vscode.Webview) {
    return GenericFunctions.getGenericHTML(webview, this._extensionUri, "Translate");
  }
}