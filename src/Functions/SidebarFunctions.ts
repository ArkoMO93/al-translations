import * as vscode from "vscode";
import { Data, FileConfig, LanguageConfig } from "../types";

/** Send responses to webview with the file list
 * @param _webview webview to wich send the message
 */
export async function getFilesList(_webview: vscode.Webview) {
    let allFileUris: vscode.Uri[] = [];
    const folder = vscode.workspace.workspaceFolders?.[0];

    let fileList: FileConfig[] = [];
    if (folder) {
        let uris = await vscode.workspace.findFiles(new vscode.RelativePattern(folder, '**/*.xlf'));
        allFileUris = allFileUris.concat(uris);
        allFileUris.forEach(element => {
            fileList.push({ fileName: element.path.replace(folder.uri.path + "/", ""), filePath: element.path });
        });
    }
    fileList.push({fileName:"New file..."});

    const data:Data = {type: "onFileList", fileList: fileList};
    _webview.postMessage(data);
}

/** Send responses to webview with the language list
 * @param _webview webview to wich send the message
 */
export async function getLanguagesList(_webview: vscode.Webview) {
    let languagesList : LanguageConfig[] = [
        { languageCode: 'en-US', languageDescription: 'English (United States)'},
        { languageCode: 'fr-FR', languageDescription: 'French (France)'},
        { languageCode: 'de-DE', languageDescription: 'German (Germany)'},
        { languageCode: 'it-IT', languageDescription: 'Italian (Italia)'},
        { languageCode: 'es-ES', languageDescription: 'Spanish (Spain)'}
    ];

    const data:Data = {type: "onLanguageList", languagesList:languagesList};
    _webview.postMessage(data);
}