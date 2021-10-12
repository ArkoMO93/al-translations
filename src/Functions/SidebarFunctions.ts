import * as vscode from "vscode";
import { FileConfig, LanguageConfig } from "../types";

/* Responses to Messages */

export async function getFilesList(_webview: vscode.Webview) {

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
    fileList.push({fileName:"New file..."});

    _webview.postMessage({
        type: "showFileList",
        fileList: fileList
    });
}

export async function getLanguagesList(_webview: vscode.Webview) {
    let languagesList : LanguageConfig[] = [
        { languageCode: 'en-US', languageDescription: 'English (United States)'},
        { languageCode: 'fr-FR', languageDescription: 'French (France)'},
        { languageCode: 'de-DE', languageDescription: 'German (Germany)'},
        { languageCode: 'it-IT', languageDescription: 'Italian (Italia)'},
        { languageCode: 'es-ES', languageDescription: 'Spanish (Spain)'}
    ];

    _webview.postMessage({
        type: "showLanguageList",
        languagesList: languagesList
    });
}

export function loadFile(_fileChoosen: FileConfig, _newFileLanguage:String) {
    console.log(_fileChoosen.fileName + " - " + _newFileLanguage);
}