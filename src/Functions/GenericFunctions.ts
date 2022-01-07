import * as vscode from "vscode";

/**
 * Catch a generic Error to provide a legible error for the user
 * @param error the error to catch
 */
export function catchError(_error:any){
	showError(_error.message?_error.message:_error);
}

/**
 * Returns a generic html for the webview providers
 * @param _webview webview to start for the html making
 * @param _extensionUri Uri of the extension where search for the files
 * @param _compiledElementName name of the compiled names by svelte
 * @returns  complete html of the webview
 */
export function getGenericHTML(_webview: vscode.Webview, _extensionUri: vscode.Uri , _compiledElementName:string) : string {
	// Local path to css styles in media folder
    const stylesResetUri = _webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri,"media","reset.css"));
	const stylesMainUri = _webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri,"media","vscode.css"));
  
	// Svelte compiled elements
	const scriptUri = _webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "out", "compiled", _compiledElementName + ".js"));
	const cssUri = _webview.asWebviewUri(vscode.Uri.joinPath(_extensionUri, "out", "compiled", _compiledElementName + ".css"));

	// Use a nonce to only allow specific scripts to be run
	const nonce = getNonce();

	return `<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${ _webview.cspSource }; script-src 'nonce-${nonce}';">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<link href="${stylesResetUri}" rel="stylesheet">
					<link href="${stylesMainUri}" rel="stylesheet">
					<link href="${cssUri}" rel="stylesheet">
					<script nonce="${nonce}">
						tsvscode = acquireVsCodeApi();
					</script>
				</head>
				<body>
				</body>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</html>`;
}

/** Returns the nonce global attribute
 * @returns nonce 
 */
 function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

/**
 * Show an error message to the vscode message box
 * @param _value text to show in the error message box
 */
export function showError(_value:string){
	if (!_value) {
		return;
	}
	vscode.window.showErrorMessage(_value);
}

/**
 * Show an info message to the vscode message box
 * @param _value text to show in the info message box
 */
export function showInfo(_value:string){
	if (!_value) {
		return;
	}
	vscode.window.showInformationMessage(_value);
}
