import * as vscode from "vscode";
import { FileConfig } from "../../webviews/globals";

/* Responses to Messages */

async function getFilesList(_webview: vscode.Webview) {

    let allFileUris: vscode.Uri[] = [];
    const folder = vscode.workspace.workspaceFolders?.[0];

    let fileList: FileConfig[] = [];

    if (folder) {
        let uris = await vscode.workspace.findFiles(new vscode.RelativePattern(folder, '**/*.xlf'));
        allFileUris = allFileUris.concat(uris);
        allFileUris.forEach(element => {
            fileList.push({ fileName: element.path.replace(folder.uri.path + "/", ""), fileUri: element });
        });
    }

    _webview.postMessage({
        type: "showFileList",
        fileList: fileList
    });
}

function loadFile(_fileChoosen: FileConfig) {
    console.log(_fileChoosen.fileName);

}

export { getFilesList, loadFile };